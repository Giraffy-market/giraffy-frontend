declare module 'vanilla-text-mask' {
  interface MaskOptions {
    inputElement: HTMLInputElement;
    mask: (string | RegExp)[];
    guide?: boolean;
    placeholderChar?: string;
    keepCharPositions?: boolean;
    pipe?: (
      conformedValue: string,
      config: { [key: string]: unknown },
    ) => string | false;
    showMask?: boolean;
  }

  interface MaskInstance {
    update: (rawValue: string) => void;
    destroy: () => void;
  }

  function vanillaTextMask(options: MaskOptions): MaskInstance;

  export = vanillaTextMask;
}
