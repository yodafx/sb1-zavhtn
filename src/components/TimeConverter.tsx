import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const TimeConverter: React.FC = () => {
  const [localTime, setLocalTime] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState('Sydney');

  useEffect(() => {
    const timer = setInterval(() => setLocalTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cities = [
    { name: 'Sydney', offset: 10 },
    { name: 'Tokyo', offset: 9 },
    { name: 'London', offset: 0 },
    { name: 'New York', offset: -5 },
  ];

  const getTimeInCity = (cityOffset: number) => {
    const date = new Date(localTime.getTime() + cityOffset * 3600000 + localTime.getTimezoneOffset() * 60000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Select
        value={selectedCity}
        onChange={(value) => setSelectedCity(value)}
        className="w-48"
      >
        {cities.map((city) => (
          <Option key={city.name} value={city.name}>{city.name}</Option>
        ))}
      </Select>
      <div className="text-4xl font-bold text-white">
        {getTimeInCity(cities.find(city => city.name === selectedCity)?.offset || 0)}
      </div>
    </div>
  );
};

export default TimeConverter;