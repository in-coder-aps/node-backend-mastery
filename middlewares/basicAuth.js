import passport from 'passport';
import { Person } from '../models/person.js';
import { BasicStrategy } from 'passport-http';

export default passport.use(new BasicStrategy(async (username, password, done) => {
    try {
        const user = await Person.findOne({ username });
        if (!user) return done(null, false, { message: 'Incorrect username' });
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) return done(null, user);
        else return done(null, false, { message: 'Incorrect password.' })
    } catch (error) {
        return done(error);
    }
}));
