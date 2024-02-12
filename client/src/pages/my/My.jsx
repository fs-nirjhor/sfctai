import MyNav from "./myNav/MyNav";
import MyProfile from "./MyProfile";
import MyOption from "./myOption/MyOption";

const My = () => {
  return (
    <section className="bg-[url('/images/bg/myBg.jpg')] bg-repeat-y bg-center bg-origin-border bg-cover bg-scroll min-h-screen">
      <h1 className="font-semibold text-center pt-2 mb-5">My</h1>
      <MyProfile />
      <MyNav />
      <MyOption />
    </section>
  );
};
export default My;
