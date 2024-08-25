import { input } from "./elements";
import { checkSupport } from "./form";
import { addStyles } from "./helpers";
import { OptionInfo, OptionsForSupport } from "./types";

function checkCss (value: string) {
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

export const optionsInfo: Record<OptionsForSupport, OptionInfo> = {
  "property": {
    tooltip: "Enter the name of a CSS property, for example, \"display\". You can also optionally add the property value after a colon, like \"display: flex\".",
    isSupported: (userInput) => {
      const value = userInput.indexOf(":") === -1
        ? `${userInput}: initial`
        : userInput

      return checkCss(value);
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

      return checkCss(value);
    },
  },

  "color-units": {
    tooltip: "Enter a color value, for example, \"rgb(0 0 0 / .5)\"",
    isSupported: (userInput) => {
      const value = `color: ${userInput}`;

      return checkCss(value);
    }
  },

  "length-units": {
    tooltip: "Enter a length value, for example, \"rem\"",
    isSupported: (userInput) => {
      const value = `width: 1${userInput}`;

      return checkCss(value);
    }
  },

  "angle-units": {
    tooltip: "Enter a length value, for example, \"grad\"",
    isSupported: (userInput) => {
      const value = `transform: rotate(1${userInput})`;

      return checkCss(value);
    },
  },
} as const;
