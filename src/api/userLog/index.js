import axios from '../axios.js';
import * as api from '../path';

const USERLOG = api.path.USERLOG;

const getUserLogAPI = () => {
    const userLogPath = "/admin/user-log";
    return axios({
            url: USERLOG.LIST,
            method: 'get'
        })
        .then(res => {
            // 응답 데이터가 없는 경우 에러 처리
            if (!res || !res.data) {
                alert("응답 에러");
            }
            console.log("연결 성공");
            return { response: res, error: null };
        })
        .catch(err => {
            console.error(err);
            return { response: null, error: err };
        });
};

export { getUserLogAPI };