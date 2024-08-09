import express from 'express';
import cors from 'cors';
import { auth} from 'express-openid-connect';
import { userRouter } from './routes/userRouter.js';

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: 'Winf2sY2XywFxz4kUO25Zgihgupjk5NB',
  issuerBaseURL: 'https://dev-opk6mmz5ceopsl1s.us.auth0.com',
  secret: 'LONG_RANDOM_STRING'
};
app.use(auth(config));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use("/api", userRouter);

export {app};