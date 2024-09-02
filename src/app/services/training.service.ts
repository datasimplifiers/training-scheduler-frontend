import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTrainings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trainings`);
  }

  addTraining(trainingData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/trainings`, trainingData);
  }

  deleteTraining(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/trainings/${id}`);
  }

  // New method to fetch dashboard data
  getDashboardData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard-data`);
  }
}
