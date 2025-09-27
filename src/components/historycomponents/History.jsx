import React, { useState } from 'react';
import './History.css';

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState('orders');

  // Sample data for each table
  const ordersData = [
    { id: 1, orderNumber: 'ORD001', product: 'iPhone 14', quantity: 1, price: '$999', status: 'Completed' },
    { id: 2, orderNumber: 'ORD002', product: 'MacBook Pro', quantity: 1, price: '$2499', status: 'Processing' },
    { id: 3, orderNumber: 'ORD003', product: 'AirPods', quantity: 2, price: '$358', status: 'Shipped' },
    { id: 4, orderNumber: 'ORD004', product: 'iPad Air', quantity: 1, price: '$599', status: 'Pending' },
  ];

  const holdingsData = [
    { id: 1, stock: 'AAPL', shares: 50, purchasePrice: '$150.00', currentPrice: '$175.20', gain: '+$1,260' },
    { id: 2, stock: 'GOOGL', shares: 25, purchasePrice: '$2800.00', currentPrice: '$2650.00', gain: '-$3,750' },
    { id: 3, stock: 'TSLA', shares: 30, purchasePrice: '$200.00', currentPrice: '$245.80', gain: '+$1,374' },
    { id: 4, stock: 'MSFT', shares: 40, purchasePrice: '$300.00', currentPrice: '$335.50', gain: '+$1,420' },
  ];

  const alertsData = [
    { id: 1, type: 'Price Alert', message: 'AAPL reached $175', timestamp: '2 hours ago', status: 'Active' },
    { id: 2, type: 'Order Alert', message: 'Order ORD002 shipped', timestamp: '5 hours ago', status: 'Read' },
    { id: 3, type: 'Market Alert', message: 'Tech stocks up 3%', timestamp: '1 day ago', status: 'Active' },
    { id: 4, type: 'Portfolio Alert', message: 'Portfolio up 5% this week', timestamp: '3 days ago', status: 'Read' },
  ];

  const renderTable = (data, headers) => (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {Object.entries(row).map(([key, value], index) => {
                if (key !== 'id') {
                  return <td key={index}>{value}</td>;
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const getTableContent = () => {
    switch (activeTab) {
      case 'orders':
        return renderTable(ordersData, ['Order #', 'Product', 'Quantity', 'Price', 'Status']);
      case 'holdings':
        return renderTable(holdingsData, ['Stock', 'Shares', 'Purchase Price', 'Current Price', 'Gain/Loss']);
      case 'alerts':
        return renderTable(alertsData, ['Type', 'Message', 'Time', 'Status']);
      default:
        return null;
    }
  };

  return (
    <div className="tabs-container">
      {/* Tab Navigation - Now touching navbar */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`tab-button ${activeTab === 'holdings' ? 'active' : ''}`}
          onClick={() => setActiveTab('holdings')}
        >
          Holdings
        </button>
        <button
          className={`tab-button ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          Alerts
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {getTableContent()}
      </div>
    </div>
  );
};

export default TabsComponent;
