/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'types';

polyfill();


export function makeQuestionRequest(method, id, data, api = '/question') {
    return request[method](api + (id ? ('/' + id) : ''), data);
}


export function createQuestion(){
    return (dispatch, getState) => {
        return makeQuestionRequest("post")
    }
}
