import express from "express"
const router = express.Router()
import { googleController, loginController, registerController, logoutController } from "../controllers/authController.js"
import { updateUser, deleteUser } from "../controllers/userControllers.js"
import { varifyToken } from "../utils/varifyToken.js"





router.post("/login", loginController)

router.post("/register",registerController)

router.post("/google",googleController)

router.post("/update/:id",varifyToken, updateUser)

router.delete("/delete/:id",varifyToken, deleteUser)

router.get("/logout",logoutController)



export default router