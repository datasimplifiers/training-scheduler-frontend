import { Component, OnInit } from '@angular/core';
import { FormatService } from '../services/format.service';

@Component({
  selector: 'app-formats',
  templateUrl: './formats.component.html',
  styleUrls: ['./formats.component.css'],
})
export class FormatsComponent implements OnInit {
  formats: any[] = [];
  formatName: string = '';

  constructor(private formatService: FormatService) {}

  ngOnInit(): void {
    this.loadFormats();
  }

  loadFormats() {
    this.formatService.getFormats().subscribe((data) => {
      this.formats = data;
    });
  }

  addFormat() {
    this.formatService.addFormat(this.formatName).subscribe(() => {
      this.loadFormats();
      this.formatName = '';
    });
  }
}
