import { Length, IsEmail, IsNumber } from "class-validator";
import { InterfaceGetJob, Job } from "../jobs/model/job";

export class UserValidator {
  constructor(body) {
    this.email = body.email;
    this.role = body.role;
    this.uid = body.uid;
  }
  @IsEmail()
  email: string;

  @Length(6, 10)
  role: string;

  @Length(6, 100)
  uid: string;
}

export class JobParamValidator implements InterfaceGetJob {

  
  constructor(body) {
    this.startAfter = body.startAfter;
    this.endBefore = body.endBefore;
    this.limit = body.limit;
  }

  @Length(1, 10)
  startAfter: string;

  @Length(1, 10)
  endBefore: string;

  @Length(1, 5)
  limit: number;
}

export class JobValidator implements Job {

  constructor(body) {
      this.postName = body.postName;
      this.postedBy = body.postedBy;
      this.qualification = body.qualification;
      this.salary = body.salary;
      this.salaryType = body.salaryType;
      this.shift = body.shift;
      this.skill = body.skill;
      this.userID = body.userID;
      this.vacancies = body.vacancies;
      this.jobClass = body.jobClass;
      this.jobLevel = body.jobLevel;
      this.jobType = body.jobType;
      this.company = body.company;
      this.description = body.description;
      this.experience = body.experience;
      this.country= body.country;
  }


  @Length(2, 15)
  skill: string;

  @Length(2, 15)
  postName: string;

  @Length(2, 15)
  country: string;

  @Length(2, 25)
  company: string;

  @IsEmail()
  postedBy: string;

  @Length(2, 1000)
  description: string;

  @Length(2, 20)
  jobType: string;

  @Length(2, 30)
  jobLevel: string;

  @IsNumber()
  salary: number;

  @Length(2, 20)
  salaryType: string;

  @Length(2, 30)
  qualification: string;

  @IsNumber()
  vacancies: number;

  @Length(2, 100)
  experience: string;

  @Length(2, 100)
  jobClass: string;

  @Length(2, 50)
  shift: string;

  @Length(2, 200)
  userID: string;
}
