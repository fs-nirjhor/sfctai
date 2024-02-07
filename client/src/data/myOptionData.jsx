import { MdOutlineVerifiedUser } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GiSwapBag } from "react-icons/gi";
import { PiExcludeSquareDuotone } from "react-icons/pi";
import { GoPeople } from "react-icons/go";
import { GoGear } from "react-icons/go";
import { BsDownload } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

const iconStyle = "text-myPrimary inline-block me-3 text-2xl";

const clientOptions = [
  {
    name: "TXID Authentication",
    to: "txid-authentication",
    icon: <MdOutlineVerifiedUser className={iconStyle} />,
  },
  {
    name: "Order history",
    to: "order-history",
    icon: <HiOutlineShoppingBag className={iconStyle} />,
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
  {
    name: "Download Link",
    to: "",
    icon: <BsDownload className={iconStyle} />,
  },
  // admin option
];

const adminIconStyle = "text-myPrimary inline-block me-3 text-2xl";
const adminOptions = [
  {
    name: "Clients",
    to: "client-list",
    icon: <FiUsers className={adminIconStyle} />,
  },
  {
    name: "Order history",
    to: "order-history",
    icon: <HiOutlineShoppingBag className={iconStyle} />,
  },
  {
    name: "Fund history",
    to: "fund-history",
    icon: <GiSwapBag className={iconStyle} id="fundHistory" />,
  },
  { name: "Team", to: "team", icon: <GoPeople className={iconStyle} /> },
  { name: "Set", to: "set", icon: <GoGear className={iconStyle} /> },
]

export {clientOptions, adminOptions};
