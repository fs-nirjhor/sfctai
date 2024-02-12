import Confirm from "./Confirm";
import Start from "./Start";

const Product = () => {
  return (
    <section className="bg-[url('/images/bg/tradeBg.jpg')] bg-no-repeat bg-center bg-origin-border bg-cover min-h-screen">
      <div className="pb-20">
      <h1 className="font-semibold text-center pt-2 mb-5">Copy Trade</h1>
      <Start />
      <Confirm />
      </div>
    </section>
  );
};
export default Product;
