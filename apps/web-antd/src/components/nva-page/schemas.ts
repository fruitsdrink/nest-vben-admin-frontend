export const createInputSchema = (opts: { defaultValue?: string; fieldName: string; title: string }) => {
  return {
    component: 'Input',
    defaultValue: opts.defaultValue ?? '',
    fieldName: opts.fieldName,
    label: opts.title,
    componentProps: {
      allowClear: true,
    },
  };
};
export const createKeywordSchema = (opts: { defaultValue?: string; title: string }) => {
  return {
    component: 'Input',
    defaultValue: opts.defaultValue ?? '',
    fieldName: 'keyword',
    label: opts.title,
    componentProps: {
      allowClear: true,
    },
  };
};

export const createSelectSchema = (opts: {
  fieldName: string;
  options?: { label: string; value: number | string }[];
  query?: () => Promise<{ label: string; value: number | string }[]>;
  title: string;
}) => {
  return {
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: opts.query
        ? (async () => {
            return await opts.query?.();
          })()
        : opts.options,
      placeholder: '请选择',
    },
    fieldName: opts.fieldName,
    label: opts.title,
  };
};

export const createStatusSchema = () => {
  return {
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
      placeholder: '请选择',
    },
    fieldName: 'status',
    label: '有效状态',
  };
};

export const createTreeSelect = (opts: { fieldName: string; title: string }) => {
  const { title, fieldName } = opts;
  return {
    component: 'TreeSelect',
    componentProps: {
      allowClear: true,
      treeData: [],
      placeholder: '请选择',
      popupClassName: '',
    },
    fieldName,
    label: title,
  };
};
