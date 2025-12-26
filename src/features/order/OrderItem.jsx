import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 ">
      <div className="flex items-center justify-between gap-4 ">
        <div className="text-sm font-bold space-y-2">
          <span>{quantity}&times;</span> {name}
          <p className="font-sm text-stone-500 italic capitalize ">
          {isLoadingIngredients?'loading...': ingredients.join(', ')}
        </p>
        </div>
        <p className=" text-sm font-bold">{formatCurrency(totalPrice)}</p>
        
      </div>
    </li>
  );
}

export default OrderItem;
