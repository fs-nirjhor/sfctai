import Confirm from "./Confirm";
import Start from "./Start";

const Product = () => {
  return (
    <section className="pb-20">
      <h1 className="font-semibold text-center pt-2 mb-5">Copy Trade</h1>
      <Start />
      <Confirm />
    </section>
  );
};
export default Product;
