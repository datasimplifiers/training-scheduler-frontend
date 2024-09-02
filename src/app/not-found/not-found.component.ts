import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found">
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <a routerLink="/login">Go to Login</a>
    </div>
  `,
  styles: [
    `
      .not-found {
        text-align: center;
        margin-top: 50px;
      }
    `
  ]
})
export class NotFoundComponent {}
