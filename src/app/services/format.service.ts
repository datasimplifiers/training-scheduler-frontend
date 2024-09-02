import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFormats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/formats`);
  }

  addFormat(name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/formats`, { name });
  }

  deleteFormat(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/formats/${id}`);
  }
}
