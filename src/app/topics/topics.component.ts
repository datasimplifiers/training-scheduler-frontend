import { Component, OnInit } from '@angular/core';
import { TopicService } from '../services/topic.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
})
export class TopicsComponent implements OnInit {
  topics: any[] = [];
  categories: any[] = [];
  topicName: string = '';
  selectedCategory: number | null = null;  // Updated to allow null

  constructor(
    private topicService: TopicService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadTopics();
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

  addTopic() {
    if (this.selectedCategory !== null) {  // Ensure category is selected
      this.topicService
        .addTopic(this.topicName, this.selectedCategory)
        .subscribe(() => {
          this.loadTopics();
          this.resetForm();
        });
    }
  }

  resetForm() {
    this.topicName = '';
    this.selectedCategory = null;  // Reset to null after use
  }

  deleteTopic(id: number) {
    this.topicService.deleteTopic(id).subscribe(() => {
      this.loadTopics();
    });
  }
}
