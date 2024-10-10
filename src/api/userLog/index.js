import axios from '../axios.js';
import * as api from '../path';

const USERLOG = api.path.USERLOG;

const getUserLogAPI = () => {
    return axios({
            url: USERLOG.LIST,
            method: 'get'
        })
        .then(res => {
            if (!res || !res.data) {
                alert("응답 에러");
            }
            return { response: res, error: null };
        })
        .catch(err => {
            console.error(err);
            return { response: null, error: err };
        });
};

const createUserLogAPI = (params) => {
    return axios({
            url: USERLOG.CREATE,
            method: 'post',
            data: params
        })
        .then(res => {
            return { response: res, error: null };
        })
        .catch(err => {
            console.error(err);
            return { response: null, error: err };
        });
};

const updateUserLogAPI = (params) => {
    return axios({
            url: USERLOG.UPDATE,
            method: 'put',
            data: params
        })
        .then(res => {
            return { response: res, error: null };
        })
        .catch(err => {
            console.error(err);
            return { response: null, error: err };
        });
};

const deleteUserLogAPI = (userLogIds) => {
    return axios({
            url: USERLOG.DELETE,
            method: 'delete',
            data: userLogIds
        })
        .then(res => {
            return { response: res, error: null };
        })
        .catch(err => {
            console.error(err);
            return { response: null, error: err };
        });
};

export { getUserLogAPI, createUserLogAPI, updateUserLogAPI, deleteUserLogAPI };