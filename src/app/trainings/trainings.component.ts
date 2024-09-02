import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../services/training.service';
import { UserService } from '../services/user.service';
import { FormatService } from '../services/format.service';
import { CategoryService } from '../services/category.service';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css'],
})
export class TrainingsComponent implements OnInit {
  trainings: any[] = [];
  trainers: any[] = [];
  formats: any[] = [];
  categories: any[] = [];
  topics: any[] = [];
  trainingTitle: string = '';
  selectedTrainer: number | null = null;  // Allow null value
  selectedFormat: number | null = null;   // Allow null value
  selectedCategory: number | null = null; // Allow null value
  selectedTopic: number | null = null;    // Allow null value
  startTime: Date | null = null;
  endTime: Date | null = null;
  timeZone: string = '';

  constructor(
    private trainingService: TrainingService,
    private userService: UserService,
    private formatService: FormatService,
    private categoryService: CategoryService,
    private topicService: TopicService,
  ) {}

  ngOnInit(): void {
    this.loadTrainings();
    this.loadTrainers();
    this.loadFormats();
    this.loadCategories();
    this.loadTopics();
  }

  loadTrainings() {
    this.trainingService.getTrainings().subscribe((data) => {
      this.trainings = data;
    });
  }

  loadTrainers() {
    this.userService.getUsers().subscribe((data) => {
      this.trainers = data.filter((user) => user.roles.includes('trainer'));
    });
  }

  loadFormats() {
    this.formatService.getFormats().subscribe((data) => {
      this.formats = data;
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  loadTopics() {
    this.topicService.getTopics().subscribe((data) => {
      this.topics = data;
    });
  }

  addTraining() {
    if (
      this.selectedTrainer !== null &&
      this.selectedFormat !== null &&
      this.selectedCategory !== null &&
      this.selectedTopic !== null &&
      this.startTime !== null &&
      this.endTime !== null
    ) {
      const newTraining = {
        title: this.trainingTitle,
        trainer: this.selectedTrainer,
        format: this.selectedFormat,
        category: this.selectedCategory,
        topic: this.selectedTopic,
        startTime: this.startTime,
        endTime: this.endTime,
        timeZone: this.timeZone,
      };
      this.trainingService.addTraining(newTraining).subscribe(() => {
        this.loadTrainings();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.trainingTitle = '';
    this.selectedTrainer = null;
    this.selectedFormat = null;
    this.selectedCategory = null;
    this.selectedTopic = null;
    this.startTime = null;
    this.endTime = null;
    this.timeZone = '';
  }

  deleteTraining(id: number) {
    this.trainingService.deleteTraining(id).subscribe(() => {
      this.loadTrainings();
    });
  }
}
