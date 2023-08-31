export type NestedObject = {
    [key: string]: string | NestedObject; // {(key:string) : value:string or {(key:string) : value:string or {...}}}
  };
