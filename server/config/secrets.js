import fs from 'fs';
/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
export const sessionSecret = process.env.SESSION_SECRET || 'Your Session Secret goes here';
export const google = {
  clientID: process.env.GOOGLE_CLIENT_ID || JSON.parse(fs.readFileSync('server/config/client_secret.json', 'utf8')).web.client_id,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || JSON.parse(fs.readFileSync('server/config/client_secret.json', 'utf8')).web.client_secret,
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

export default {
  sessionSecret,
  google
};
