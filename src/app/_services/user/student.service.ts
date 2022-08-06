import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentList(pageSize:number, pageIndex: number, schoolId?: string, gradeId?: string, HomeroomClassId?: string, Status?: string, Keyword?: string) {
    return this.http.get(
      `${environment.apiIdentityService}/api/students?SchoolId=${schoolId}&GradeId=${gradeId}&HomeroomClassId=${HomeroomClassId}&Status=${Status}&keyWord=${Keyword}&PageSize=${pageSize}&PageIndex=${pageIndex}`
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
