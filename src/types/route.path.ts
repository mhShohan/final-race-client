import { ReactNode } from 'react';

export type TRouteSideBarPath = {
  id: number;
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
};

export type TRoute = {
  path: string;
  element: any;
};

export type TSideBarItems = {
  id: number;
  name: string;
  link: string;
};
