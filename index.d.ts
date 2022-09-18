// declare module 'express-session' {
//   interface SessionData {
//     userId: string;
//     isAuth: boolean;
//   }
// }

// declare global {
//   namespace Express {
//     interface Request {
//       // currentUser might not be defined if it is not logged in
//       session: Express.Session;
//     }
//   }
// }