import { input } from "./elements";
import { checkSupport } from "./form";
import { addStyles } from "./helpers";
import { OptionInfo, OptionsForSupport } from "./types";

export const optionsInfo: Record<OptionsForSupport, OptionInfo> = {
  "property": {
    tooltip: "Enter the name of a CSS property, for example, \"display\". You can also optionally add the property value after a colon, like \"display: flex\".",
    isSupported: (userInput) => {
      const value = userInput.indexOf(":") === -1
        ? `${userInput}: initial`
        : userInput

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

  "color-units": {
    tooltip: "Enter a color value, for example, \"rgb(0 0 0 / .5)\"",
    isSupported: (userInput) => {
      const value = `color: ${userInput}`;
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
    }
  },

  "length-units": {
    tooltip: "",
    isSupported: (userInput) => {
      const value = `width: 1${userInput}`;
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
    }
  }
} as const;
