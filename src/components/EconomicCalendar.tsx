import React from 'react';

const EconomicCalendar: React.FC = () => {
  return (
    <div className="h-[600px]">
      <iframe 
        src="https://widget.myfxbook.com/widget/calendar.html?lang=en&impacts=0,1,2,3&symbols=" 
        style={{border: 0, width: '100%', height: '100%'}}
        title="Economic Calendar"
      ></iframe>
    </div>
  );
};

export default EconomicCalendar;