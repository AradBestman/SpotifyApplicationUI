import Axios from "axios";
// import router from '@/router';

const BASE_URL =
  process.env.NODE_ENV === "production" ? "/api/" : "//localhost:5001/";

var axios = Axios.create({
  withCredentials: true,
});

export default {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data) {
    console.log(data, "inHTTPSERVICE");
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(endpoint, method = "get", data = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`, // Corrected template literal syntax
      method,
      data,
    });
    return res.data;
  } catch (err) {
    console.log("ERROR IN AJAX CALL:", err);

    // if (err.response.status === 401) {
    //     router.push('/login');
    // }
  }
}
