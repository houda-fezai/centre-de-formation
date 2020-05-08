import { Course } from './course';

export class Student {
    name: String;
    lastname:String;
    email: String;
    password: String;
    studentImage: String;
    courses: Course;  
    constructor(name:String, lastname:String, email:String, password:String,studentImage:String ,courses:Course){
        this.name =  name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.studentImage = studentImage;
        this.courses = courses;
    }
}
