import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { HTTP400Error } from "../../error/baseError";
import { InterfaceGetJob, Job } from "../model/job";
import JobInterface from "../../interface/jobs/jobs.interface";
import { JobValidator } from "../../validate/validator";

export default class JobController {
  jobService: JobInterface;

  constructor(jobService: JobInterface) {
    this.jobService = jobService;
  }

  postJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedJob = new JobValidator(req.body);
      await this.jobService.postJob(validatedJob);
      return res.status(200)
    } catch (e) {
      throw e;
    }
  };

  async getJobs(reqParams: InterfaceGetJob): Promise<Job> {
    try {
      const jobs: Job = await this.jobService.getJobs(reqParams);
      return jobs;
    } catch (e) {
      throw e;
    }
  }

  async getUserJobs(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      uid: Joi.string().required(),
    });
    try {
      const { error, value } = schema.validate(req.query);
      if (error) {
        throw new HTTP400Error("invalid arguments");
      }

      const jobs: Array<Job> = await this.jobService.getUserJobs(value.uid);
      res.send(jobs);
    } catch (e) {
      next(e);
    }
  }

  async searchJobs(searchParams: Job): Promise<Array<Job>> {
    try {
      const jobs: Array<Job> = await this.jobService.searchJobs(searchParams);
      return jobs;
    } catch (e) {
      throw e;
    }
  }

  updateJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.query.jobId as string;
      await this.jobService.updateJob(id, req.body);
      return res.status(200)
    } catch (e) {
      throw e;
    }
  };

  deleteJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId: string = req.query.jobId as string;
      await this.jobService.deleteJob(jobId);
      return res.status(200)
    } catch (e) {
      throw e;
    }
  };
}

// module.exports = new Controller();
