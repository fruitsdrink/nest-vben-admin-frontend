import type { Component } from 'vue';

import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

export type PageOptions = {
  api?: {
    deleteById?: (id: any) => Promise<any>;
    findById?: (id: any) => Promise<any>;
    findList?: (...args: any[]) => Promise<any>;
  };
  children?: any;
  codes?: {
    delete?: string[];
    edit?: string[];
    new?: string[];
  };
  defaultRowValue?: any;
  form?: Component;
  formOptions?: Partial<VbenFormProps>;
  formTitle?: string;
  gridOptions?: Partial<VxeTableGridOptions>;
  title?: string;
};
