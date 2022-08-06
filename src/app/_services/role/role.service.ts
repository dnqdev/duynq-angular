import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  // 1. get list role
  getList(keyword: string, pageIndex: number, pageSize: number) {
    return this.http.get(`${environment.apiIdentityService}/api/core-role/index?Keyword=${keyword}&PageSize=${pageSize}&PageIndex=${pageIndex}`);
  }

  // 2. create role
  createRole(data = {}) {
    return this.http.post(`${environment.apiIdentityService}/api/core-role/store`, data);
  }

  // 3. update role
  updateRole(data = {}) {
    return this.http.patch(`${environment.apiIdentityService}/api/core-role/update`, data);
  }

  // 4. delete role
  deleteRole(data = {}) {
    let options = {body: data};
    return this.http.delete(`${environment.apiIdentityService}/api/core-role/delete`, options);
  }

  // 5. update permission in role
  updatePermissionRole(data = {}) {
    return this.http.patch(`${environment.apiIdentityService}/api/core-role/update-permissions`, data);
  }

  // 6. detail role
  detailRole(id: string) {
    return this.http.get(`${environment.apiIdentityService}/api/core-role/detail/${id}`);
  }

  // 7. get list permission in role
  getListPermissionRole(id: string, keyword: string) {
    return this.http.get(`${environment.apiIdentityService}/api/core-role/${id}/permissions?Keyword=${keyword}`);
  }

  // 8. get list all permission
  getAllPermission(keyword: string) {
    return this.http.get(`${environment.apiIdentityService}/api/core-role/all-permissions?Keyword=${keyword}`);
  }

  // 9. get list user in role
  getListUserRole(id: string, keyword: string, pageSize: number, pageIndex: number) {
    return this.http.get(`${environment.apiIdentityService}/api/core-role/${id}/users?Keyword=${keyword}&PageSize=${pageSize}&PageIndex=${pageIndex}`);
  }

  // 10. assign user to role
  assignUserRole(data = {}) {
    return this.http.post(`${environment.apiIdentityService}/api/core-role/assign-users`, data);
  }

  // 11. remove user to role
  removeUserRole(data = {}) {
    let options = {body: data};
    return this.http.delete(`${environment.apiIdentityService}/api/core-role/remove-user`, options);
  }

  // 12. get list user to assign to role
  getListUserToAssignRole(keyword: string, pageSize: number, pageIndex: number, roleId='') {
    return this.http.get(`${environment.apiIdentityService}/api/core-role/users-to-assign?Keyword=${keyword}&PageSize=${pageSize}&PageIndex=${pageIndex}&RoleId=${roleId}`);
  }
}
