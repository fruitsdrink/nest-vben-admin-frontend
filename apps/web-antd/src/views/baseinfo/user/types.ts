export interface RowType {
  id: number;
  username: string;
  nickName: string;
  realName?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  gender: 0 | 1 | 2;
  isAdmin: 0 | 1; // 0: 普通用户 1: 管理员
  departmentId?: number;
  roles: number[];
  sort: number;
  createAt: Date;
  status: 0 | 1;
  remark?: string;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  canEdit: boolean;
  canDelete: boolean;
}
