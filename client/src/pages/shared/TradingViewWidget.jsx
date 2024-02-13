import { useEffect, useRef } from 'react';

const TradingViewWidget = ({coin}) => {
  const container = useRef();
  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      const symble = `CRYPTOCAP:${coin}`;
  
      script.innerHTML = `
        {
          "width": "100%",
          "height": "100%",
          "symbol": "${symble}",
          "interval": "D",
          "timezone": "Asia/Riyadh",
          "theme": "light",
          "style": "8",
          "locale": "en",
          "enable_publishing": false,
          "hide_top_toolbar": true,
          "hide_legend": true,
          "save_image": false,
          "calendar": false,
          "hide_volume": true,
          "support_host": "https://www.tradingview.com"
        }`;
        
      container.current.appendChild(script);
    },
    [coin]
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default TradingViewWidget;
