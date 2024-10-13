import React, { useState } from 'react';
import { Select, Input, Button } from 'antd';

const { Option } = Select;

const PipValueCalculator: React.FC = () => {
  const [currencyPair, setCurrencyPair] = useState('EUR/USD');
  const [askPrice, setAskPrice] = useState('');
  const [positionSize, setPositionSize] = useState('');
  const [accountCurrency, setAccountCurrency] = useState('USD');
  const [pipValue, setPipValue] = useState(0);

  const currencyPairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD', 'NZD/USD', 'EUR/GBP', 'EUR/JPY'];
  const accountCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'NZD'];

  const calculatePipValue = () => {
    const [base, quote] = currencyPair.split('/');
    const price = parseFloat(askPrice);
    const size = parseFloat(positionSize);

    if (isNaN(price) || isNaN(size)) {
      alert('Please enter valid numbers for Ask Price and Position Size');
      return;
    }

    let pipValue;
    if (accountCurrency === quote) {
      pipValue = size * 0.0001;
    } else if (accountCurrency === base) {
      pipValue = (size * 0.0001) / price;
    } else {
      // For simplicity, we're assuming USD as the account currency for cross pairs
      // In a real-world scenario, you'd need to fetch the appropriate exchange rates
      pipValue = (size * 0.0001) / price;
    }

    setPipValue(parseFloat(pipValue.toFixed(4)));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Pip Value Calculator</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Currency Pair</label>
          <Select
            value={currencyPair}
            onChange={setCurrencyPair}
            className="w-full"
          >
            {currencyPairs.map(pair => (
              <Option key={pair} value={pair}>{pair}</Option>
            ))}
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Ask Price</label>
          <Input
            value={askPrice}
            onChange={(e) => setAskPrice(e.target.value)}
            placeholder="e.g., 1.09215"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Position Size (units)</label>
          <Input
            value={positionSize}
            onChange={(e) => setPositionSize(e.target.value)}
            placeholder="e.g., 10000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Account Currency</label>
          <Select
            value={accountCurrency}
            onChange={setAccountCurrency}
            className="w-full"
          >
            {accountCurrencies.map(currency => (
              <Option key={currency} value={currency}>{currency}</Option>
            ))}
          </Select>
        </div>
      </div>
      <Button type="primary" onClick={calculatePipValue} className="w-full">
        Calculate
      </Button>
      {pipValue > 0 && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold">Result</h3>
          <p className="text-lg">Pip Value: {pipValue} {accountCurrency}</p>
        </div>
      )}
    </div>
  );
};

export default PipValueCalculator;