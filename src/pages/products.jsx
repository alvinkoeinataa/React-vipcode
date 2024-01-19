import { useEffect, useRef, useState } from "react";
import Button from "../components/Elements/Button";
import CardProduct from "../components/Fragments/CardProduct";
import { getProducts } from "../services/product.service";
// import Counter from "../components/Fragments/Counter";

const Email = localStorage.getItem("email");

const ProductPage = () => {
  const [cart, setCart] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);

  const handleLogOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.href = "/login";
  };

  const handleAddToCart = (id) => {
    if (cart.find((item) => item.id === id)) {
      setCart(cart.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)));
    } else {
      setCart([...cart, { id, qty: 1 }]);
    }
  };

  //useRef
  // const cartRef = useRef(JSON.parse(localStorage.getItem("cart")) || []);

  // const handleAddToCartRef = (id) => {
  //   cartRef.current = [...cartRef.current, { id, qty: 1 }];
  //   localStorage.setItem("cart", JSON.stringify(cartRef.current));
  // };

  const totalPriceRef = useRef(null);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, getProducts]);

  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart]);

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <>
      <div className="flex justify-end h-10 bg-blue-600 text-white items-center px-10">
        {Email}
        <Button variant="ml-5 bg-black" onClick={handleLogOut}>
          LogOut
        </Button>
      </div>
      <div className="flex justify-center py-5">
        <div className="w-4/6 flex flex-wrap">
          {products.length > 0 &&
            products.map((product) => (
              <div key={product.id}>
                <CardProduct>
                  <CardProduct.Header image={product.image}> </CardProduct.Header>
                  <CardProduct.Body title={product.title}>{product.description} </CardProduct.Body>
                  <CardProduct.Footer price={product.price} id={product.id} handleAddToCart={handleAddToCart}>
                    {" "}
                  </CardProduct.Footer>
                </CardProduct>
              </div>
            ))}
        </div>

        <div className="w-2/6">
          <h1 className="text-3xl font-bold text-blue-600 ml-5 mb-2">Cart</h1>

          <table className="text-left table-auto border-separate border-spacing-x-5">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                cart.map((item) => {
                  const product = products.find((product) => product.id === item.id);
                  return (
                    <tr key={item.id}>
                      <td>{product.title.substring(0, 10)}...</td>
                      <td>
                        USD{" "}
                        {product.price.toLocaleString("id-ID", {
                          styles: "currency",
                          currency: "IDR",
                        })}
                      </td>
                      <td>{item.qty}</td>
                      <td>
                        ${" "}
                        {(item.qty * product.price).toLocaleString("id-ID", {
                          styles: "currency",
                          currency: "IDR",
                        })}
                      </td>
                    </tr>
                  );
                })}

              <tr ref={totalPriceRef}>
                <td colSpan={3}>
                  <b>Total Price</b>
                </td>
                <td>
                  <b>
                    USD{" "}
                    {totalPrice.toLocaleString("id-ID", {
                      styles: "currency",
                      currency: "USD",
                    })}
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* <Counter /> */}
    </>
  );
};

export default ProductPage;

// const products = [
//   {
//     id: 1,
//     name: "sepatu baru",
//     price: 1000000,
//     image: "/image/shoes.jpg",
//     description: "babi ipsum dolor sit, amet consectetur adipisicing elit. Unde, a eos veniam iste nulla qui",
//   },

//   {
//     id: 2,
//     name: "sepatu lama",
//     price: 3000000,
//     image: "/image/shoes.jpg",
//     description: "babi puki dolor sit, amet consectetur adipisicing elit. Unde, a eos veniam iste nulla qui",
//   },

//   {
//     id: 3,
//     name: "Bilabolong",
//     price: 50000,
//     image: "/image/shoes.jpg",
//     description: "bilabolong puki dolor sit, amet consectetur adipisicing elit. Unde, a eos veniam iste nulla qui",
//   },
// ];
