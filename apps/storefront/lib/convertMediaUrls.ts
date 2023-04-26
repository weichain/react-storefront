import invariant from "ts-invariant";

function deepCopy(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    // If the input is not an object, return it as-is
    return obj;
  }

  if (Array.isArray(obj)) {
    // If the input is an array, create a new array with the same elements
    return obj.map(deepCopy);
  }

  // Otherwise, create a new object with the same properties and values
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = deepCopy(value);
  }
  return result;
}

export const convertProductUrl = (data: any, fallback: any) => {
  const saleorApiUrl = process.env.NEXT_PUBLIC_API_URI;
  invariant(saleorApiUrl, "Missing NEXT_PUBLIC_API_URI");
  const url = new URL(saleorApiUrl);
  const [domain, port] = [url.hostname, url.port];
  const invalid = "http://localhost:8000";
  const replacement = `http://${domain}:${port}`;
  const _data = deepCopy(data);
  return fallback(_data, invalid, replacement);
};
