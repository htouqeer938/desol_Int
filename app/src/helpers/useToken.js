import { useState } from "react";

const useToken = () => {
    const getToken = () => {
        // const userToken = sessionStorage.getItem("token");
        const userToken = localStorage.getItem("token");
        return userToken;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        // sessionStorage.setItem("token", userToken);
        localStorage.setItem("token", userToken);
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    };
};

export default useToken;
