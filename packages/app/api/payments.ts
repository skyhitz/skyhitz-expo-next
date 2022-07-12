import { client } from './client';
import { gql } from 'graphql-request';

export class PaymentsBackend {
  async subscribe(cardToken: string) {
    client
      .request(
        gql`
            mutation {
              subscribeUser(cardToken: "${cardToken}")
            }
          `
      )
      .then(({ subscribeUser }) => subscribeUser);
  }
  async buyCredits(cardToken: string, amount: number) {
    return client
      .request(
        gql`
            mutation {
              buyCredits(cardToken: "${cardToken}", amount: ${amount})
            }
          `
      )
      .then(({ buyCredits }) => buyCredits);
  }
  async getXLMPrice() {
    return client
      .request(
        gql`
          {
            xlmPrice
          }
        `
      )
      .then(({ xlmPrice }) => xlmPrice);
  }
  async withdrawToExternalWallet(address: string, amount: number) {
    return client
      .request(
        gql`
            mutation {
              withdrawToExternalWallet(address: "${address}", amount: ${amount})
            }
          `
      )
      .then(({ withdrawToExternalWallet }) => withdrawToExternalWallet);
  }
  async refreshSubscription() {
    return client
      .request(
        gql`
          {
            paymentsInfo {
              subscribed
              credits
            }
          }
        `
      )
      .then(({ paymentsInfo }) => paymentsInfo);
  }
}

export const paymentsBackend = new PaymentsBackend();
