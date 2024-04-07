import about from "./aboutData";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="bg-[url('/images/bg/myBg.jpg')] bg-repeat-y bg-center bg-origin-border bg-cover bg-scroll min-h-screen">
      <h1 className="font-semibold text-center pt-2 mb-5">About</h1>
      <figure className="p-5">
        <img src="/images/logo.png" alt="AFTAAI" className="mx-auto w-60" />
      </figure>
      <div className="font-semibold px-2">
        {about.map((info, i) => {
          return (
            <Link
              className="bg-mySecondary p-3 mb-3 rounded-md block text-black font-light"
              to={info.link}
              key={i}
            >
              {info.title}
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export default About;
