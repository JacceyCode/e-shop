import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import truncateText from "../../utils/truncateText";
import ProductViewModal from "./ProductViewModal";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductCard = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  about = false,
}) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const btnLoader = false;
  const [selectedViewProduct, setSelectedViewProduct] = useState("");
  const isAvailable = quantity && Number(quantity) > 0;
  const dispatch = useDispatch();

  const handleProductView = () => {
    if (!about) {
      setSelectedViewProduct({
        id: productId,
        productName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice,
      });
      setOpenProductViewModal(true);
    }
  };

  const addToCartHandler = (cartItems) => {
    dispatch(addToCart(cartItems, 1, toast));
  };

  return (
    <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      <div
        onClick={handleProductView}
        className="w-full overflow-hidden aspect-[3/2]"
      >
        <img
          src={image}
          alt={productName}
          className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h2
          onClick={handleProductView}
          className="text-lg font-semibold cursor-pointer"
        >
          {truncateText(productName, 50)}
        </h2>

        <div className="min-h-20 max-h-20">
          <p className="text-gray-600 text-sm">
            {truncateText(description, 80)}
          </p>
        </div>

        {!about && (
          <div className="flex items-center justify-between">
            {specialPrice ? (
              <div className="flex flex-col">
                <span className="text-gray-400 line-through">
                  ${Number(price).toFixed(2)}
                </span>
                <span className="font-bold text-xl text-slte-700">
                  ${Number(specialPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-gray-700">${Number(price).toFixed(2)}</span>
            )}

            <button
              onClick={() =>
                addToCartHandler({
                  image,
                  productName,
                  description,
                  specialPrice,
                  price,
                  productId,
                  quantity,
                })
              }
              className={`bg-blue-500 ${
                isAvailable
                  ? "opacity-100 hover:bg-blue-600"
                  : "opacity-70 cursor-not-allowed"
              } text-white py-2 ox-3 rounded-lg flex items-center justify-center transition-colors duration-300 w-36`}
              disabled={!isAvailable || btnLoader}
            >
              <FaShoppingCart className="mr-2" />
              {isAvailable ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        )}
      </div>

      <ProductViewModal
        open={openProductViewModal}
        setOpen={() => setOpenProductViewModal(false)}
        product={selectedViewProduct}
        isAvailable={isAvailable}
      />
    </div>
  );
};

export default ProductCard;
