import type { PageOptions } from './types';

import { useSlots } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Popconfirm } from 'ant-design-vue';

import { ButtonDelete, ButtonNew } from '#/components';
import ButtonEdit from '#/components/buttons/button-edit.vue';

import { useHook } from './hook';

export default function NvaPage(options: PageOptions) {
  const {
    Grid,
    FormModal,
    handleCreate,
    handleEdit,
    handleDelete,
    codeNew,
    codeEdit,
    codeDelete,
    expandAll,
    collapseAll,
  } = useHook(options);

  const slots = useSlots();

  const slotFns: any = {
    'toolbar-tools': () => {
      return (
        <div class="flex flex-row items-center gap-2">
          {(options as any)['grid-options']?.treeConfig && (
            <>
              <Button onClick={expandAll} type="default">
                展开全部
              </Button>
              <Button onClick={collapseAll} type="default">
                收起全部
              </Button>
            </>
          )}
          <ButtonNew code={codeNew ?? undefined} onClick={handleCreate} />
        </div>
      );
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
