import Bannar from "./Bannar";
import Coins from "./Coins";
import Wallets from "./Wallets";

function Homepage() {
  return (
    <section className="pb-20 bg-[url('/images/bg/homeBg.jpg')] bg-no-repeat bg-center bg-origin-border bg-opacity-60">
      <h1 className="font-semibold text-center pt-2 mb-5">STFAI</h1>
      {/* <Bannar /> */}
      <video
        className="w-full aspect-[5/2] object-cover rounded"
        autoPlay
        loop
        muted
      >
        <source src="/videos/homepageVideo.mp4" type="video/mp4" />
      </video>

      <Wallets />
      <Coins />
    </section>
  );
}
export default Homepage;
