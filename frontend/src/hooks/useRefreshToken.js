import axios from "axios";
import useAuth from "./useAuth";
import config from "../config.js";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get(`${config.backUrl}/refresh`, {
        withCredentials: true,
      });

      setAuth((prev) => ({
        ...prev,
        role: response.data.role,
        accessToken: response.data.accessToken,
      }));
      return response.data.accessToken;
    } catch (error) {
      // Check if the error response is 403
      if (error.response && error.response.status === 403) {
        setAuth({});
        localStorage.removeItem("auth");
        window.location.href = "/login";
      } else {
        // Handle other errors if necessary
        console.error("An error occurred:", error);
      }
    }
  };

  return refresh;
};

export default useRefreshToken;
