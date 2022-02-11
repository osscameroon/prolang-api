export const padZero = (value: number) => (value < 10 ? `0${value}` : value.toString());
export const noop = () => {};

export const isProduction = () => process.env.NODE_ENV === 'production';
