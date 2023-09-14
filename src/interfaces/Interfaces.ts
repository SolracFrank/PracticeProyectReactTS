export type NestedObject = {
    [key: string]: string | NestedObject;
  };

  export interface User {
    id: string;
    firstname: string;
    lastname: string;
  }
