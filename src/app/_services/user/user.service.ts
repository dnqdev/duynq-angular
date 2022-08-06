import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserList(school?: string, isActive?: any, keyword?: string) {
    console.log(school, isActive, keyword);

    return this.http.get(
      `${environment.apiIdentityService}/api/admin-user/index?UnitCode=${school}&isActive=${isActive}&keyWord=${keyword}`
    );
  }

  changePasswordUser(data: any){
    return this.http.patch(`${environment.apiIdentityService}/api/admin-user/change-password`, data);
  }

  deleteUser(data: any) {
    let options = {body: data};
    return this.http.delete(`${environment.apiIdentityService}/api/admin-user/delete`, options);
  }

}
