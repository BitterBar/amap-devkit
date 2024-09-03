export default function defineCustomElement(
  name: string,
  constructor: CustomElementConstructor,
  options?: ElementDefinitionOptions
) {
  if (!customElements.get(name)) {
    customElements.define(name, constructor, options)
  }
}
