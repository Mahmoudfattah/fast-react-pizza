import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

export default function Header() {
  return (
    <header className='bg-yellow-500 text-stone-700 text-sm uppercase tracking-widest font-semibold px-4 py-2 border-b sm:px-6 sm:py-4 sm:text-xl flex items-center justify-between'>
      <Link to="/" className="">
        Fast React Pizze Co.
      </Link>

      <SearchOrder />
      <UserName/>
    </header>
  );
}
