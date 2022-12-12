import axios from "axios";
export const userDataLocalStorage = JSON.parse(
    localStorage.getItem("userDetail")
);

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        config.headers.token = localStorage.getItem("token");
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (
            error?.response?.data?.status?.statusCode === 400 ||
            error?.response?.data?.status?.statusCode === 401
        ) {
            localStorage.clear();
            window.location.replace("/");
            return;
        }
        return Promise.reject(error);
    }
);
