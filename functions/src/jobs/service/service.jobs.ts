
import JobInterface from '../../interface/jobs/jobs.interface';
import { InterfaceGetJob, Job } from '../model/job';
import JobsDatabase from '../database/db.jobs';

export default class JobService implements JobInterface {
  jobDatabase:JobsDatabase;

  constructor() {
    this.jobDatabase = new JobsDatabase();
  }

  async postJob(newJob: Job): Promise<string> {
    try {
      console.log('[service.jobs.ts] [postJob] - body: ' + JSON.stringify(newJob));
      newJob = this.changePostNameToBlockCase(newJob);
      const result: string = await this.jobDatabase.postJob(newJob);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async getJobs(reqParams: InterfaceGetJob): Promise<Job> {
    console.log('[service.jobs.ts] [getJobs] - body: ' + JSON.stringify(reqParams));
    try {
      const jobs = await this.jobDatabase.getJobs(reqParams);
      return jobs;
    } catch (e) {
      throw e;
    }
  }

  async getUserJobs(uid: string): Promise<Array<Job>> {
    try {
      console.log('[service.jobs.ts] [getUserJobs] - body: '+ uid.toString())
      const jobs: Array<Job> = await this.jobDatabase.getUserJobs(uid);
      return jobs;
    } catch (e) {
      throw e;
    }
  }

  async searchJobs(searchParams: Job): Promise<Array<Job>> {
    try {
      console.log('[service.jobs.ts] [searchJobs] - body: ' + JSON.stringify(searchParams))
      const jobs: Array<Job> = await this.jobDatabase.searchJob(searchParams);
      return jobs;
    } catch (e) {
      throw e;
    }
  }

  async updateJob(id: string, job: Job): Promise<void> {
    try {
      console.log('[service.jobs.ts] [updateJob] - body: ' + id.toString() + ' ' + JSON.stringify(job))
      const newJob = this.changePostNameToBlockCase(job);
      await this.jobDatabase.updateJob(id, newJob);
      return;
    } catch (e) {
      throw e;
    }
  }

  async deleteJob(id: string): Promise<void> {
    try {
      console.log('[service.jobs.ts] [deleteJob] - body: ' + id.toString())
      await this.jobDatabase.deleteJob(id);
      return;
    } catch (e) {
      throw e;
    }
  }

  changePostNameToBlockCase(newJob:Job):Job {
    let postName: string = newJob.postName ? newJob.postName : '';
    const splitStr = postName.toString().toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i += 1) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    postName = splitStr.join(' ');
    newJob = { ...newJob, postName };
    return newJob;
  }
}

// module.exports = new Service();
