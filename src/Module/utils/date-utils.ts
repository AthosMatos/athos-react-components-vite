export const IsDate = (value: any): value is Date => {
  return value instanceof Date && !isNaN(value.getTime());
};
