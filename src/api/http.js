// 配置请求
// HOSTNAME  token  loading 响应处理
import {HOSTNAME} from "../config/base";
import axios from "axios";
let token = '';


// 获取cookie
function  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
getToken()
function getToken() {
    token = getCookie('token');
}
const instance = axios.create({
    baseURL: HOSTNAME,
    timeout:10000,
    headers: {'Authorization': 'Bearer ' + token},
});

instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default instance;