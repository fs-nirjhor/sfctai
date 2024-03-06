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
  const bannarStyle = "w-full aspect-video object-cover";
  return (
    <section>
      <Slider {...settings}>
      <video
          className={bannarStyle}
          autoPlay
          loop
          muted
          poster="/videos/homeVideo.png"
        >
          <source src="/videos/homeVideo.mp4" type="video/mp4" />
        </video>
          <figure >
            <img
              src="/images/bannar/bannar1.jpg"
              className={bannarStyle}
              alt="bannar"
            />
          </figure>
          <figure >
            <img
              src="/images/bannar/bannar2.jpg"
              className={bannarStyle}
              alt="bannar"
            />
          </figure>
      </Slider>
    </section>
  );
};
export default Bannar;
