import axios from "axios";

export const apiUrl = "http://localhost:8080/api";

export const adminLogin = async (payload) => {
    try {
        let response = await axios.post(`${apiUrl}/auth/signin`, payload);
        return response.data;
    } catch (error) {
        console.log(error.response);
        throw error.response;
    }
};


export const createCar = async (payload) => {
  try {
      let response = await axios.post(`${apiUrl}/create_car`, payload);
      return response.data;
  } catch (error) {
      console.log(error.response);
      throw error.response;
  }
};

export const uploadImage = (payload, callback) => {
    axios
      .post(`${apiUrl}/upload_image`, payload, {
        headers: {
          Accept: "application/json",
          type: "formData",
        },
      })
      .then((response) => {
        let a = response.data.response;
        callback(a);
      })
      .catch((err) => {
        console.log(err);
      });
  };