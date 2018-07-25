import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

const Products = [
  { id: 1, name: "WATCH", price: 100, quant: 0 },
  { id: 2, name: "SHOES", price: 120, quant: 0 },
  { id: 3, name: "BAG", price: 80, quant: 0 },
  { id: 4, name: "GLASS", price: 40, quant: 0 },
  { id: 5, name: "SHIRT", price: 150, quant: 0 }
];
var totAmt = 0;
var totCount = 0;
var count = 0;

const pages = {
  PRODUCT_LIST: "PRODUCT_LIST",
  CART_LIST: "CART_LIST"
};
let currentPage = pages.PRODUCT_LIST;
const Add = (productId, price, quant) => {
  totCount++;
  count = ++Products[productId - 1].quant;
  totAmt += Products[productId - 1].price;
  //const [product] = Products.filter(({ id }) => productId === id);
  document.getElementById("totCount").innerHTML = "Total :" + totCount;
  document.getElementById("quant" + productId).innerHTML = count;
};
const Rem = (productId, price, quant) => {
  if (Products[productId - 1].quant > 0) {
    totCount--;
    count = --Products[productId - 1].quant;
    totAmt -= Products[productId - 1].price;
    //const [product] = Products.filter(({ id }) => productId === id);
    document.getElementById("quant" + productId).innerHTML = count;
    document.getElementById("totCount").innerHTML = "Total :" + totCount;
  }
};
const Print = ({ id, name, price, quant }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
      <td id={"quant" + id}>{quant}</td>
      <td>
        {" "}
        <button className="add-btn" onClick={Add.bind(null, id, price, quant)}>
          {"+"}
        </button>{" "}
      </td>
      <td>
        {" "}
        <button className="rmv-btn" onClick={Rem.bind(null, id, price, quant)}>
          {"-"}
        </button>{" "}
      </td>
    </tr>
  );
};
const Display = ({ id, name, price, quant }) => {
  if (quant == 0) {
    return null;
  }
  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
      <td>{quant}</td>
      <td>{price * quant}</td>
    </tr>
  );
};
const ProductList = () => (
  <React.Fragment>
    <body>
      <div id="div">
        <nav className="titleNav">
          <h1 className="shopZone">
            <span>S</span>hop<span>Z</span>one
          </h1>
          <div className="buttonDiv">
            <button className="cartBtn" onClick={goCart.bind(null)}>
              {""}
            </button>
          </div>
        </nav>
        <table className="tab">
          <th>NAME</th>
          <th>PRICE</th>
          <th>QUANTITY</th>
          <th>ADD</th>
          <th>REMOVE</th>
          <tbody>{Products.map(product => <Print {...product} />)}</tbody>
        </table>
        <p id="totCount" />
      </div>
    </body>
  </React.Fragment>
);

const goCart = () => {
  currentPage = pages.CART_LIST;
  renderApp();
};
const CartList = () => {
  if (totCount > 0)
    return (
      <React.Fragment>
        <div>
          <nav>
            <h1 className="shopZone">
              <span>S</span>hop<span>Z</span>one
            </h1>
          </nav>
          <table className="tab">
            <th>NAME</th>
            <th>UNIT_PRICE</th>
            <th>QUANTITY</th>
            <th>PRICE</th>

            <tbody>
              {Products.map(cartProduct => <Display {...cartProduct} />)}
            </tbody>
          </table>

          <p className="totAmt">Total= {totAmt}/-</p>
        </div>
      </React.Fragment>
    );
  else {
    return (
      <React.Fragment>
        <div>
          <nav>
            <h1 className="shopZone">
              <span>S</span>hop<span>Z</span>one
            </h1>
          </nav>
          <p className="noItem">....NO ITEM....</p>
        </div>
      </React.Fragment>
    );
  }
};
const App = () => (
  <div className="App">
    {currentPage === pages.PRODUCT_LIST ? <ProductList /> : <CartList />}
  </div>
);
const renderApp = () => {
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);
};
renderApp();
