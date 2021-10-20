export const padZero = (value: number) => (value < 10 ? `0${value}` : value.toString());
export const noop = () => {};