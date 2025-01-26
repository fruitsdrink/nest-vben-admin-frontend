export interface RowType {
  id: number;
  name: string;
  leader?: string;
  phone: string;
  sort: number;
  createAt: Date;
  status: 0 | 1;
  remark?: string;
  parentId?: number;
  canEdit: boolean;
  canDelete: boolean;
}
