import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
    <nav className="btm-nav max-w-4xl mx-auto bg-myBg font-mono text-sm" id="footer-nav">
      <NavLink to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-myPrimary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="btm-nav-label text-myPrimary first-letter:text-lg">HOME</span>
      </NavLink>
      <NavLink to="trade">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-myPrimary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <p className="btm-nav-label text-myPrimary first-letter:text-lg whitespace-nowrap">
        <span >COPY </span> 
        <span className="text-xl">T</span>RADE
        </p>
      </NavLink>
      <NavLink to="about">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-myPrimary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="btm-nav-label text-myPrimary first-letter:text-lg whitespace-nowrap">ABOUT </span> 
      </NavLink>
      <NavLink to="my">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-myPrimary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
          ></path>
        </svg>
        <span className="btm-nav-label text-myPrimary first-letter:text-lg">MY</span>
      </NavLink>
    </nav>
    </footer>
  );
};
export default Footer;
