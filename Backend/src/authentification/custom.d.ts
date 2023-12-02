import { User } from './path-to-your-user-model'; 

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
