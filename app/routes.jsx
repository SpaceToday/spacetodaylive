import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchVoteData, fetchIntroData } from 'fetch-data';
import App from 'containers/App';
import Main from 'containers/Main';
import Intro from 'containers/Intro';
import About from 'containers/About';
import { isOwner } from 'actions/users';
import {validateVideoID} from 'youtube-validate'

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
    const ownerVerification =  (nextState, replace, callback) => {

        validateVideoID(nextState.params.id) // a standard youtube id
        .then(res => {
            console.log(require('util').inspect(res, { depth: null }));
            const state = store.getState();
            if(state.user && state.user.authenticated)
                store.dispatch(isOwner(nextState.params.id));
            callback();
        }).catch(e =>{
            console.log(e);
            replace({
                pathname: '/'
            });
            callback();
        })
    }

    return (
        <Route path="/" component={App}>
            <IndexRoute component={Intro} fetchData={fetchIntroData} />
            <Route path="/:id" component={Main} onEnter={ownerVerification} />
            <Route path="about" component={About}  />
        </Route>
    );
};
