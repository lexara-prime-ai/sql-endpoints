/////////////////////////////
///////// IMPORTS //////////
////////////////////////////
import { Router } from "express";
import { addUser, getUserById, getUsers } from "../controllers/userController";

// INITIALIZE ROUTER
const userRoutes = Router();
// ROUTES
//// GET METHODS ////
userRoutes.get('/:userId', getUserById); // GET USER BY ID
userRoutes.get('', getUsers);            // GET ALL USERS
//// POST METHODS ////
userRoutes.post('', addUser);            // ADD USER
// EXPORTS
export default userRoutes;
