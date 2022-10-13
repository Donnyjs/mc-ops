import { extend } from "umi-request";


const request = extend({
    prefix: "http://localhost:3001/",
    errorHandler: function(error) {
      console.log(error)
    },
});

request.interceptors.request.use((url, options) => {
  let token = localStorage.getItem('token');
  if (null === token) {
      token = '';
  }
  const authHeader = { token: token };
  return {
    url: url,
    options: { ...options, interceptors: true, headers: authHeader },
  };
});

request.interceptors.response.use(async (response, options) => {
    const data = await response.clone().json()
    console.log(data)
    if (data.code === 401) { 
      localStorage.removeItem("token");
      window.history.replaceState(null, null,"/login")
      window.location.reload()
    }
    return data;
});

export default request