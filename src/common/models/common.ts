export type SelectOption<T = string, O = any> = {
  value: T;
  label: string;
  original?: O;
};
