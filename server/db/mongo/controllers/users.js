import User from '../models/user';
import passport from 'passport';
import { isOwner } from '../../../youtube';
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
        if(!req.user || !req.user.google) return res.status(406).send('Denied');

        const { user } = req;
        isOwner(req.params.vid, user, (isOwnerResp) => {
            return res.status(200).send( isOwnerResp );
        });
    } catch (e) {
        console.error(e);
        return res.status(500).send('Server Error');
    }
}

export default {
  logout,
  owner
};
