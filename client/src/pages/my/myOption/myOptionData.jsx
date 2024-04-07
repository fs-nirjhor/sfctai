import { MdOutlineVerifiedUser, MdVerifiedUser } from "react-icons/md";
import { GiSwapBag } from "react-icons/gi";
import { PiExcludeSquareDuotone } from "react-icons/pi";
import { GoPeople } from "react-icons/go";
import { GoGear } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { BsEnvelopePaperHeart } from "react-icons/bs";

const MyOptionData = () => {
  const iconStyle = "text-myPrimary inline-block me-3 text-2xl";

  const clientOptions = [
    /* {
      name: "Real-name authentication",
      to: "authentication",
      icon: <MdVerifiedUser className={iconStyle} />,
    }, */
    {
      name: "Invitation letter",
      to: "invitation",
      icon: <BsEnvelopePaperHeart className={iconStyle} />,
    },
    {
      name: "TXID submit",
      to: "txid-submit",
      icon: <MdOutlineVerifiedUser className={iconStyle} />,
    },
    {
      name: "Trade history",
      to: "trade-history",
      icon: (
        <img
          src="/images/trade-icon.png"
          alt="trade"
          className="inline w-7 me-3"
        />
      ),
    },
    {
      name: "Fund history",
      to: "fund-history",
      icon: <GiSwapBag className={iconStyle} id="fundHistory" />,
    },
    {
      name: "Bind ID",
      to: "bind-id",
      icon: <PiExcludeSquareDuotone className={iconStyle} />,
    },
    { name: "Team", to: "team", icon: <GoPeople className={iconStyle} /> },
    { name: "Set", to: "set", icon: <GoGear className={iconStyle} /> },
  ];

  // admin option
  const adminOptions = [
    {
      name: "Clients",
      to: "client-list",
      icon: <FiUsers className={iconStyle} />,
    },
    /* {
      name: "Real-name authentication",
      to: "authentication",
      icon: <MdVerifiedUser className={iconStyle} />,
    }, */
    {
      name: "Invitation letter",
      to: "invitation",
      icon: <BsEnvelopePaperHeart className={iconStyle} />,
    },
    {
      name: "Trade history",
      to: "trade-history",
      icon: (
        <img
          src="/images/trade-icon.png"
          alt="trade"
          className="inline w-7 me-3"
        />
      ),
    },
    {
      name: "Fund history",
      to: "fund-history",
      icon: <GiSwapBag className={iconStyle} id="fundHistory" />,
    },
    { name: "Team", to: "team", icon: <GoPeople className={iconStyle} /> },
    { name: "Set", to: "set", icon: <GoGear className={iconStyle} /> },
  ];

  return { clientOptions, adminOptions };
};

export default MyOptionData;
