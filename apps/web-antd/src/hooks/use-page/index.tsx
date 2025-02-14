import type { PageOptions } from './types';

import { useSlots } from 'vue';

import { Page } from '@vben/common-ui';

import { Popconfirm } from 'ant-design-vue';

import { ButtonDelete, ButtonNew } from '#/components';
import ButtonEdit from '#/components/buttons/button-edit.vue';

import { useHook } from './hook';

export default function NvaPage(options: PageOptions) {
  const { Grid, FormModal, handleCreate, handleEdit, handleDelete, codeNew, codeEdit, codeDelete } = useHook(options);

  const slots = useSlots();

  const slotFns: any = {
    'toolbar-tools': () => {
      return <ButtonNew code={codeNew ?? undefined} onClick={handleCreate} />;
    },
    action: (props: any) => {
      const { row } = props;
      const editDisabled = row.canEdit !== null && row.canEdit === undefined ? row.canEdit : false;
      const deleteDisabled = row.canDelete !== null && row.canDelete === undefined ? row.canDelete : false;
      return (
        <div>
          <ButtonEdit code={codeEdit ?? undefined} disabled={editDisabled} onClick={() => handleEdit(row.id)} />
          <Popconfirm onConfirm={() => handleDelete(row.id)} title={'确定删除吗?'}>
            <ButtonDelete code={codeDelete ?? undefined} disabled={deleteDisabled} />
          </Popconfirm>
        </div>
      );
    },
  };
  for (const key of Object.keys(slots)) {
    slotFns[key] = ({ row }: any) => {
      return slots[key]?.({ row });
    };
  }
  return (
    <Page auto-content-height>
      <Grid>{slotFns}</Grid>
      <FormModal />
    </Page>
  );
}
