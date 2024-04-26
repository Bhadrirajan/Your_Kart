import Card from "./Card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";


const CartDetails = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.CartSlice.cart);
  const cartDetails =
    cart.length != 0 ? (
      cart?.map((item) => {
        return (
          <>
            <Card props={item.product} key={item.product.id} />
          </>
        );
      })
    ) : (
      <div>No items in cart</div>
    );
  return (
    <>
      <Button
        name={"Back to Home"}
        onClick={() => {
          navigate(-1);
        }}
      ></Button>
      {cartDetails}
    </>
  );
};
export default CartDetails;
