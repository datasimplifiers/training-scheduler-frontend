import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormatsComponent } from './formats/formats.component';
import { ScheduleTrainingComponent } from './schedule-training/schedule-training.component';
import { TopicsComponent } from './topics/topics.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { UsersComponent } from './users/users.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { CategoryService } from './services/category.service';
import { FormatService } from './services/format.service';
import { TopicService } from './services/topic.service';
import { TrainingService } from './services/training.service';
import { UserService } from './services/user.service';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FormatsComponent,
    ScheduleTrainingComponent,
    TopicsComponent,
    TrainingsComponent,
    UsersComponent
    // other components...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    CategoryService,
    FormatService,
    TopicService,
    TrainingService,
    UserService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
