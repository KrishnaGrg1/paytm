import { Router } from "express";
import getUserfromAuthToken from "../middlewares/jwtfromUser";
import validate from "../middlewares/validations";
import AccountValidation from "../validations/accountValidation";
import AccountController from "../controllers/accountController";

const accountRoutes=Router();

accountRoutes.post('/transferMoney',validate(AccountValidation.transferMoney),AccountController.transfer);

accountRoutes.get('/balance',AccountController.AccountDetails);

export default accountRoutes