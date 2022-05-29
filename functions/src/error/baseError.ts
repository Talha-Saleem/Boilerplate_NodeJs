import { HttpStatusCode } from "./statusCode.types";

class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;
    
    constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational: boolean) {
      super(description);
      Object.setPrototypeOf(this, new.target.prototype);
    
      this.name = name;
      this.httpCode = httpCode;
      this.isOperational = isOperational;
    
      Error.captureStackTrace(this);
    }
   }

   class HTTP400Error extends BaseError {
    constructor(description = 'bad request') {
      super('BAD REQUEST', HttpStatusCode.BAD_REQUEST, description,true);
    }
   }

   class HTTP404Error extends BaseError {
    constructor(description = 'requested resource not found') {
      super('NOT FOUND', HttpStatusCode.NOT_FOUND, description,true);
    }
   }

   class HTTP500Error extends BaseError {
    constructor(description = 'internal server error') {
      super('INTERNAL SERVER ERROR', HttpStatusCode.INTERNAL_SERVER, description,true);
    }
  }

   class HTTP403Error extends BaseError {
    constructor(description = 'permission denied') {
      super('FORBIDDEN', HttpStatusCode.PERMISSION_DENIED, description,true);
    }
  }

  class HTTP401Error extends BaseError {
    constructor(description = 'Unauthorized') {
      super('UNAUTHORIZED', HttpStatusCode.UNAUTHORIZED, description,true);
    }
  }

   export {BaseError,HTTP400Error,HTTP404Error,HTTP500Error,HTTP403Error,HTTP401Error};