import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "http://127.0.0.1:8000/";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, logoutUser } =
    useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens.access);

    if (user.exp * 1000 < Date.now()) {
      logoutUser();
      return req;
    }

    // const response = await axios.post(`${baseURL}api/token/refresh/`, {
    //   refresh: authTokens.refresh,
    // });

    // localStorage.setItem("authTokens", JSON.stringify(response.data));

    // setAuthTokens(response.data);
    // setUser(jwt_decode(response.data.access));

    req.headers.Authorization = `Bearer ${authTokens.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
