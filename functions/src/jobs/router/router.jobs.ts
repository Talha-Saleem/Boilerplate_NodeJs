
import express, { Request, Response, NextFunction } from 'express';
import { isAuthorized, allowUserWithSameUID } from '../../auth/authorized';
import { isAuthenticated } from '../../auth/authenticated';
import { UserRoles } from '../../user/model/user.model';
import JobInterface from '../../interface/jobs/jobs.interface';
import JobController from '../controller/controller.jobs';
import { JobParamValidator, JobValidator } from '../../validate/validator';

export default function jobsRouter(jobService: JobInterface) {
  const app = express();

  const jobController = new JobController(jobService);

  app.post(
    '/create',
    isAuthenticated,
    (req: Request, res: Response, next: NextFunction) => {
      isAuthorized(req, res, next, [UserRoles.admin, UserRoles.premiumUser]);
    },
    jobController.postJob,
  );

  app.get('/get', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedGetJob = new JobParamValidator(req.body);
      const jobs = await jobController.getJobs(validatedGetJob);
      res.send(jobs);
    } catch (e) {
      next(e);
    }
  });

  app.get(
    '/search',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validatedJob = new JobValidator(req.body);
        const jobs = await jobController.searchJobs(validatedJob);
        res.send(jobs);
      } catch (e) {
        next(e);
      }
    },
  );

  app.put(
    '/update',
    isAuthenticated,
    (req: Request, res: Response, next: NextFunction) => {
      isAuthorized(req, res, next, [UserRoles.admin, UserRoles.premiumUser]);
    },
    allowUserWithSameUID,
    jobController.updateJob,
  );

  app.get(
    '/getUserJobs',
    isAuthenticated,
    (req: Request, res: Response, next: NextFunction) => {
      isAuthorized(req, res, next, [UserRoles.premiumUser]);
    },
    jobController.getUserJobs,
  );
  app.post(
    '/delete',
    isAuthenticated,
    (req: Request, res: Response, next: NextFunction) => {
      isAuthorized(req, res, next, [UserRoles.admin, UserRoles.premiumUser]);
    },
    allowUserWithSameUID,
    jobController.deleteJob,
  );

  return app;
}
