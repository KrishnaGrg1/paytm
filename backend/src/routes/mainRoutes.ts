import { Router } from "express";
import authRoutes from "./authRoutes";
import accountRoutes from "./accountRoutes";
import profileRouter from "./profileRoutes";
import getUserfromAuthToken from "../middlewares/jwtfromUser";
const mainRoutes=Router();


mainRoutes.use("/user",authRoutes)

mainRoutes.use('/account',getUserfromAuthToken,accountRoutes)

mainRoutes.use('/user',getUserfromAuthToken,profileRouter)
export default mainRoutes