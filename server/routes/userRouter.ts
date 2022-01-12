import { Router } from 'express';
import UserController from '../controllers/userController';
const router = Router();

router.get('/get', UserController.getUsers);
router.post('/create/employee', UserController.createEmployee);
router.post('/create/manager', UserController.createManager);
router.put('/edit/employee/:id', UserController.editEmployee);
router.put('/edit/manager/:id', UserController.editManager);
router.delete('/delete/employee/:id', UserController.deleteEmployee);
router.delete('/delete/manager/:id', UserController.deleteManager);

export default router;