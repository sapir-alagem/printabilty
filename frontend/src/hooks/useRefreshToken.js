import axios from "axios";
import useAuth from "./useAuth";
import config from "../config.js";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(`${config.backUrl}/refresh`, {
      withCredentials: true,
    });
    setAuth((prev) => ({
      ...prev,
      role: response.data.role,
      accessToken: response.data.accessToken,
    }));
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
