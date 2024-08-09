import express from 'express';
import cors from 'cors';
import { auth} from 'express-openid-connect';
import  userRouter  from './Routes/userRouter.js';

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: 'http://localhost:3000',
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISUSERBASEURL
};
app.use(auth(config));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use("/", userRouter);

export {app};