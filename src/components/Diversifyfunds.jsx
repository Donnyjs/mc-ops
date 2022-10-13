import { Select, Input, Popconfirm, Button } from 'antd';
import React, { useState, useRef } from 'react';
import {usdcContractAddress, sksContractAddress, bnbContractAddress} from '../constants/contract'
import {diversifyFunds} from '../services/fund'

const { Option } = Select;


export default function Diversifyfunds() {
  const [contractAddr,setContractAddr] = useState("")
  const [open, setOpen] = useState(false);
  const minBalanceRef = useRef()

  const handleTypeChange = (value) => {
    if (value === "BNB") {
      setContractAddr(bnbContractAddress)
    } else if (value === "SKS") {
      setContractAddr(sksContractAddress)
    } else if (value === "USDC") {
      setContractAddr(usdcContractAddress)
    }
  };

  
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
    console.log(contractAddr)
    console.log(minBalanceRef.current.input.value)
    diversifyFunds({contract_address: contractAddr, min_balance: minBalanceRef.current.input.value})
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Select
      defaultValue="BNB"
      style={{
        width: 120,
      }}
      onChange={handleTypeChange}
    >
      <Option value="BNB"></Option>
      <Option value="USDC"></Option>
      <Option value="SKS"></Option>
    </Select>
    <Input style={{width:'200px'}} ref={minBalanceRef} placeholder="每个账户最少剩余多少钱" />
    <Popconfirm
      title="确定要分散资金吗？"
      open={open}
      onConfirm={handleOk}
      onCancel={handleCancel}
    >
      <Button type="primary" onClick={showPopconfirm}>
        分散资金
      </Button>
    </Popconfirm>
    </div>
  )
}