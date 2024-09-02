import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalFormats: number = 0;
  totalCategories: number = 0;
  totalTopics: number = 0;
  trainings: any[] = [];

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Fetch data from the service
    this.trainingService.getDashboardData().subscribe((data) => {
      this.totalFormats = data.formats;
      this.totalCategories = data.categories;
      this.totalTopics = data.topics;
      this.trainings = data.trainings;
    });
  }
}
