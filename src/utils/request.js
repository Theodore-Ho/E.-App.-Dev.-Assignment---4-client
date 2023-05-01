import axios from "axios";
import {Loading, Message} from "element-ui";
import Vue from "vue";
let loadingInstance;
let timestampStart = 0;

const Base_URL = 'http://localhost:8080/api'; // dev
// const Base_URL = '/api'; // prod

const service = axios.create({
    timeout: 5000,
    responseType: "json",
    baseURL: Base_URL,
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
})

service.interceptors.request.use(
    config => {
        timestampStart = Date.now();
        loadingInstance = Loading.service({ fullscreen: true });
        return config
    },
    error => {
        Message({
            showClose: true,
            message: error,
            type: "warning"
        });
        return Promise.reject(error);
    });

service.interceptors.response.use(
    response => {
        const timestampEnd = Date.now();
        const response_time = Math.abs(timestampEnd - timestampStart);
        console.log(response_time);
        loadingInstance.close();
        if (response.status === 200) {
            if(response.data.status === 200) { // custom response code
                return Promise.resolve(response);
            } else {
                console.log("abc")
            }
        } else {
            Vue.prototype.$alert("Unexpected Results", {
                confirmButtonText: "Confirm",
                callback: () => {}
            }).then(() => {});
            return Promise.reject(response);
        }
    },
    error => {
        if(error.code === 'ECONNABORTED' || error.message === 'Network Error' || error.message.includes("timeout")) {
            Vue.prototype.$alert("Timeout, please try again.", {
                confirmButtonText: "Confirm",
                callback: () => {}
            }).then(() => {});
        } else {
            Vue.prototype.$alert("Unexpected Error", {
                confirmButtonText: "Confirm",
                callback: () => {}
            }).then(() => {});
        }
        return Promise.reject(error.response);
    });

export default service;