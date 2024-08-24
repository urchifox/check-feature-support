import { input } from "./elements";
import { checkSupport } from "./form";
import { addStyles } from "./helpers";
import { OptionInfo, OptionsForSupport } from "./types";

export const optionsInfo: Record<OptionsForSupport, OptionInfo> = {
  "property": {
    tooltip: "Enter the CSS property and its value separated by a colon, for example 'display: flex'",
    isSupported: (userInput) => {
      addStyles(`
        @supports (${userInput}) {
          .form__result {
            color: green;
          }
        }

        @supports not (${userInput}) {
          .form__result {
            color: tomato;
          }
        }
      `)

      return CSS.supports(userInput);
    },
  },

  "custom properties": {
    tooltip: "",
    isSupported: () => {
      addStyles(`
        .form__result {
          --sucess: #008000;
          color: #ff6347;
          color: var(--sucess);
        }
      `)

      return CSS.supports("color", "var(--primary)");
    },
    onSelect: (event) => {
      event.stopPropagation();
      input.value = "";
      input.disabled = true;
      checkSupport();
    },
  },

  selector: {
    tooltip: "Enter a selector, for example ':has(a)'",
    isSupported: (userInput) => {
      const value = `selector(${userInput})`;
      addStyles(`
            @supports (${value}) {
                .form__result {
                    color: green;
                }
            }

            @supports not (${value}) {
                .form__result {
                    color: tomato;
                }
            }
        `)

      return CSS.supports(value);
    },
  },
} as const;
