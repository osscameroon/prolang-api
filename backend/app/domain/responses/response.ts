export const transformResponse = <T, U>(data: T | T[], transformFunction: (item: T) => U): U | U[] => {
  if (!Array.isArray(data)) {
    return transformFunction(data);
  }

  return data.map(transformFunction);
};
