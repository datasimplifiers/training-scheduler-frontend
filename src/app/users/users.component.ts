import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormatService } from '../services/format.service';
import { CategoryService } from '../services/category.service';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  formats: any[] = [];
  categories: any[] = [];
  topics: any[] = [];
  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';
  userRole: string = '';
  selectedFormats: number[] = [];
  selectedCategories: number[] = [];
  selectedTopics: number[] = [];

  constructor(
    private userService: UserService,
    private formatService: FormatService,
    private categoryService: CategoryService,
    private topicService: TopicService,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadFormats();
    this.loadCategories();
    this.loadTopics();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
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

  addUser() {
    const newUser = {
      name: this.userName,
      email: this.userEmail,
      password: this.userPassword,
      roles: [this.userRole],
      formats: this.selectedFormats,
      categories: this.selectedCategories,
      topics: this.selectedTopics,
    };
    this.userService.addUser(newUser).subscribe(() => {
      this.loadUsers();
      this.resetForm();
    });
  }

  resetForm() {
    this.userName = '';
    this.userEmail = '';
    this.userPassword = '';
    this.userRole = '';
    this.selectedFormats = [];
    this.selectedCategories = [];
    this.selectedTopics = [];
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}
