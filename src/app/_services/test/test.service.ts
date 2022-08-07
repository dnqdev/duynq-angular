import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  index(page: number, classId: number) {
    return this.http.get(
      `https://test-t7.k8s-dev.omt.vn/api/students?page=${page}&classId=${classId}`
    );
  }

  store(body: any) {
    return this.http.post(
      `https://test-t7.k8s-dev.omt.vn/api/students/add`, body
    );
  }

  update(id: number, body: any) {
    return this.http.put(
      `https://test-t7.k8s-dev.omt.vn/api/students/${id}/update`, body
    );
  }

  delete(id: number) {
    return this.http.delete(
      `https://test-t7.k8s-dev.omt.vn/api/students/${id}/delete`
    );
  }

  getClassList() {
    return this.http.get(
      `https://test-t7.k8s-dev.omt.vn/api/classes`
    );
  }
}
