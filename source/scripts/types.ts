export type OptionsForSupport = "property" | "custom properties" | "selector";
export type OptionInfo = {
  tooltip: string;
  isSupported: (userInput: string) => boolean;
  onSelect?: (event: Event) => void;
};
