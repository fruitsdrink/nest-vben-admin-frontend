export interface RowType {
  id: string;
  name: string;
  leader?: string;
  phone: string;
  sort: number;
  createAt: Date;
  status: 0 | 1;
  remark?: string;
  parentId?: string;
  canEdit: boolean;
  canDelete: boolean;
}
