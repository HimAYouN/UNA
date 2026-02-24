import { Router } from "express";
import { userProfile } from "./user.controller";

const route = Router();

route.get('/me', userProfile)