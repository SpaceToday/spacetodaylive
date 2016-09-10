import { google } from '../config/secrets';

export function isOwner(vid, user, cb){
    const Youtube = require("youtube-api");
    Youtube.authenticate({
        type: "oauth",
        refresh_token: user.tokens.youtube.refreshToken,
        client_id: google.clientID,
        client_secret: google.clientSecret,
        redirect_url: google.callbackURL
    });

    Youtube.videos.list({
        part: 'snippet',
        id: vid
    }, (err, data) => {
        if(err){
            console.error('YOUTUBE', err);
            return cb(false);
        }
        return cb(data.items[0].snippet.channelId == user.google);
    });
}

export default{
    isOwner
}
