import User from '../models/user';
import passport from 'passport';

/**
 * POST /logout
 */
export function logout(req, res) {
    // Do email and password validation for the server
    req.logout();
    const redirectUrl = req.query.state?req.query.state:"";
    res.redirect(`/${redirectUrl}`);
}

/**
 * GET /owner/id
 */

export function owner (req, res, next) {
    try {
        if(!req.user || !req.user.google || !req.user.tokens.youtube) return res.status(406).send('Denied');

        const { user } = req;

        const Youtube = require("youtube-api");
        Youtube.authenticate({
            type: "oauth",
            token: user.tokens.youtube
        });

        Youtube.videos.list({
            part: 'processingDetails',
            id: req.params.vid
        }, (err, data) => {
            if(err){
                //console.error(err);
                return res.status(500).send('Server Error');
            }
            //console.log(require('util').inspect(data, { depth: null }));
            return res.status(200).send(true);
        })


    } catch (e) {
        console.error(e);
        return res.status(500).send('Server Error');
    }
}

export default {
  logout,
  owner
};
