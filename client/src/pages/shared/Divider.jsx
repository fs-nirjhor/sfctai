const Divider = () => {
  const circleStyle =
    "w-4 aspect-square rounded-full border-4 border-myPrimary";
  const lineStyle = "h-0 border border-myPrimary border-dashed grow";
  return (
    <section className="flex justify-center items-center">
      <div className={circleStyle}></div>
      <div className={lineStyle}></div>
      <div className={circleStyle}></div>
      <div className={lineStyle}></div>
      <div className={circleStyle}></div>
    </section>
  );
};
export default Divider;
