import type { PageOptions } from './types';

import { Page } from '@vben/common-ui';

import { Popconfirm } from 'ant-design-vue';

import { ButtonDelete, ButtonNew } from '#/components';
import ButtonEdit from '#/components/buttons/button-edit.vue';

import { useHook } from './hook';

export const usePage = (options: PageOptions) => {
  const { Grid, FormModal, handleCreate, handleEdit, handleDelete, codeNew, codeEdit, codeDelete } = useHook(options);
  return (
    <Page auto-content-height>
      <Grid>
        {{
          'toolbar-tools': () => {
            return <ButtonNew code={codeNew ?? undefined} onClick={handleCreate} />;
          },
          action: (row: any) => {
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
        }}
      </Grid>
      <FormModal />
    </Page>
  );
};
