import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalQuantity);

  const totalCartPrice = useSelector(getTotalCartPrice);

  if(!totalCartPrice) return null;

  return (
    <div className="flex items-center justify-between bg-stone-700 p-4 text-sm text-stone-200 uppercase sm:p-6 sm:text-base">
      <p className="space-x-4">
        <span>{totalCartQuantity} pizzas</span>
      <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart" className="">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
