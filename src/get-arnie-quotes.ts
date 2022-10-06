import { httpGet } from "./mock-http-interface";
type TResult = {
  [key: string] : string;
};
/**
 * Call GET endpoints and return the body.message of each endpoint
 * assumes the endpoint either returns 200 or 500
 * @param urls array of GET endpoints
 * @returns Promise that resolves to an array of Objects of type TResult
 */
export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  const getQuotes = Promise.all(
    urls.map(async (url) => {
      const quoteRes = await httpGet(url);
      return {
        [quoteRes.status == 200 ? "Arnie Quote" : "FAILURE"]: JSON.parse(quoteRes.body).message,
      };
    })
  );
  return getQuotes;
};