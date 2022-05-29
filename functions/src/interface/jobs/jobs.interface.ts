
import { InterfaceGetJob, Job } from '../../jobs/model/job';

export default interface JobInterface{

    /**
   * post new job
   */
    postJob(newJob: Job): Promise<string>;
    
    /**
   * get all jobs
   */
    getJobs(reqParams: InterfaceGetJob): Promise<Job>; 
    
    /**
   * get specific user jobs by his uid
   */
    getUserJobs(uid: string): Promise<Array<Job>>;
    
    /**
   * search jobs by using filter values
   */
    searchJobs(searchParams: Job): Promise<Array<Job>>; 
    
    /**
   * update job by job id
   */
    updateJob(id: string, job: Job): Promise<void>;
    
    /**
   * delete job by job id
   */
    deleteJob(id: string): Promise<void>; 
// eslint-disable-next-line semi
}
