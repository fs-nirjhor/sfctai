const Headline = () => {
  return (
    <section className="flex flex-row bg-white p-2 mt-10 mx-3 rounded">
      <figure>
        <img src="/images/mike.png" alt="mike" className="w-10 me-5"/>
      </figure>
      <p className="uppercase font-semibold flex-grow">
        <marquee>Welcome to <span className="text-lg">N</span>ew <span className="text-lg">C</span>opy <span className="text-lg">T</span>rading <span className="text-lg">P</span>latform</marquee>
      </p>
    </section>
  );
};
export default Headline;