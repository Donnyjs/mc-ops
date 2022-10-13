import request from "./config";
import { notification } from 'antd';

export async function diversifyFunds(param) {
  console.log(param);
  return request.post("trade-api/v1/fund/diversifyFunds", {
    data: JSON.stringify(param),
  })
    .then(function (response) {
      console.log(response);
      if (response.code === 200) {
        notification.open({
          message: '',
          description:
            '请求成功',
          style: {
             width: 150,
             height: 60,
          },
        });
      } else {
        notification.open({
            message: '',
            description:
              '请求失败,请重试',
            style: {
               width: 300,
               height: 60,
            },
          });
      }
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function recoveryFunds(param) {
  console.log(param);
  return request.post("trade-api/v1/fund/recoveryFunds", {
    data: JSON.stringify(param),
  }).then(function (response) {
      console.log(response);
      if (response.code === 200) {
        notification.open({
          message: '',
          description:
            '请求成功',
          style: {
             width: 150,
             height: 60,
          },
        });
      } else {
        notification.open({
            message: '',
            description:
              '请求失败,请重试',
            style: {
               width: 300,
               height: 60,
            },
          });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
