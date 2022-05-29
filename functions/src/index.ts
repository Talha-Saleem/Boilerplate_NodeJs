
import express from 'express';
import * as firebase from 'firebase-functions';
import cors from 'cors';
import jobsRouter from './jobs/router/router.jobs';
import morgan from'morgan';
import { apiErrorHandler } from './error/apiErrorHandler';
import userRouter from './user/router/router.user';
import JobInterface from './interface/jobs/jobs.interface';
import JobService from './jobs/service/service.jobs';
import UserInterface from './interface/user/user.interface';
import UserService from './user/service/service.user';

const app = express();
app.use(cors());
// app.use(morgan('combined'))
app.use(
    morgan(function (tokens:any, req, res) {
      return [
        tokens.method(req, res),
        '-',
        tokens.url(req, res),
        '-',
        'Query:',
        JSON.stringify(req.query),
        '-',
        'Body',
        JSON.stringify(req.body),
        '-',
        'Params',
        JSON.stringify(req.params),
        '-',
        // 'User ID',
        // JSON.stringify(req.userId),
        '-',
        'Status:',
        tokens.status(req, res),
        '-',
        'Response Time:',
        tokens['response-time'](req, res),
        'ms'
      ].join(' ');
    })
  );

const jobService:JobInterface = new JobService();
const userService:UserInterface = new UserService();

app.use('/jobs', jobsRouter(jobService));
app.use('/user', userRouter(userService));

app.use(express.json);
app.use(express.urlencoded({ extended: false }));

app.use(apiErrorHandler);

// app.use(morganMiddleware)


// exports.userCreateTrigger=userCreateTrigger;
exports.api = firebase.https.onRequest(app);
// module.exports={app};
