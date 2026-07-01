import { createRoot, type Root } from "react-dom/client";
import { CoveEdition, type CoveEditionProps } from "./CoveEdition";

export const DEFAULT_ELEMENT_TAG = "cove-edition";

export class CoveEditionElement extends HTMLElement {
  private root: Root | null = null;

  static get observedAttributes() {
    return ["config-url", "config"];
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.root?.unmount();
    this.root = null;
  }

  attributeChangedCallback() {
    this.render();
  }

  private getProps(): CoveEditionProps {
    const configUrl = this.getAttribute("config-url") ?? undefined;
    const configValue = this.getAttribute("config");
    const config = configValue ? this.parseConfig(configValue) : undefined;

    return {
      configUrl,
      config,
    };
  }

  private parseConfig(configValue: string): CoveEditionProps["config"] | undefined {
    if (!configValue) {
      return undefined;
    }

    try {
      return JSON.parse(configValue) as CoveEditionProps["config"];
    } catch {
      return undefined;
    }
  }

  private render() {
    if (!this.isConnected) {
      return;
    }

    if (!this.root) {
      this.root = createRoot(this);
    }

    this.root.render(<CoveEdition {...this.getProps()} />);
  }
}

export function registerCoveEditionElement(tagName = DEFAULT_ELEMENT_TAG) {
  if (
    typeof window !== "undefined" &&
    typeof window.customElements !== "undefined" &&
    !window.customElements.get(tagName)
  ) {
    window.customElements.define(tagName, CoveEditionElement);
  }

  return tagName;
}

export function mountCoveEdition(
  target: Element | DocumentFragment | null,
  props: CoveEditionProps,
) {
  if (!target) {
    return null;
  }

  const root = createRoot(target as Element);
  root.render(<CoveEdition {...props} />);

  return root;
}

if (typeof window !== "undefined" && typeof window.customElements !== "undefined") {
  registerCoveEditionElement();
}
