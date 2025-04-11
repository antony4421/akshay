import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import './css/Dashboard.css';
import { Link } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
import Overview from './components/Overview'; // ✅ Import Overview component

function Dashboard() {
  const [barChartData, setBarChartData] = useState({ categories: [], counts: [] });
  const [latestPurchases, setLatestPurchases] = useState([]);

  useEffect(() => {
    fetchBarChartData();
    fetchLatestPurchases();
  }, []);

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get('/api/products/category-count');
      const categories = response.data.map(item => item.categoryName);
      const counts = response.data.map(item => item.count);
      setBarChartData({ categories, counts });
    } catch (error) {
      console.error('Error fetching category chart data', error);
    }
  };

  const fetchLatestPurchases = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/purchases');
      const formattedPurchases = response.data.map(purchase => ({
        employeeName: purchase.employeeName,
        productName: purchase.productName,
        quantity: purchase.quantity,
        totalAmount: purchase.totalAmount,
        status: purchase.status,
        purchaseDate: new Date(purchase.purchaseDate).toLocaleDateString()
      }));
      setLatestPurchases(formattedPurchases);
    } catch (error) {
      console.error('Error fetching latest purchases:', error);
    }
  };

  const barChartOptions = {
    series: [{ data: barChartData.counts, name: 'Products' }],
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    colors: ['#2962ff', '#d50000', '#2e7d32', '#ff6d00', '#583cb3'],
    plotOptions: {
      bar: { distributed: true, borderRadius: 4, horizontal: false, columnWidth: '40%' },
    },
    dataLabels: { enabled: false },
    fill: { opacity: 1 },
    grid: {
      borderColor: '#55596e',
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: true } },
    },
    legend: {
      labels: { colors: '#f5f7ff' },
      show: true,
      position: 'top',
    },
    stroke: { colors: ['transparent'], show: true, width: 2 },
    tooltip: { shared: true, intersect: false, theme: 'dark' },
    xaxis: {
      categories: barChartData.categories,
      title: { style: { color: '#f5f7ff' } },
      axisBorder: { show: true, color: '#55596e' },
      axisTicks: { show: true, color: '#55596e' },
      labels: { style: { colors: '#f5f7ff' } },
    },
    yaxis: {
      title: { text: 'Count', style: { color: '#f5f7ff' } },
      axisBorder: { show: true, color: '#55596e' },
      axisTicks: { show: true, color: '#55596e' },
      labels: { style: { colors: '#f5f7ff' } },
    },
  };

  const pieChartOptions = {
    series: [44, 55, 13, 43, 22], // Sample sales data
    labels: ['Electronics', 'Clothing', 'Books', 'Home Decor', 'Other'],
    chart: {
      type: 'pie',
      background: 'transparent',
    },
    colors: ['#00ab57', '#d50000', '#ff9800', '#3f51b5', '#009688'],
    legend: {
      position: 'bottom',
      labels: {
        colors: '#f5f7ff',
      },
    },
    dataLabels: {
      style: {
        colors: ['#fff'],
      },
    },
    tooltip: {
      theme: 'dark',
    },
  };
  
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="user-info">Welcome, Rebel!</div>
        </header>

        <Overview /> {/* ✅ Added Overview section */}

        <div className="chart-section vertical">
          <div className="chart-box">
            <h3 className="chart-title">Top Product Categories</h3>
            <ReactApexChart
              options={barChartOptions}
              series={barChartOptions.series}
              type="bar"
              height={350}
            />
          </div>
          
<div className="chart-box">
  <h3 className="chart-title">Sales Distribution</h3>
  <div className="chart-container" style={{ width: '100%', height: '350px' }}>
    <ReactApexChart
      options={pieChartOptions}
      series={pieChartOptions.series}
      type="pie"
      width="100%"
      height="100%"
    />
  </div>
</div>
        </div>

        <div className="purchase-history">
          <h3 className="section-title">Latest Purchase History</h3>
          <table className="purchase-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {latestPurchases.map((purchase, index) => (
                <tr key={index}>
                  <td>{purchase.employeeName}</td>
                  <td>{purchase.productName}</td>
                  <td>{purchase.quantity}</td>
                  <td>${purchase.totalAmount}</td>
                  <td className={`status ${purchase.status.toLowerCase()}`}>{purchase.status}</td>
                  <td>{purchase.purchaseDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
