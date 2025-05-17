import { Router } from "express";
import validate from "../middlewares/validations";
import ProfileValidation from "../validations/profileValidation";
import ProfileController from "../controllers/profileController";
import getUserfromAuthToken from "../middlewares/jwtfromUser";


const profileRouter=Router();

profileRouter.put('/',validate(ProfileValidation.updateProfile),ProfileController.updateProfile)

profileRouter.get('/bulk',ProfileController.filterUser)

export default profileRouter;