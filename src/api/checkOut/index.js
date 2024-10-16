import axios from '../axios.js';
import * as api from '../path.js';

const CHECKOUT = api.path.CHECKOUT;

const getCheckOutAPI = () => {
    return axios({
            url: CHECKOUT.LIST,
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

const deleteCheckOutAPI = (checkOutId) => {
    return axios({
            url: `${CHECKOUT.DELETE}/${checkOutId}`,
            method: 'delete'
        })
        .then(res => {
            return { response: res, error: null };
        })
        .catch(err => {
            console.error(err);
            return { response: null, error: err };
        });
};

export { getCheckOutAPI, deleteCheckOutAPI };