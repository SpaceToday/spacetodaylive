/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const questionsController = controllers && controllers.questions;
const introController = controllers && controllers.intro;
const youtubeController = controllers && controllers.youtube;

export default (app) => {
  // user routes
  if (usersController) {
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
    app.get('/auth/google',(req, res, next) => {
        passport.authenticate('youtube', {
            scope: [
                'https://www.googleapis.com/auth/youtube.readonly'
            ],
            state: req.query.state
        })(req, res, next);
    });

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback', (req, res, next) => {
        const redirectUrl = req.query.state?req.query.state:"";
        passport.authenticate('youtube', {
            successRedirect: `${redirectUrl}`,
            failureRedirect: `${redirectUrl}`
        })(req, res, next);
    });
  }

  if(questionsController){
      app.get('/question/:vid', questionsController.all);
      app.post('/question/:vid', questionsController.add);
      app.put('/question/:vid/:qid', questionsController.update);
      app.delete('/question/:vid/:qid', questionsController.remove);
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

  if(introController) {
      app.get('/intro', introController.all);
  }else{
      console.warn(unsupportedMessage('intro routes'));
  }

  if(youtubeController) {
      app.get('/youtube/exist/:id', youtubeController.exist);
  }else{
      console.warn(unsupportedMessage('Youtube routes'));
  }


};
