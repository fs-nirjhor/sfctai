import Slider from "react-slick";


const Wallets = () => {
  
  const wallets = [
    "/images/wallet/binance.png",
    "/images/wallet/huobi.png",
    "/images/wallet/kucoin.png",
    "/images/wallet/coinbase.png",
    "/images/wallet/okex.png",
  ];
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    pauseOnHover: false,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 8000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    className: "py-5",
  };
  return (
    <section >
      <Slider {...settings}>
        {wallets.map((wallet, i) => (
          <div key={i} >
            <img src={wallet} alt="wallet" className="w-12 h-12 mx-auto" />
          </div>
        ))}
      </Slider>
    </section>
  );
};
export default Wallets;
