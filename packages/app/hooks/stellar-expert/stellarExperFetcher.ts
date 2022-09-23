import { Config } from "app/config";

interface ResponseTypeBase {
  _links: unknown;
  _embedded: {
    _records: object[];
  };
}

export default async function fetcher<ResponseT extends ResponseTypeBase>(
  assetId: string,
  endpoint: string
): Promise<ResponseT["_embedded"]["_records"]> {
  const url = `${Config.STELLAR_EXPERT_URL}/asset/${assetId}/${endpoint}`;
  const result = await fetch(url);
  const json = await result.json();
  const data: ResponseT = json as ResponseT;
  if (!data) {
    console.log("Unknown response", json);
    throw new Error("Unknown response");
  }
  return data._embedded._records;
}
