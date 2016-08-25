/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const questionsController = controllers && controllers.questions;

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
    app.get('/owner/:vid', usersController.owner);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google',(req, res) => {
        passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/youtube.readonly',
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ],
            state: req.query.vid
        })(req, res);
    });

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback', (req, res) => {
        let redirectUrl = req.query.state?req.query.state:"";
        passport.authenticate('google', {
            successRedirect: `/${redirectUrl}`,
            failureRedirect: `/${redirectUrl}`
        })(req, res);
    });
  }

  if(questionsController){
      app.get('/question/:vid', questionsController.all);
      app.post('/question/:vid', questionsController.add);
      app.put('/question/:vid/:qid', questionsController.update);
  }else{
      console.console.warn(unsupportedMessage('questions routes'));
  }

  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.post('/topic/:id', topicsController.add);
    app.put('/topic/:id', topicsController.update);
    app.delete('/topic/:id', topicsController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }
};

// https://accounts.google.com/AccountChooser?continue=https://accounts.google.com/o/oauth2/v2/auth?scope%3Dhttps://www.googleapis.com/auth/youtube.readonly%2Bhttps://www.googleapis.com/auth/userinfo.profile%2Bhttps://www.googleapis.com/auth/userinfo.email%26response_type%3Dcode%26redirect_uri%3Dhttp://localhost:3000/auth/google/callback%26client_id%3D152848339334-fjm7apvmhc18ogrh55uohkvefi9vi11a.apps.googleusercontent.com%26from_login%3D1%26as%3D-4fe24ea75a83aa59&ltmpl=nosignup&btmpl=authsub&scc=1&oauth=1
