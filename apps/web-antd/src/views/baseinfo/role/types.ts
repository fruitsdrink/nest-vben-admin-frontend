export interface RowType {
  id: number;
  name: string;
  sort: number;
  createAt: Date;
  status: 0 | 1;
  remark?: string;
  canEdit: boolean;
  canDelete: boolean;
}
