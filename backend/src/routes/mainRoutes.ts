import { Router } from "express";
import authRoutes from "./authRoutes";
import accountRoutes from "./accountRoutes";
import profileRouter from "./profileRoutes";
const mainRoutes=Router();


mainRoutes.use("/user",authRoutes)

mainRoutes.use('/account',accountRoutes)

mainRoutes.use('/user',profileRouter)
export default mainRoutes