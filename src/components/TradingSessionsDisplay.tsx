import React, { useState, useEffect } from 'react';
import { Select, Tooltip } from 'antd';

const { Option } = Select;

interface Session {
  name: string;
  color: string;
  startHour: number;
  endHour: number;
}

const TradingSessionsDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sessions: Session[] = [
    { name: 'Sydney', color: 'bg-blue-500', startHour: 22, endHour: 7 },
    { name: 'Tokyo', color: 'bg-pink-500', startHour: 0, endHour: 9 },
    { name: 'London', color: 'bg-green-500', startHour: 8, endHour: 17 },
    { name: 'New York', color: 'bg-purple-500', startHour: 13, endHour: 22 },
  ];

  const timeZones = [
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];

  const convertTime = (hour: number): string => {
    const date = new Date();
    date.setUTCHours(hour, 0, 0, 0);
    return date.toLocaleTimeString('en-US', {
      timeZone: selectedTimeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const isSessionActive = (startHour: number, endHour: number): boolean => {
    const hour = currentTime.getUTCHours();
    if (startHour < endHour) {
      return hour >= startHour && hour < endHour;
    } else {
      return hour >= startHour || hour < endHour;
    }
  };

  const getSessionWidth = (startHour: number, endHour: number): string => {
    const width = ((endHour - startHour + 24) % 24) / 24 * 100;
    return `${width}%`;
  };

  const getSessionMarginLeft = (startHour: number): string => {
    return `${(startHour / 24) * 100}%`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Forex Trading Sessions</h2>
        <Select
          value={selectedTimeZone}
          onChange={setSelectedTimeZone}
          className="w-48"
        >
          {timeZones.map((tz) => (
            <Option key={tz} value={tz}>
              {tz.replace('_', ' ')}
            </Option>
          ))}
        </Select>
      </div>
      <div className="relative h-24 bg-gray-700 rounded-lg overflow-hidden">
        {sessions.map((session) => (
          <Tooltip
            key={session.name}
            title={`${session.name}: ${convertTime(session.startHour)} - ${convertTime(session.endHour)}`}
            placement="top"
          >
            <div
              className={`absolute h-full ${session.color} ${
                isSessionActive(session.startHour, session.endHour)
                  ? 'animate-pulse'
                  : ''
              }`}
              style={{
                width: getSessionWidth(session.startHour, session.endHour),
                left: getSessionMarginLeft(session.startHour),
              }}
            >
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                {session.name}
              </span>
            </div>
          </Tooltip>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        {[0, 6, 12, 18, 23].map((hour) => (
          <span key={hour}>{convertTime(hour)}</span>
        ))}
      </div>
      <div className="text-center text-gray-400">
        Current time: {currentTime.toLocaleTimeString('en-US', { timeZone: selectedTimeZone })}
      </div>
    </div>
  );
};

export default TradingSessionsDisplay;