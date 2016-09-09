
export function isOwner(vid, user, cb){
    const Youtube = require("youtube-api");
    Youtube.authenticate({
        type: "oauth",
        token: user.tokens.youtube
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
