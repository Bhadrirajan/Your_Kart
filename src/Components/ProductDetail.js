import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../CartSlice";
import Button from "./Button";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const locationArray = location.pathname.split("/");
  const Id = locationArray[locationArray.length - 1];
  console.log(Id);
  const product = useSelector((state) => state.CartSlice.ProductDetails);
  console.log(product);

  useEffect(() => {
    dispatch(fetchProductDetails(Id));
  }, []);
  const { title, image, description, price, rating } = product;
  return (
    <div>
      <Button
        name={"Back to Home"}
        onClick={() => {
          navigate(-1);
        }}
      ></Button>
      <img src={image} width={"50px"} height={"50px"} alt="items"></img>
      <h5>{title}</h5>
      <p>{description}</p>
      <h5>{price}</h5>
      {/* <h5>{rating['rate']} out of <span>{rating['count']}</span></h5> */}
    </div>
  );
};
export default ProductDetail;
