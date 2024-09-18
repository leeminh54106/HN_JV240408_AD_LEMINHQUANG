import React, { useState } from "react";
import ProductJson from "../../db.json";
import { saveData } from "../utils/common";
import { Modal } from "antd";
// Tạo ngữ cảnh
export const ProductProvider = React.createContext();
const { confirm } = Modal;
export default function ProductContext({ children }) {
  const [listProduct, setListProduct] = useState(() => {
    return ProductJson;
  });

  const [listCart, setListCart] = useState(() => {
    const cartLocals = JSON.parse(localStorage.getItem("carts")) || [];

    return cartLocals;
  });

  //thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    const findProductByCarts = listCart.find(
      (item) => item.product.id === product.id
    );

    if (!findProductByCarts) {
      const updateCarts = [...listCart, { product, quantity: 1 }];

      setListCart(updateCarts);
      saveData("carts", updateCarts);
    } else {
      const updateCarts = listCart.map((cart) => {
        if (cart.product.id === product.id) {
          return { ...cart, quantity: (cart.quantity += 1) };
        }

        return cart;
      });

      setListCart(updateCarts);
      saveData("carts", updateCarts);
    }
  };

  //cộng sản phẩm vào giỏ hàng (+)
  const changeQuantityPlus = (id) => {
    const newCart = listCart.map((item) => {
      if (item.product.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setListCart(newCart);
  };

  //trừ sản phẩm trong giỏ hàng (-)
  const changeQuantityMinus = (id) => {
    const newCart = listCart.map((item) => {
      if (item.product.id === id) {
        if(item.quantity > 1){
          return { ...item, quantity: item.quantity - 1 };
        }else{
          confirm({
            title: "Bạn có chắc chắn muốn xóa không?",
            content: "Sản phẩm này sẽ bị xóa khỏi giỏ hàng của bạn.",
            okText: "Xóa",
            cancelText: "Hủy",
            onOk: () => {
              const indexDelete = listCart.findIndex(
                (item) => item.product.id === id
              );
              if (indexDelete !== -1) {
                const newListCart = [...listCart];
                newListCart.splice(indexDelete, 1);
                setListCart(newListCart);
              }
            },
            onCancel: () => {
              console.log("Xóa sản phẩm bị hủy");
            },
          });
        }
      }
      return item;
    });
    setListCart(newCart);
  };

  //xóa sản phẩm khỏi giỏ hàng
  const deleteProduct = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      content: "Sản phẩm này sẽ bị xóa khỏi giỏ hàng của bạn.",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        const indexDelete = listCart.findIndex(
          (item) => item.product.id === id
        );
        if (indexDelete !== -1) {
          const newListCart = [...listCart];
          newListCart.splice(indexDelete, 1);
          setListCart(newListCart);
        }
      },
      onCancel: () => {
        console.log("Xóa sản phẩm bị hủy");
      },
    });
  };

  return (
    <>
      <ProductProvider.Provider
        value={{
          listProduct,
          handleAddToCart,
          listCart,
          changeQuantityPlus,
          changeQuantityMinus,
          deleteProduct,
        }}
      >
        {children}
      </ProductProvider.Provider>
    </>
  );
}
