import axios from '../axios.js';
import * as api from '../path';

const CATEGORY = api.path.CATEGORY;

const getCategoryAPI = () => {
    return axios({
            url: CATEGORY.LIST,
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

export { getCategoryAPI };