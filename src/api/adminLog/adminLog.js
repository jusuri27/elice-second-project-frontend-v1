import { API_BASE_URL } from '../path.js';
import axios from '../axios';


const getAdminLogAPI = () => {
    const errMsg = '에러!!';
    const userLogPath = "/admin/user-log";
    return axios({
            url: API_BASE_URL + userLogPath,
            method: 'get'
        })
        .then(res => {
            // 응답 데이터가 없는 경우 에러 처리
            if (!res || !res.data) {
                throw new Error(errMsg);
            }
            console.log("연결 성공");
            return { response: res, error: null };
        })
        .catch(err => {
            console.error(err);
            return { response: null, error: err };
        });
};

export { getAdminLogAPI };