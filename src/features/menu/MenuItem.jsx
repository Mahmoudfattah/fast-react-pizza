import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import {
  addItem,
  
  getCurrentQuantityById,
  
} from "../cart/cartSlice";
import { toast } from "react-hot-toast";
import DeleteItem from "../../ui/DeleteItem";
import UpdateItemQuantity from "../../ui/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const getCurrentQuantity = useSelector(getCurrentQuantityById(id));

  const showDeleteButton = getCurrentQuantity > 0;

  const dispatch = useDispatch();

  function handleToCart(e) {
    e.preventDefault();
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
    toast.success("Added Successfully");
  }
  return (
    <li className="flex gap-6 py-2 ">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale-75 " : ""}`}
      />
      <div className="flex grow flex-col pt-1">
        <p className="font-medium text-stone-800">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm text-stone-500 uppercase"> Sold out</p>
          )}
          <div className="flex items-center justify-center gap-3">
            {showDeleteButton && (
              <>
                <div className="flex items-center justify-center gap-3 sm:gap-7">
                  <UpdateItemQuantity id={id} />
                  <DeleteItem pizzaId={id} />
                </div>
              </>
            )}
            {!soldOut && !showDeleteButton && (
              <Button size="small" onClick={handleToCart}>
                Add to cart{" "}
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
