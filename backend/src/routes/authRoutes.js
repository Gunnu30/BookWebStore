const express = require("express")
const routes = express.Router();

const authController = require('../controllers/authUserController');
const authMiddleware = require("../middleware/authMiddleware");
const adminController = require('../controllers/adminController');

routes.get('/me' , authMiddleware,authController.getMe)
routes.post('/logout' , authMiddleware,authController.removeToken);

routes.post('/register',authController.registerUser)
routes.post('/login',authController.loginUser)


//admin routes
routes.post('/admin/register',authController.registerAdmin);
routes.post('/logout',authMiddleware,authController.removeToken)
routes.post("/admin/login" , authController.loginAdmin);

routes.post('/admin/add-book',authMiddleware,adminController.addBook);


module.exports = routes