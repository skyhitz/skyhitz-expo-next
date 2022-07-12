import { client } from './client';
import { gql } from 'graphql-request';
import { Entry } from '../models/entry.model';
import { entriesIndex } from '../algolia/algolia';

type ConditionalXdr = { xdr: string; success: boolean; submitted: boolean };

export class EntriesBackend {
  async search(q: string) {
    if (!q) {
      return [];
    }

    const { hits } = await entriesIndex.search(q);
    return hits;
  }

  async getPriceInfo(id: string) {
    return client
      .request(
        gql`
          {
            entryPrice(id: "${id}"){
              price
              amount
            }
          }
          `
      )
      .then(({ entryPrice }: any) => {
        return {
          price:
            entryPrice.price && parseFloat(entryPrice.price)
              ? parseFloat(entryPrice.price)
              : 0,
          amount: parseFloat(entryPrice.amount),
        };
      })
      .catch((e) => {
        console.error(e);
        return { price: 0, amount: 0 };
      });
  }

  async getById(id: string) {
    return client
      .request(
        gql`
      {
        entries(id: "${id}"){
          imageUrl
          description
          title
          artist
          id
          videoUrl
          code
          issuer
        }
      }
      `
      )
      .then(({ entries }: any) => {
        if (!entries.length) {
          return null;
        }
        return new Entry(entries[0]);
      })
      .catch((e) => {
        console.error(e);
        return null;
      });
  }

  async getByUserId(userId: string) {
    return client
      .request(
        gql`
      {
        entries(userId: "${userId}"){
          imageUrl
          description
          title
          artist
          id
          videoUrl
          code
          issuer
        }
      }
      `
      )
      .then(({ entries }: any) => {
        if (!entries.length) {
          return [];
        }
        return entries
          .filter((entry) => !!entry)
          .map((entry: any) => new Entry(entry));
      })
      .catch((e) => {
        console.error(e);
        return null;
      });
  }

  async buyEntry(id: string, amount: number, price: number) {
    return client
      .request(
        gql`
            mutation {
              buyEntry(id: "${id}", amount: ${amount}, price: ${price}) {
                xdr
                success
                submitted
              }
            }
            `
      )
      .then(({ buyEntry }: { buyEntry: ConditionalXdr }) => buyEntry);
  }

  async indexEntry(issuer: string) {
    return client
      .request(
        gql`
      mutation {
        indexEntry(issuer: "${issuer}")
      }
      `
      )
      .then(({ indexEntry }) => indexEntry);
  }

  async createFromUpload(
    fileCid: string,
    metaCid: string,
    code: string,
    forSale: boolean = false,
    price: number = 1,
    equityForSale: number = 1
  ) {
    return client
      .request(
        gql`
      mutation {
        createEntry(fileCid: "${fileCid}",metaCid: "${metaCid}", code: "${code}", forSale: ${forSale}, price: ${price}, equityForSale: ${
          equityForSale / 100
        }){
          xdr
          success
          submitted
        }
      }
      `
      )
      .then(({ createEntry }: { createEntry: ConditionalXdr }) => createEntry)
      .catch((e) => {
        console.info(e);
        return null;
      });
  }

  async getTopChart(page = 0): Promise<Entry[]> {
    return client
      .request(
        gql`
          {
            topChart(page: ${page} ) {
              imageUrl
              description
              title
              artist
              id
              videoUrl
              code
              issuer
            }
          }
        `
      )
      .then(({ topChart }: any) => {
        if (!topChart) {
          return [];
        }
        return topChart.map((entry: any) => new Entry(entry));
      })
      .catch((e) => {
        console.info(e);
        return [];
      });
  }

  async getRecentSearches(): Promise<Entry[]> {
    return [];
  }

  async getRecentlyAdded(page = 0): Promise<Entry[]> {
    return client
      .request(
        gql`
          {
            recentlyAdded(page: ${page} ) {
              imageUrl
              description
              title
              artist
              id
              videoUrl
              code
              issuer
            }
          }
        `
      )
      .then(({ recentlyAdded }: any) => {
        if (!recentlyAdded) {
          return [];
        }
        return recentlyAdded.map((entry: any) => new Entry(entry));
      })
      .catch((e) => {
        console.info(e);
        return [];
      });
  }

  async getTopSearches(): Promise<Entry[]> {
    return [];
  }

  remove(id: string) {
    return client.request(
      gql`
      mutation {
        removeEntry(id: "${id}")
      }
      `
    );
  }

  getIssuer(cid: string) {
    return client
      .request(
        gql`
          {
            getIssuer(cid: "${cid}")
          }
        `
      )
      .then(({ getIssuer }) => getIssuer);
  }

  updatePricing(
    id: string,
    price: number,
    forSale: boolean,
    equityForSale: number
  ) {
    return client.request(
      gql`
            mutation {
              updatePricing(id: "${id}", price: ${price}, forSale: ${forSale}, equityForSale: ${equityForSale})
            }
          `
    );
  }
}

export const entriesBackend = new EntriesBackend();
