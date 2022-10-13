import request from "./config";
import { notification } from 'antd';


export async function addStrategy(param) {
  console.log(param);
  return request.post("trade-api/v1/trade/addStrategy", {
    data: JSON.stringify(param),
  })
    .then(function (response) {
      console.log(response);
      if (response.code === 200) {
        notification.open({
          message: '',
          description:
            '添加策略成功',
          style: {
             width: 150,
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

export async function cancelStrategy(param) {
  console.log(param);
  return request.post("trade-api/v1/trade/cancelStrategy", {
    data: JSON.stringify(param),
  }).then(function (response) {
      console.log(response);
      if (response.code === 200) {
        notification.open({
          message: '',
          description:
            '删除策略成功',
          style: {
             width: 150,
             height: 60,
          },
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function queryStrategyList() {
  return request
    .get("trade-api/v1/info/queryStrategy")
    .then(function (response) {
      console.log(response);
      var strategyList = [];
      response.data.forEach((item,index) => {
        strategyList.push({
          uuid: item.uuid,
          buyPrice: item.buy_price,
          sellPrice: item.sell_price,
          totalAmount: item.total_amount,
          singleAmount: item.single_amount,
          execTime: item.exec_time,
          frequency: item.frequency,
          slippageTolerance: item.slippage_tolerance,
        });
      });
      return strategyList;
    })
    .catch(function (error) {
      console.log(error);
    });
}
