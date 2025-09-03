import React from 'react'
import OrderwatchList from '../../components/ordercomponents/OrderwatchList.jsx';

const data = [
  { id: "AAPL", symbol: "AAPL", name: "Apple Inc.", price: 230.42, changePct: 0.013 },
  { id: "MSFT", symbol: "MSFT", name: "Microsoft Corp.", price: 419.12, changePct: -0.004 },
  { id: "NVDA", symbol: "NVDA", name: "NVIDIA Corp.", price: 117.55, changePct: 0.027 },
];

const OrderPage = () => {
  return (
    <div>
      <OrderwatchList items={data}/>
    </div>
  )
}

export default OrderPage
