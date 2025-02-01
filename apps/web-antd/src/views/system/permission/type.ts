export type Action = {
  label: string;
  value: string;
};
export type Module = {
  actions: Action[];
  id: string;
  title: string;
};
