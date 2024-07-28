type TypesForSupport = keyof typeof typeMap

let form: HTMLFormElement
let select: HTMLInputElement
let input: HTMLInputElement
let tooltip: HTMLElement
let result: HTMLInputElement

export function queryElement<T extends HTMLElement = HTMLElement>(
  selector: string,
  parent?: HTMLElement
): T {
  const element = (parent ?? document).querySelector<T>(selector)
  if (!element) throw Error(`Element "${selector}" not found 😡😡😡😡👎👎👎`)
  if (!(element instanceof HTMLElement))
    throw Error(`Element "${selector}" is not an HTMLElement??? 🫸🫸🫸`)
  return element
}

const typeMap = {
  property: {
    tooltip:
      "Введите свойство CSS и его значение через двоеточие, например 'display: flex'",
    formatValue: (value: string) => value,
  },
  selector: {
    tooltip: "Введите селектор, например ':has(a)'",
    formatValue: (value: string) => `selector(${value})`,
  },
} as const

function onFormSubmit(event: Event) {
  event.preventDefault()

  const userInput = input.value

  if (userInput.length === 0) return

  const valueType = select.value

  if (!(valueType in typeMap)) return

  const value = typeMap[valueType as TypesForSupport].formatValue(userInput)

  const style = `
        @supports (${value}) {
            .feature-support .feature-result {
                color: green;
            }
        }

        @supports not (${value}) {
            .feature-support .feature-result {
                color: tomato;
            }
        }
    `
  const styleElement = document.createElement("style")
  styleElement.textContent = style
  document.head.appendChild(styleElement)

  result.value = CSS.supports(value)
    ? "Поддерживается"
    : "Не поддерживается либо неправильно введено значение"
}

function onFormChange() {
  result.value = ""
}

function onSelectChange(event: Event) {
  const valueType = (event.target as HTMLInputElement).value
  if (valueType in typeMap) setTooltip(valueType as TypesForSupport)
}

function setTooltip(valueType: TypesForSupport) {
  const text = typeMap[valueType].tooltip

  tooltip.textContent = text
}

export function initFeatureSuport() {
  form = queryElement(".feature-support")
  select = queryElement(".feature-support .feature-select")
  input = queryElement(".feature-support .feature-input")
  tooltip = queryElement("#tooltip")
  result = queryElement(".feature-support .feature-result")

  const defaultValue = select.value

  if (defaultValue in typeMap) setTooltip(defaultValue as TypesForSupport)

  form.addEventListener("submit", onFormSubmit)
  select.addEventListener("change", onSelectChange)
  form.addEventListener("change", onFormChange)
  input.addEventListener("input", onFormChange)
}

initFeatureSuport()
