import express, { Express, Request, Response, NextFunction } from "express";
import employeRoute from "./interface/routes/userRoute";
const app: Express = express();
import cors from 'cors'
import startCronJob from "./helpers/CronJob";
import dotenv from 'dotenv'
dotenv.config()

app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Define a route
// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//   res.json({ data: "Server running successfully" });
// });
startCronJob();
app.use("/",employeRoute)

// Start the server
const PORT = process.env.PORT || 3000;
const HOST = process.env.URL || "http://localhost"
const hostname = process.env.HOSTNAME
app.listen(PORT ,() => {
  console.log(`Server is running on port ${HOST}:${PORT}`);
});
