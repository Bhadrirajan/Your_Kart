import Card from "./Card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Favorites = () => {
  const navigate = useNavigate();
  const favorite = useSelector((state) => state.CartSlice.favorite);
  const favoriteData = favorite.length != 0 ? favorite?.map((item) => {
    return (
      <>
        <Card props={item} key={item.id} />
      </>
    );
  }) : <div>No items in favorite</div>
  return (
    <>
      <Button name={"Back to Home"} onClick={() => {
          navigate(-1);
        }}></Button>
      {favoriteData}
    </>
  );
};
export default Favorites;
