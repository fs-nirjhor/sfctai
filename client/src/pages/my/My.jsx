import MyNav from "./myNav/MyNav";
import MyProfile from "./MyProfile";
import MyOption from "./myOption/MyOption";

const My = () => {
  return (
    <section >
      <div className="bg-mySecondary bg-opacity-80 rounded-lg">
      <MyProfile />
      <MyNav />
      </div>
      <MyOption />
    </section>
  );
};
export default My;
