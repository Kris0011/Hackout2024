import express from 'express';
import cors from 'cors';
import { auth} from 'express-openid-connect';
import  userRouter  from './Routes/userRouter.js';

const app = express();

const server =  http.createServer(app);

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: process.env.CLIENTID,
  issuerBaseURL: 'https://dev-opk6mmz5ceopsl1s.us.auth0.com',
  secret: process.env.SECRET
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


const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
	},
});


io.on("connection", socket => {
	

	console.log("User connected");

	socket.on("disconnect", () => {
         console.log("User disconnected");
	});

});



export {server};