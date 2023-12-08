import { User } from '../user/user';
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import localStrategy from 'passport-local';
import JWTstrategy from 'passport-jwt';
import { prisma } from '../db/init';
import bcrypt from 'bcrypt';
import { BadInputError } from '../exceptions/bad-input-error';

export class AuthRouter {
    router = express.Router();

    constructor() {
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
                        const user = await prisma.user.findUnique({
                            where: {
                                email: email,
                            },
                        });

                        if (!user) {
                            throw new BadInputError(
                                'These credentials do not match our records.',
                            );
                        }

                        const isValidPassword = await bcrypt.compare(
                            password,
                            user.password,
                        );

                        if (!isValidPassword) {
                            throw new BadInputError(
                                'These credentials do not match our records.',
                            );
                        }

                        return done(
                            null,
                            {
                                id: user.id,
                                email: user.email,
                                name: user.name,
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
            new JWTstrategy.Strategy(
                {
                    secretOrKey: 'TOP_SECRET',
                    jwtFromRequest:
                        JWTstrategy.ExtractJwt.fromUrlQueryParameter('token'),
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
                async (err: Error, user: User, info: object) => {
                    try {
                        if (err || !user) {
                            throw new BadInputError(
                                'These credentials do not match ou records.',
                            );
                        }

                        req.login(user, { session: false }, async (error) => {
                            if (error) return next(error);

                            const body = { ...user };
                            const token = jwt.sign(
                                { user: body },
                                'TOP_SECRET',
                            );

                            return res.json({ token });
                        });
                    } catch (error) {
                        return next(error);
                    }
                },
            )(req, res, next);
        });
    }
}
