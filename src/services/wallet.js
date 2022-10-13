import request from "./config";

export async function  queryWalletBalance() {
    return request
    .get("trade-api/v1/info/walletBalance")
    .then(function(response) {
      const data = response.data
      data.map((item,index)=>{
        item.key=index+1
        return item
      })
      return data;
    })
    .catch(function(error) {
      console.log(error);
    });
} 
