import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { StudentService } from './services/student.service';
import { TeacherService } from './services/teacher.service';
import { LoginComponent } from './components/login/login.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { RegisterStComponent } from './components/register-st/register-st.component';
import { LoginStComponent } from './components/login-st/login-st.component';
import { RegisterTeachComponent } from './components/register-teach/register-teach.component';
import { LoginTeachComponent } from './components/login-teach/login-teach.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { CourseComponent } from './components/course/course.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { AuthGuard } from './guard/auth.guard';
import { AuthTrGuard } from './guard/auth-tr.guard';
import { AuthStGuard } from './guard/auth-st.guard';
import { SocketioService } from './services/socketio.service';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    StudentsComponent,
    TeachersComponent,
    HomeComponent,
    LoginComponent,
    UserDetailComponent,
    RegisterStComponent,
    LoginStComponent,
    RegisterTeachComponent,
    LoginTeachComponent,
    AddCourseComponent,
    EditCourseComponent,
    CourseComponent,
    CourseDetailComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService,StudentService,TeacherService, AuthGuard,AuthTrGuard,AuthStGuard, SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
