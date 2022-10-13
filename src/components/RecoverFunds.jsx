import { Select, Popconfirm, Button } from 'antd';
import React, { useState } from 'react';
import {usdcContractAddress, sksContractAddress, bnbContractAddress} from '../constants/contract'
import {recoveryFunds} from '../services/fund'

const { Option } = Select;


export default function Recoverfunds() {
  const [contractAddr,setContractAddr] = useState("")
  const [open, setOpen] = useState(false);

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
    recoveryFunds({contract_address: contractAddr})
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
    <Popconfirm
      title="确定要归集资金吗？"
      open={open}
      onConfirm={handleOk}
      onCancel={handleCancel}
    >
      <Button type="primary" onClick={showPopconfirm}>
        归集资金
      </Button>
    </Popconfirm>
    </div>
  )
}