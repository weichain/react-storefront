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
