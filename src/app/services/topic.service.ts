import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTopics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/topics`);
  }

  addTopic(name: string, categoryId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/topics`, { name, categoryId });
  }

  deleteTopic(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/topics/${id}`);
  }
}
