import Slider from "react-slick";

const Bannar = () => {
  const bannars = [
    "/images/bannar/bannar1.jpg",
    "/images/bannar/bannar2.jpg",
    "/images/bannar/bannar3.jpg",
    "/images/bannar/bannar4.jpg",
    "/images/bannar/bannar5.jpg",
    "/images/bannar/bannar6.jpg",
  ];
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <section>
      <Slider {...settings}>
        {bannars.map((bannar, i) => (
          <figure key={i}>
            <img
              src={bannar}
              className="h-48 w-full rounded-box"
              alt="bannar"
            />
          </figure>
        ))}
      </Slider>
    </section>
  );
};
export default Bannar;
