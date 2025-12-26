// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import { clear, getTotalCartPrice } from "../cart/cartSlice";

import store from "../../store";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { fetchAdrress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const formError = useActionData(); //this hook for only the error thar happend in the Form
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector(getTotalCartPrice);

  const priority = withPriority ? totalPrice * 0.2 : 0;

  const TotalPrice = totalPrice + priority;

  const nivigation = useNavigation();
  const isLoading = nivigation.state === "submitting";
  
  const {
    username,
    status: statusAddress,
    position,
    address,
    error,
  } = useSelector((stata) => stata.user);

  const isLoadingAddress = statusAddress === "loading";

  

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-5 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 py-2 text-center text-sm text-red-800">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="relative grow">
            <input
              type="text"
              name="address"
              required
              defaultValue={address}
              disabled={isLoadingAddress}
              className="md-py-3 focus:ring-opicity-100 w-full rounded-full border border-stone-200 bg-stone-100 px-4 py-3 text-sm font-semibold text-stone-400 transition-all duration-300 placeholder:text-stone-400 focus:ring focus:ring-yellow-400 focus:outline-none md:px-6"
            />
            {statusAddress === "failed" && (
              <p className="mt-2 flex items-center justify-between rounded-md bg-red-100 px-6 py-2 text-center text-sm text-red-800">
                {error}
                <Button
                  disabled={isLoadingAddress}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAdrress());
                  }}
                  size="small"
                >
                  {" "}
                  get position
                </Button>
              </p>
            )}
            {!position.latitude && !position.longitude && !error && (
              <span className="absolute right-1 sm:bottom-[3px]">
                <Button
                  disabled={isLoadingAddress}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAdrress());
                  }}
                  size="small"
                >
                  {" "}
                  get position
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="mt-3 mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority? 
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />

          <Button size="primary" disabled={isLoading}>
            {isLoading
              ? `Placing order...`
              : `Order now ${formatCurrency(TotalPrice)} `}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  const order = {
    ...data,
    cart: JSON.parse(data.cart),

    priority: data.priority === "true",
  };
 

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "pleaze gave us your correct phone number. we might need it to contact with you ";
  if (Object.keys(errors).length > 0) return errors;

  await store.dispatch(clear());
  //newOrder return the data relative to order and also the id 
  const newOrder = await createOrder(order);
  
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
