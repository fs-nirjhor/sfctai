import Bannar from "./Bannar";
import Coins from "./Coins";
import Wallets from "./Wallets";

function Homepage() {
  return (
    <section className="pb-20">
      <h1 className="text-xl font-bold text-center my-2">SYAI</h1>
      {/* <Bannar /> */}
      <video className="w-full aspect-[5/2] object-cover rounded" autoPlay loop muted>
        <source src="/videos/homepageVideo.mp4" type="video/mp4" />
      </video>

      <Wallets />
      <Coins />
    </section>
  );
}
export default Homepage;
