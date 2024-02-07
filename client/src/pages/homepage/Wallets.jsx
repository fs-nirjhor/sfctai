import Slider from "react-slick";


const Wallets = () => {
  
  const wallets = [
    "/images/wallet/binance.png",
    "/images/wallet/huobi.png",
    "/images/wallet/kucoin.png",
    "/images/wallet/coinbase.jpeg",
    "/images/wallet/okex.jpeg",
  ];
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 8000,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    cssEase: "linear",
  };
  return (
    <section className="mt-10">
      <Slider {...settings}>
        {wallets.map((wallet, i) => (
          <figure key={i} >
            <img src={wallet} alt="wallet" className="w-12 h-12 mx-auto" />
          </figure>
        ))}
      </Slider>
    </section>
  );
};
export default Wallets;
