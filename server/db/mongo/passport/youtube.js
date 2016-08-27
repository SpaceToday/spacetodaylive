import User from '../models/user';

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
    console.log(require('util').inspect(profile, { depth: null }));
    return User.findOne({ google: profile.id }, (findByGoogleIdErr, existingUser) => {
        if (existingUser) return done(null, existingUser);

        const user = new User();
        user.google = profile.id;
        user.tokens.push({ kind: 'google', accessToken });
        user.profile.name = profile.displayName;
        user.profile.picture = profile._json.items[0].snippet.thumbnails.default.url;
        return user.save((err) => {
            done(err, user);
        });
    });
};
/* eslint-enable no-param-reassign */
