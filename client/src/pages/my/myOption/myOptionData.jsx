import {
  MdOutlineCreditScore,
  MdOutlineVerifiedUser,
  MdVerifiedUser,
} from "react-icons/md";
import { GiSwapBag } from "react-icons/gi";
import { PiExcludeSquareDuotone } from "react-icons/pi";
import { GoPeople } from "react-icons/go";
import { GoGear } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { BsEnvelopePaperHeart } from "react-icons/bs";
import { SlHandbag } from "react-icons/sl";

const MyOptionData = ({ user }) => {
  const isApprovedNid = user?.authentication?.status === "approved";
  // styles
  const authenticationStyle = `${
    isApprovedNid ? "text-green-500" : "text-myPrimary"
  } inline-block me-3 text-2xl`;
  const iconStyle = "text-myPrimary inline-block me-3 text-2xl";

  // client option
  const clientOptions = [
    {
      name: "Real-name authentication",
      to: "authentication",
      icon: isApprovedNid ? (
        <MdVerifiedUser className={authenticationStyle} />
      ) : (
        <MdOutlineVerifiedUser className={authenticationStyle} />
      ),
    },
    {
      name: "Invitation letter",
      to: "invitation",
      icon: <BsEnvelopePaperHeart className={iconStyle} />,
    },
    {
      name: "TXID submit",
      to: "txid-submit",
      icon: <MdOutlineCreditScore className={iconStyle} />,
    },
    {
      name: "Order history",
      to: "order-history",
      icon: <SlHandbag className={iconStyle} />,
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
    {
      name: "Real-name authentication",
      to: "authentication",
      icon: isApprovedNid ? (
        <MdVerifiedUser className={authenticationStyle} />
      ) : (
        <MdOutlineVerifiedUser className={authenticationStyle} />
      ),
    },
    {
      name: "Invitation letter",
      to: "invitation",
      icon: <BsEnvelopePaperHeart className={iconStyle} />,
    },
    {
      name: "Order history",
      to: "order-history",
      icon: <SlHandbag className={iconStyle} />,
    },
    {
      name: "Fund history",
      to: "fund-history",
      icon: <GiSwapBag className={iconStyle} id="fundHistory" />,
    },
    { name: "Team", to: "team", icon: <GoPeople className={iconStyle} /> },
    { name: "Set", to: "set", icon: <GoGear className={iconStyle} /> },
  ];

  return user?.isAdmin ? adminOptions : clientOptions;
};

export default MyOptionData;
