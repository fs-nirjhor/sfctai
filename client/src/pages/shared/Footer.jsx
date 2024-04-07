import { NavLink } from "react-router-dom";
import { HiOutlineClipboardDocumentList, HiOutlineHome } from "react-icons/hi2";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { GoPerson } from "react-icons/go";

const Footer = () => {
  const iconStyle = "h-7 w-10";
  const textStyle = "btm-nav-label first-letter:text-lg";
  return (
    <footer>
      <nav
        className="btm-nav max-w-4xl mx-auto bg-myBg font-mono text-sm"
        id="footer-nav"
      >
        <NavLink to="/" className="text-white">
          <HiOutlineHome className={iconStyle} />
          <span className={textStyle}>HOME</span>
        </NavLink>
        <NavLink to="trade" className="text-white">
          <TbDeviceDesktopAnalytics className={iconStyle} />
          <p className={textStyle}>
            <span>COPY </span>
            <span className="text-xl">T</span>RADE
          </p>
        </NavLink>
        <NavLink to="about" className="text-white">
          <HiOutlineClipboardDocumentList className={iconStyle} />
          <span className={textStyle}>ABOUT </span>
        </NavLink>
        <NavLink to="my" className="text-white">
          <GoPerson className={iconStyle} />
          <span className={textStyle}>MY</span>
        </NavLink>
      </nav>
    </footer>
  );
};
export default Footer;
