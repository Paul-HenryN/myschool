import express from 'express';
import passport from 'passport';
import localStrategy from 'passport-local';
import JWTStrategy from 'passport-jwt';
import { AuthController } from './auth.controller';
import { User } from '../user/user';
import { BadInputError } from '../exceptions/bad-input-error';
import jwt from 'jsonwebtoken';
import { MySchoolError } from '../exceptions/myschool-error';
export class AuthRouter {
    router = express.Router();

    constructor(private authController: AuthController) {
        this.configurePassport();
        this.configureRoutes();
    }

    private configurePassport() {
        passport.use(
            'login',
            new localStrategy.Strategy(
                {
                    usernameField: 'email',
                    passwordField: 'password',
                },
                async (email, password, done) => {
                    try {
                        const { id, name, role } =
                            await this.authController.login(email, password);

                        return done(
                            null,
                            {
                                id,
                                email,
                                name,
                                role,
                            },
                            { message: 'Logged In successfully' },
                        );
                    } catch (error) {
                        done(error);
                    }
                },
            ),
        );

        passport.use(
            new JWTStrategy.Strategy(
                {
                    secretOrKey: 'TOP_SECRET',
                    jwtFromRequest:
                        JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
                },
                async (token, done) => {
                    try {
                        return done(null, token.user);
                    } catch (error) {
                        done(error);
                    }
                },
            ),
        );
    }

    private configureRoutes() {
        this.router.post('/login', async (req, res, next) => {
            passport.authenticate(
                'login',
                async (err: Error, user: User, info: any) => {
                    try {
                        if (err) {
                            return next(err);
                        }

                        if (!user) {
                            return next(
                                new BadInputError('Invalid Credentials'),
                            );
                        }

                        req.login(user, { session: false }, async (error) => {
                            if (error) return next(error);

                            const body = { _id: user.id, email: user.email };
                            const token = jwt.sign(
                                { user: body },
                                'TOP_SECRET',
                            );

                            return res.json({ token, user });
                        });
                    } catch (error: unknown) {
                        return next(error);
                    }
                },
            )(req, res, next);
        });
    }
}
