/// <reference types="@bhb-frontend/service-types" />

declare module '*.css' {
  const style: Record<string, string>;
  export default style;
}

declare module '*.less' {
  const style: Record<string, string>;
  export default style;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const image: string;
  export default image;
}

declare module '*.jpg' {
  const image: string;
  export default image;
}

declare module '*.jpeg' {
  const image: string;
  export default image;
}

declare module '*.gif' {
  const image: string;
  export default image;
}

declare interface ImportMetaEnv {
  readonly VITE_APP_NODE_ENV: 'dev' | 'test' | 'gray' | 'prod';
  readonly VITE_APP_BASE_URL: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
