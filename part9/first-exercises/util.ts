// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (argument: any): boolean => {
  return !isNaN(Number(argument));
};
