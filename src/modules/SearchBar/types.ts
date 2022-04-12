export interface SelectOptionsState {
  options: SelectOptionUI[];
}

export interface SelectOptionUI {
  key: string;
  value: string;
  label: JSX.Element;
}
