// import { useLoaderData } from "react-router-dom";
// import { getMenu } from "../../services/apiRestaurant";
// import MenuItem from "./MenuItem";

// function Menu() {

//   const menu = useLoaderData()
//   console.log(menu)
//   return <ul>
//     {menu.map(pizza =>
//       <MenuItem pizza={pizza} key={pizza.id}></MenuItem>
//     )}
//   </ul>;
// }

// export async function loader(){
//   const menu = await getMenu()
//   return menu
// }

// export default Menu;
import { Link, useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { getTotalQuantity } from "../cart/cartSlice";

function Menu() {
  const menu = useLoaderData();

  // هنا بنصلّح اللينك بتاع الصورة
  const fixedMenu = menu.map((pizza) => {
    // نطلع اسم الصورة بس من اللينك القديم
    const fileName = pizza.imageUrl.split("/").at(-1); // "pizza-1.jpg"

    return {
      ...pizza,
      imageUrl: `/pizzas/${fileName}`, // ده مسار الصورة من public/
    };
  });

  const cart = useSelector((state) => state.cart.cart);
  const TotalQuantity = cart.reduce((sum,item)=>
   sum + item.quantity
  ,0)
 
 
  const showCart = cart.length !== 0;
  return (
    <>
      {showCart && (
  <Link
    to="/cart"
    aria-label="Open cart"
    className="
    right-4 top-20
      fixed sm:right-8 sm:top-25
      z-50 flex sm:h-12 h-8 w-8 sm:w-12 items-center justify-center
      rounded-full bg-yellow-800 shadow-lg ring-2 ring-yellow-300
    "
  >
 
 <div>
      <ShoppingCart className="sm:w-6 w-4 h-4 relative sm:h-6 text-yellow-300 " />
        <span className=" text-yellow-800  sm:text-xl text-sm bg-yellow-300 ring ring-yellow-800  rounded-full sm:h-7 h-5 w-5 sm:w-7 flex items-center sm:right-9 right-5 justify-center absolute top-[-10px] ">{TotalQuantity}</span>

       
    
 </div>
  </Link>
)}

      <ul className="relative divide-y divide-stone-200 px-2">
        {fixedMenu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </>
  );
}

export async function Loader() {
  const menu = await getMenu();
  return menu; //this part will return the data direct because in getMenu fn it's extract direct
}

export default Menu;
