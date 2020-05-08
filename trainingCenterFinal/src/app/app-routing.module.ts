import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { LoginComponent } from './components/login/login.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AuthGuard } from './guard/auth.guard';
import { RegisterStComponent } from './components/register-st/register-st.component';
import { LoginStComponent } from './components/login-st/login-st.component';
import { RegisterTeachComponent } from './components/register-teach/register-teach.component';
import { LoginTeachComponent } from './components/login-teach/login-teach.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { CourseComponent } from './components/course/course.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { AuthStGuard } from './guard/auth-st.guard';
import { AuthTrGuard } from './guard/auth-tr.guard';




const routes: Routes = [
{ path: "home", redirectTo: "home", pathMatch:"full" },
{path: "home", component: HomeComponent},
{path: "users", component: UsersComponent},
{path: "student/:id", component: StudentsComponent, canActivate:[AuthStGuard]},
{path: "teacher/:id", component: TeachersComponent,canActivate:[AuthTrGuard] },
{ path: "loginUser", component: LoginComponent },
{ path: "userDetail",component:UserDetailComponent,canActivate:[AuthGuard] },
{path: "registerS", component: RegisterStComponent },
{path: "loginS", component: LoginStComponent },
{path: "registerTr", component: RegisterTeachComponent },
{path: "loginTr", component: LoginTeachComponent},
{path: "addCourse", component: AddCourseComponent,canActivate:[AuthGuard]  },
{path:"editCourse/:id", component:EditCourseComponent,canActivate:[AuthGuard] },
{path: "courses", component:CourseComponent},
{ path: "courseDetail/:id", component:CourseDetailComponent, canActivate:[AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
