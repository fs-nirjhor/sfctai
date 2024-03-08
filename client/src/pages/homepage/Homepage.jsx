import Bannar from "./Bannar";
import Coins from "./Coins";
import Headline from "./Headline";
import Wallets from "./Wallets";

function Homepage() {
  return (
    <section className="bg-[url('/images/bg/homeBg.jpg')] bg-repeat-y bg-origin-border bg-scroll min-h-screen">
      <div className="pb-20">
        <h1 className="font-semibold text-center pt-2 mb-3">SFCTAI</h1>
        <Bannar />
        <Headline />
        <Wallets />
        <Coins />
      </div>
    </section>
  );
}
export default Homepage;
