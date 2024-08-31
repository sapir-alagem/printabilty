const isProd = process.env.NODE_ENV === 'production';

const config = {
  appUrl: isProd
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL,

  backUrl: isProd
    ? "https://printabilty-backend.up.railway.app"
    : "http://localhost:5000",
};

export default config;
