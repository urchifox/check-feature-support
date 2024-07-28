type TypesForSupport = keyof typeof typeMap

let form: HTMLFormElement
let select: HTMLInputElement
let input: HTMLInputElement
let declaration: HTMLElement
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
            .feature-support .form__result {
                color: green;
            }
        }

        @supports not (${value}) {
            .feature-support .form__result {
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
  if (valueType in typeMap) setDeclaration(valueType as TypesForSupport)
}

function setDeclaration(valueType: TypesForSupport) {
  const text = typeMap[valueType].tooltip

  declaration.textContent = text
}

export function initFeatureSuport() {
  form = queryElement(".form")
  select = queryElement(".form .form__select")
  input = queryElement(".form .form__input")
  declaration = queryElement("#input-declaration")
  result = queryElement(".form .form__result")

  const defaultValue = select.value

  if (defaultValue in typeMap) setDeclaration(defaultValue as TypesForSupport)

  form.addEventListener("submit", onFormSubmit)
  select.addEventListener("change", onSelectChange)
  form.addEventListener("change", onFormChange)
  input.addEventListener("input", onFormChange)
}

initFeatureSuport()
