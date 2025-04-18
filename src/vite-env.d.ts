/// <reference types="vite/client" />

declare module '*.svg?react' {
  import type { FC, ComponentProps } from 'react';

  const ReactComponent: FC<ComponentProps<'svg'>>;

  export = ReactComponent;
}
