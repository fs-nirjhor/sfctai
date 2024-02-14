import Confirm from "./Confirm";
import Start from "./Start";

const Product = () => {
  return (
    <section className="bg-[url('/images/bg/tradeBg.jpg')] bg-repeat-y bg-center bg-origin-border min-h-screen">
      <div className="pb-20">
      <h1 className="font-semibold text-center pt-2 mb-5">Copy Trade</h1>
      <Start />
      <Confirm />
      </div>
    </section>
  );
};
export default Product;
