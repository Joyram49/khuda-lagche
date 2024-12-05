import { ObjectId } from "mongodb";

export const replaceMongoIdInData = (data) => {
  const visitedObjects = new WeakMap(); // To track circular references

  const deepReplaceMongoId = (obj) => {
    // Check if we already visited this object to avoid circular references
    if (visitedObjects.has(obj)) {
      return visitedObjects.get(obj);
    }

    // Check if the current object is an array
    if (Array.isArray(obj)) {
      return obj.map(deepReplaceMongoId); // Recursively handle arrays
    }

    // Check if the current object is an object and not a Date
    if (obj && typeof obj === "object" && !(obj instanceof Date)) {
      const newObj = {};
      visitedObjects.set(obj, newObj); // Mark this object as visited

      for (let key in obj) {
        if (key === "_id" && obj[key] instanceof ObjectId) {
          newObj["id"] = obj[key].toString(); // Rename _id to id and convert ObjectId to string
        } else if (obj[key] instanceof ObjectId) {
          newObj[key] = obj[key].toString(); // Convert ObjectId to string for other ObjectId fields
        } else {
          newObj[key] = deepReplaceMongoId(obj[key]); // Recursively check nested objects/arrays
        }
      }
      return newObj;
    }

    return obj; // Return value if it's not an object or array
  };

  return deepReplaceMongoId(data); // Handle both objects and arrays
};
