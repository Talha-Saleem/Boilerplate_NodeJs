import { Request, Response, NextFunction } from "express";
import { HTTP403Error, HTTP500Error } from "../error/baseError";
import { Job } from "../jobs/model/job";
import { UserRoles } from "../user/model/user.model";
const database = require("../jobs/database/db.jobs")


export function isAuthorized(
  req: Request,
  res: Response,
  next: NextFunction,
  hasRole: Array<UserRoles>
):void {
  const role = res.currentUser.role;

  if (!role) {
    next(new HTTP403Error("You don't have sufficient permission"));
    return;
  }

  if (hasRole.includes(role)) {
    console.log('have role')
    next();
    return;
  }

  next(new HTTP403Error("You don't have sufficient permission"));
  return;
}

export async function allowUserWithSameUID(
  req: Request,
  res: Response,
  next: NextFunction
  ){
      const {jobId} = req.query;
      const userID = res.currentUser.uid;
  
    try {
  
      if(res.currentUser.uid.role==='admin'){
          next();
          return;
      }
      const snapshot:any = await database.getJobByID(jobId);
      const job:Job =snapshot.data();
      console.log('job: ',job)
      console.log('userID in job: ',job['userID']);
      console.log('uid: ',userID)
  
      if(job['userID']===userID){
          next();
          return;
      }
      next(new HTTP403Error("You don't have sufficient permission to do this"));
      return;
    } catch (err) {
      next(new HTTP500Error("Internal Server Error"));
      return;
    }
  
  }
