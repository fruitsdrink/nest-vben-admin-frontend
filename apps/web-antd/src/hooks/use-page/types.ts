import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

export type PageOptions = {
  api?: {
    deleteById?: (id: number | string) => Promise<any>;
    findById?: (id: number | string) => Promise<any>;
    findList?: (...args: any[]) => Promise<any>;
  };
  codes?: {
    delete?: string[];
    edit?: string[];
    new?: string[];
  };
  defaultRowValue?: any;
  formOptions?: Partial<VbenFormProps>;
  gridOption?: Partial<VxeTableGridOptions>;
  title?: string;
};
