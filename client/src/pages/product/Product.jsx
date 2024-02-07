import Confirm from './Confirm';
import Start from './Start';

const Product = () => { 
  return (
      <section className='pb-20'>
        <h1 className="text-xl font-bold text-center my-2">Copy Trade</h1>
        <Start />
        <Confirm />
      </section>
  );
};
export default Product;
