import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(
    private http: HttpClient
  ) {

  }
  
  getText(
    urlEncoded: any
    ): Observable<any>{
    return this.http.get(urlEncoded, {responseType: 'text'});
  }
}
