import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";
import { HTTP401Error } from "../error/baseError";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  // console.log('headers: ',req.headers)

  if (!authorization)
  {
    console.log('1')
    next(new HTTP401Error('User is not authorized'))
    return;
  } 

  if (!authorization?.startsWith("Bearer")){
    console.log('2')
    next(new HTTP401Error('User is not authorized'))
    return;
    
  }

  const split = authorization.split("Bearer ");
  if (split.length !== 2){
    console.log(3)
    next(new HTTP401Error('User is not authorized'))
    return;
    
  }

  const token = split[1];

  try {
    const decodedToken: admin.auth.DecodedIdToken = await admin
      .auth()
      .verifyIdToken(token, true);
    res.currentUser = decodedToken;
    next();
  } catch (err) {
    next(new HTTP401Error('User is not authorized'))
    return;
  }
}
