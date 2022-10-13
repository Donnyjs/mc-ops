import { Space, Table, Button, Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState, useEffect } from "react";
import Highlighter from 'react-highlight-words';
import { queryWalletBalance } from "../services/wallet";

export default function WalletBlance() {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [walletBalanceList, setWalletBalanceList] = useState([])

  useEffect(()=>{
    queryWalletBalance().then((data)=>{
      console.log(data)
      setWalletBalanceList(data)
    })
  }, [])

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "钱包地址",
      dataIndex: "walletAddr",
      key: "walletAddr",
      render: (text) => (
        <a href={"https://testnet.bscscan.com/address/" + text}>{text}</a>
      ),
      ...getColumnSearchProps('walletAddr'),
    },
    {
      title: "BNB余额",
      dataIndex: "bnbBalance",
      key: "bnbBalance",
      render: (text) => {
        let color = "black";
        const textSlice = text.split(" ");
        const balance = parseFloat(textSlice[0]);
        if (balance < 0.05) {
          color = "red";
        }
        return <span style={{ color: color }}>{text+ ' '}BNB</span>;
      },
      sorter: (a, b) => {
        const aSlice = a.bnbBalance.split(" ");
        const abalance = parseFloat(aSlice[0]);
        const bSlice = b.bnbBalance.split(" ");
        const bbalance = parseFloat(bSlice[0]);
        console.log(abalance,bbalance)
        return abalance < bbalance
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "USDC余额",
      dataIndex: "usdcBalance",
      key: "usdcBalance",
      render: (text) => {
        let color = "black";
        const textSlice = text.split(" ");
        const balance = parseFloat(textSlice[0]);
        if (balance < 100) {
          color = "red";
        }
        return <span style={{ color: color }}>{text+' '}USDC</span>;
      },
      sorter: (a, b) => {
        const aSlice = a.usdcBalance.split(" ");
        const abalance = parseFloat(aSlice[0]);
        const bSlice = b.usdcBalance.split(" ");
        const bbalance = parseFloat(bSlice[0]);
        console.log(abalance,bbalance)
        return abalance < bbalance
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "SKS余额",
      dataIndex: "sksBalance",
      key: "sksBalance",
      render: (text) => {
        let color = "black";
        const textSlice = text.split(" ");
        const balance = parseFloat(textSlice[0]);
        if (balance < 1000) {
          color = "red";
        }
        return <span style={{ color: color }}>{text+ ' '}SKS</span>;
      },
      sorter: (a, b) => {
        const aSlice = a.sksBalance.split(" ");
        const abalance = parseFloat(aSlice[0]);
        const bSlice = b.sksBalance.split(" ");
        const bbalance = parseFloat(bSlice[0]);
        console.log(abalance,bbalance)
        return abalance < bbalance
      },
    },
    {
      title: "",
      dataIndex: "reservation",
      key: "reservation",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={walletBalanceList}
        pagination={{
          pageSize: 10,
        }}
      />
    </div>
  );
}
