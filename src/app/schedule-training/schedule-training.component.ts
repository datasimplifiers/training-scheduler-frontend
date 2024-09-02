import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../services/training.service';
import { UserService } from '../services/user.service';
import { FormatService } from '../services/format.service';
import { CategoryService } from '../services/category.service';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-schedule-training',
  templateUrl: './schedule-training.component.html',
  styleUrls: ['./schedule-training.component.css'],
})
export class ScheduleTrainingComponent implements OnInit {
  trainers: any[] = [];
  formats: any[] = [];
  categories: any[] = [];
  topics: any[] = [];
  selectedTrainer: number | null = null;
  selectedFormat: number | null = null;
  selectedCategory: number | null = null;
  selectedTopic: number | null = null;
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
    this.loadTrainers();
    this.loadFormats();
    this.loadCategories();
    this.loadTopics();
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

  addSchedule() {
    const newSchedule = {
      trainer: this.selectedTrainer,
      format: this.selectedFormat,
      category: this.selectedCategory,
      topic: this.selectedTopic,
      startTime: this.startTime,
      endTime: this.endTime,
      timeZone: this.timeZone,
    };
    this.trainingService.addTraining(newSchedule).subscribe(() => {
      alert('Training Scheduled Successfully');
      this.resetForm();
    });
  }

  resetForm() {
    this.selectedTrainer = null;
    this.selectedFormat = null;
    this.selectedCategory = null;
    this.selectedTopic = null;
    this.startTime = null;
    this.endTime = null;
    this.timeZone = '';
  }
}
