export type OptionsForSupport = "property" | "custom properties" | "selector" | "color-units";
export type OptionInfo = {
  tooltip: string;
  isSupported: (userInput: string) => boolean;
  onSelect?: (event: Event) => void;
};
