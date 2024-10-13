import React, { useState } from 'react';
import { Layout, Menu, ConfigProvider } from 'antd';
import { ClockCircleOutlined, BarChartOutlined, DollarOutlined, CalculatorOutlined, CalendarOutlined } from '@ant-design/icons';
import TradingSessionsDisplay from './components/TradingSessionsDisplay';
import VolatilityGraph from './components/VolatilityGraph';
import TimeConverter from './components/TimeConverter';
import EconomicCalendar from './components/EconomicCalendar';
import PipValueCalculator from './components/PipValueCalculator';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState('sessions');

  const renderTool = () => {
    switch (selectedTool) {
      case 'sessions':
        return <TradingSessionsDisplay />;
      case 'volatility':
        return <VolatilityGraph />;
      case 'converter':
        return <TimeConverter />;
      case 'calendar':
        return <EconomicCalendar />;
      case 'pip':
        return <PipValueCalculator />;
      default:
        return <div>Tool not implemented yet</div>;
    }
  };

  const menuItems = [
    { key: 'sessions', icon: <ClockCircleOutlined />, label: 'Trading Sessions' },
    { key: 'volatility', icon: <BarChartOutlined />, label: 'Market Volatility' },
    { key: 'converter', icon: <DollarOutlined />, label: 'Time Converter' },
    { key: 'calendar', icon: <CalendarOutlined />, label: 'Economic Calendar' },
    { key: 'pip', icon: <CalculatorOutlined />, label: 'Pip Value Calculator' },
    { key: 'correlation', icon: <CalculatorOutlined />, label: 'Currency Correlation' },
    { key: 'position', icon: <CalculatorOutlined />, label: 'Position Size Calculator' },
    { key: 'gainloss', icon: <CalculatorOutlined />, label: 'Gain & Loss Calculator' },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemBg: '#1f2937',
            itemSelectedBg: '#7c3aed',
            itemHoverBg: '#6d28d9',
          },
        },
      }}
    >
      <Layout className="min-h-screen bg-gray-900">
        <Sider theme="dark" className="bg-gray-800">
          <div className="text-2xl font-bold text-white p-4 mb-4">Trade Blueprint</div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedTool]}
            onClick={({ key }) => setSelectedTool(key)}
            items={menuItems}
            className="bg-gray-800"
          />
        </Sider>
        <Layout>
          <Header className="bg-gray-800 p-4">
            <h1 className="text-2xl font-bold text-white">{selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)}</h1>
          </Header>
          <Content className="m-6 p-6 bg-gray-800 rounded-lg">
            {renderTool()}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;