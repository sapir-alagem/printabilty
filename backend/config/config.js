const isProd = process.env.NODE_ENV === 'production';

const config = {
  appUrl: isProd
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL,

  backUrl: isProd
    ? process.env.NODEJS_APP_API_URL_PROD
    : process.env.NODEJS_APP_API_URL,
};

module.exports = config;