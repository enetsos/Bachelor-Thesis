// middleware/passport.ts

import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import User from '../db/models/user'; // Adjust the path as necessary
import { Request, Response, NextFunction } from 'express';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'secret',
};

passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
        try {
            // Assuming jwtPayload contains both userId and email
            const user = await User.findOne({ where: { id: jwtPayload.userId } });

            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    })
);

export const initializePassport = () => passport.initialize();

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
        console.log(user);
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized User' });
        }
        req.user = user;
        next();
    })(req, res, next);
};
