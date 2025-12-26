import React from "react";
import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, size, onClick }) {
  const base =
    "mt-2 inline-block text-sm cursor-pointer rounded-full bg-yellow-400  font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed";

  const styles = {
    small: base + " px-3 py-2 text-xs md:px-4 sm:py-3 text-xl",
    circle: base + " md:h-10 md:w-10 w-8 h-8 text-xs  text-xl",
    primary: base + " px-4 py-3 md:px-6 md:py-4  ",
    secondary:
      "mt-2 px-4 text-sm py-2.5 md:px-6 md:py-3.5 inline-block cursor-pointer rounded-full  font-semibold tracking-wide text-stone-400 hover:text-stone-800 focus:text-stone-800 border-2 border-stone-300 uppercase transition-colors duration-300 hover:bg-stone-300 focus:bg-stone-300 focus:ring focus:ring-stone-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed",
     
    };
  if (to)
    return (
      <Link to={to} className={styles[size]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button disabled={disabled} className={styles[size]} onClick={onClick}>
        {children}
      </button>
    );
  return (
    <button disabled={disabled} className={styles[size]}>
      {children}
    </button>
  );
}
