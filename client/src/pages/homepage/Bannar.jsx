import Slider from "react-slick";

const Bannar = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };
  const bannarStyle = "w-full aspect-[2/1] object-cover";
  return (
    <section>
      <Slider {...settings}>
        <figure>
          <img
            src="/images/bannar/bannar.jpg"
            className={bannarStyle}
            alt="aftaai"
          />
        </figure>
      </Slider>
    </section>
  );
};
export default Bannar;
