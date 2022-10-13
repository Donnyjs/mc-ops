import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Table,
  Drawer,
  Form,
  Input,
  Row,
  Space,
} from "antd";
import React, { useState, useRef, useEffect } from "react";
import { addStrategy, queryStrategyList, cancelStrategy } from "../services/strategy.js";

export default function PriceControl() {
  const [open, setOpen] = useState(false);
  const [strategyList, setStrategyList] = useState([])
  const bugPriceRef = useRef();
  const sellPriceRef = useRef();
  const totalAmountRef = useRef();
  const singleAmountRef = useRef();
  const execTimeRef = useRef();
  const frequencyRef = useRef();
  const slippageToleranceRef = useRef();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onDelete = (key) => {
    console.log(key)
      cancelStrategy({uuid:key})
      queryStrategyList().then((data)=>{
        console.log(data)
        setStrategyList(data)
      })
  };

  useEffect(()=>{
    queryStrategyList().then((data)=>{
      console.log(data)
      setStrategyList(data)
    })
  }, [])


  const onSubmit = () => {
    setOpen(false);
    const buyPrice = bugPriceRef.current.input.value
    const sellPrice = sellPriceRef.current.input.value
    const totalAmount = totalAmountRef.current.input.value
    const singleAmount = singleAmountRef.current.input.value
    const execTime = execTimeRef.current.input.value
    const frequency = frequencyRef.current.input.value
    const slippageTolerance = slippageToleranceRef.current.input.value

    addStrategy({
      buy_price: buyPrice,
      sell_price: sellPrice,
      total_amount: totalAmount,
      single_amount: singleAmount,
      exec_time: parseInt(execTime),
      frequency: parseInt(frequency),
      slippage_tolerance: parseInt(slippageTolerance),
    }).then((data)=>{
      console.log(data)
    }).catch(function(error) {
      console.log(error);
    });
    queryStrategyList().then((data)=>{
      console.log(data)
      setStrategyList(data)
    })
  };

  const columns = [
    {
      title: '',
      dataIndex: 'uuid',
      key: 'uuid',
      render: (text) => <></>,
    },
    {
      title: '最低价',
      dataIndex: 'buyPrice',
      key: 'buyPrice',
      render: (text) => <>{text}u</>,
    },
    {
      title: '最高价',
      dataIndex: 'sellPrice',
      key: 'sellPrice',
      render: (text) => <>{text}u</>,
    },
    {
      title: '总投入资金',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text) => <>{text}u</>,
    },
    {
      title: '单次投入资金',
      key: 'singleAmount',
      dataIndex: 'singleAmount',
      render: (text) => <>{text}u</>,
    },
    {
      title: '执行时间',
      dataIndex: 'execTime',
      key: 'execTime',
      render: (text) => <>{text}min</>,
    },
    {
      title: '执行间隔',
      key: 'frequency',
      dataIndex: 'frequency',
      render: (text) => <>{text}s</>,
    },
    {
      title: '滑点',
      key: 'slippageTolerance',
      dataIndex: 'slippageTolerance',
      render: (text) => <>{text} /1000</>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button  onClick={()=>onDelete(record.uuid)}>关闭</Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New strategy
      </Button>
      <Table columns={columns} dataSource={strategyList} />
      <Drawer
        title="Create a new strategy"
        width={500}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form  layout="vertical" hideRequiredMark>
        <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="bugPrice"
                label="bugPrice"
                rules={[
                  {
                    required: true,
                    message: "Please enter bug price",
                  },
                ]}
              >
                <Input ref={bugPriceRef} placeholder="bug price(Unit: USDC)" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sellPrice"
                label="sellPrice"
                rules={[
                  {
                    required: true,
                    message: "Please enter sell price",
                  },
                ]}
              >
                <Input ref={sellPriceRef} placeholder="sell price(Unit: USDC)" />
              </Form.Item>
            </Col>
          </Row>


          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="totalAmount"
                label="totalAmount"
                rules={[
                  {
                    required: true,
                    message: "Please enter total amount",
                  },
                ]}
              >
                <Input ref={totalAmountRef} placeholder="total amount(Unit: USDC)" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="singleAmount"
                label="singleAmount"
                rules={[
                  {
                    required: true,
                    message: "Please enter single amount",
                  },
                ]}
              >
                <Input ref={singleAmountRef} placeholder="single amount(Unit: USDC)" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="execTime"
                label="execTime"
                rules={[
                  {
                    required: true,
                    message: "Please enter exec time",
                  },
                ]}
              >
                <Input ref={execTimeRef} placeholder="exec time(Unit: minute)" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="frequency"
                label="frequency"
                rules={[
                  {
                    required: true,
                    message: "Please enter frequency",
                  },
                ]}
              >
                <Input ref={frequencyRef} placeholder="frequency(Unit: second)" />
              </Form.Item>
            </Col>
          </Row>


          <Row gutter={20}>
            <Col span={13}>
              <Form.Item
                name="slippageTolerance"
                label="slippageTolerance"
                rules={[
                  {
                    required: true,
                    message: "please enter slippage tolerance",
                  },
                ]}
              >
                <Input ref={slippageToleranceRef} placeholder="slippage tolerance(Unit: kilobit)" />
              </Form.Item>
            </Col>
          </Row>
         
        </Form>
      </Drawer>
    </div>
  );
}
