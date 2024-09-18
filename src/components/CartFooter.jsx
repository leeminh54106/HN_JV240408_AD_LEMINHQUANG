import React, { useContext, useEffect, useState } from "react";
import { ProductProvider } from "../providers/ProductContext";
import { formatMoney } from "../utils/formatData";

export default function CartFooter() {
  const { listCart } = useContext(ProductProvider);

  const [totalAmount, setTotalAmount] = useState(() => {
    const total = listCart.reduce((prev, current) => {
      return prev + current.product.price * current.quantity;
    }, 0);

    return total;
  });

  console.log("totalAmount: ", totalAmount);
  useEffect(() => {
    setTotalAmount(
      listCart.reduce((prev, current) => {
        return prev + current.product.price * current.quantity;
      }, 0)
    );
  }, [listCart]);
  return (
    <>
      <footer className="flex items-center gap-5 pt-5">
        <span>Tổng tiền:</span>
        <span>{formatMoney(totalAmount)}</span>
      </footer>
    </>
  );
}
