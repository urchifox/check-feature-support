import { optionsInfo } from "./options-info";

export type OptionsForSupport = "property" | "custom properties" | "selector" | "color-units" | "length-units" | "angle-units";
export type OptionInfo = {
  tooltip: string;
  isSupported: (userInput: string) => boolean;
  onSelect?: (event: Event) => void;
};

export function isOptionForSupport(value: string): value is OptionsForSupport {
  return value in optionsInfo
}
