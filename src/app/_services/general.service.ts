import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    constructor(private http: HttpClient) { }

    uploadFileBase64(data:any) {
        // data input type base 64
        return this.http.post(`${environment.apiIdentityService}/api/common/upload-file-base64`,data);
    }

    uploadFile(data:any) {
        // data input type file
        return this.http.post(`${environment.apiIdentityService}/api/common/upload-file`,data);
    }

    uploadMultipleFile(data:any) {
        // data input type file
        return this.http.post(`${environment.apiIdentityService}/api/common/upload-multiple-image`,data);
    }
}

