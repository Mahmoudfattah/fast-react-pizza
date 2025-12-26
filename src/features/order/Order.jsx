// src/features/order/Order.jsx
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder, updateOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import Button from "../../ui/Button";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
 

  //this part will return the data from menu page and we can use part of them 
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const priceOrder = formatCurrency(orderPrice);
  const pricePriority = formatCurrency(priorityPrice);
  const toPayOnDeliver = formatCurrency(orderPrice + priorityPrice);
  const EstimatedDelivery = formatDate(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="bg-red-500 rounded-full px-3 py-1 text-red-50 text-sm uppercase tracking-wide">
              Priority
            </span>
          )}
          <span className="bg-green-500 rounded-full px-3 py-1 text-green-50 text-sm uppercase tracking-wide">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm text-stone-500">
          (Estimated delivery: {EstimatedDelivery})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-y border-stone-200">
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
            item={item}
          />
        ))}
      </ul>

      <div className="space-y-2 px-6 py-5 bg-stone-200">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {priceOrder}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {pricePriority}
          </p>
        )}
        <p className="font-bold">To pay on delivery: {toPayOnDeliver}</p>
      </div>

      {/* لو مش Priority، اعرض الزرار */}
      {!priority && <UpdatePiority  />}
    </div>
  );
}

function UpdatePiority() {
  const fetcher = useFetcher();

  // اختيارية: ما تعرضش الزرار لو الطلب مش pending مثلاً
  // if (order.status !== "pending") return null;

  const isSubmitting = fetcher.state === "submitting";

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button size="primary" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Make priority"}
      </Button>
    </fetcher.Form>
  );
}

// ⬇⬇⬇ ده اللي بيجيب بيانات الأوردر
export async function Loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

// ⬇⬇⬇ ده اللي بيتنادى لما اليوزر يضغط الزرار
export async function action({ params }) {
  //because the form of button don't send any data we can update without 
  //request and formData
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  // React Router بعد الـ action هيرجع يعمّل revalidate للـ loader
  // فـ UI يتحدّث ويختفي الزرار
  return null;
}

export default Order;
