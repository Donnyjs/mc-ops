import request  from "./config";

export async function queryTokenPrice() {
    return request
    .get("query-api/v1/tokenPrice")
    .then(function(response) {  
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
}