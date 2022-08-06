interface Roles {
  roleId: string,
  roleCode: string,
  roleName: string,
  unitCode: string,
  unitName: string,
  layout: string,
}

export interface UserList {
  id: string,
  avatar: string,
  fullname: string,
  code: string,
  username: string,
  gender: 1 | 2 | 3,
  email: string,
  phone: string,
  birthday: number,
  isActive: 0 | 1,
  isLogin: 0 | 1,
  isChangePassword: 0 | 1,
  roles: Roles[]
}
