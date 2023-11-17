import { Router } from 'express';
import { UserController } from './user.controller';
import { authenticateUser } from '../authentification/authMiddleware';

export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {

        this.router.post('/add-user', authenticateUser, async (req, res, next) => {
            try {
                await this.userController.add(req.body.name, req.body.email, req.body.password);
                res.status(200).json();
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.put('/:email', authenticateUser, async (req, res, next) => {
            try {
                await this.userController.updatePassword(req.params.email, req.body.password);;
                res.status(200).json();
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/', authenticateUser, async (req, res, next) => {
            try {
              const result = await this.userController.getAllEmail();
              res.status(200).json(result);
            } catch (error) {
              next(error);
            }
        });

        this.router.delete('/:email', authenticateUser, async (req, res, next) => {
            try {
                await this.userController.delete(req.params.email);
                res.status(200).json();
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/login', async (req, res, next) => {
            try {
              const { email, password } = req.body;
              const token = await this.userController.login(email, password);
          
              if (token) {
                res.status(200).json({ token });
              } else {
                res.status(401).json({ message: 'Invalid credentials' });
              }
            } catch (error: unknown) {
              next(error);
            }
        });
    }
          
}
