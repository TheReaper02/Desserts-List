import { useState } from "react";
import data from "./data.json";

function App() {
  const [selectedProducts, setSelectedProducts] = useState({});
  const totalItems = Object.values(selectedProducts).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  return (

    <main className="bg-rose-50 min-h-screen font-red-hat w-full max-w-360 mx-auto">
      <h1 className="font-red-hat text-3xl font-bold text-rose-900 p-4">
        Desserts
      </h1>
      <div className="flex flex-col lg:flex-row items-start gap-8 p-4">
        <div className="flex-1 w-full">
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center">
            {data.map((item) => (
              <div key={item.id} className="flex flex-col w-full h-full">
                <div
                  className={
                    "relative w-full mb-6" +
                    (selectedProducts[item.id]
                      ? " border-2 border-rose-700 rounded-lg"
                      : "")
                  }
                >
                  <div className="aspect-4/3 w-full">
                    <picture>
                      <source
                        media="(min-width: 1024px)"
                        srcSet={item.image.desktop}
                      />
                      <source media="(min-width: 768px)" srcSet={item.image.tablet} />
                      <img
                        src={item.image.mobile}
                        alt={item.name}
                        className="rounded-lg w-full h-full object-cover"
                      />
                    </picture>
                  </div>
                  {selectedProducts[item.id] ? (
                    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-red rounded-full px-4 py-2 font-bold text-white flex items-center gap-4 w-40 justify-between">
                      <button
                        aria-label="Decrease Quantity"
                        className="cursor-pointer border border-white rounded-full w-4 h-4 flex items-center justify-center"
                        onClick={() =>
                          setSelectedProducts((prev) => {
                            const newQuantity = Math.max(
                              (prev[item.id] || 1) - 1,
                              0,
                            );
                            if (newQuantity === 0) {
                              const copy = { ...prev };
                              delete copy[item.id];
                              return copy;
                            }
                            return {
                              ...prev,
                              [item.id]: newQuantity,
                            };
                          })
                        }
                      >
                        <img
                          src="/assets/images/icon-decrement-quantity.svg"
                          alt=""
                        ></img>
                      </button>
                      <span className="font-semibold">
                        {selectedProducts[item.id] || 1}
                      </span>
                      <button
                        aria-label="Increase Quantity"
                        className="cursor-pointer border border-white rounded-full w-4 h-4 flex items-center justify-center"
                        onClick={() =>
                          setSelectedProducts((prev) => {
                            const newQuantity = (prev[item.id] || 1) + 1;
                            return {
                              ...prev,
                              [item.id]: newQuantity,
                            };
                          })
                        }
                      >
                        <img
                          src="/assets/images/icon-increment-quantity.svg"
                          alt=""
                        ></img>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedProducts((prev) => ({
                          ...prev,
                          [item.id]: 1,
                        }));
                      }}
                      className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-rose-100 border border-rose-500 rounded-full px-4 py-2 font-bold text-rose-900 media-[1024px]:px-6 media-[1024px]:py-8 w-40
                      hover:bg-rose-200 cursor-pointer ease-out transition duration-300"
                    >
                      <span>
                        <img
                          src="/assets/images/icon-add-to-cart.svg"
                          alt="Cart Icon"
                          className="inline-block w-6 h-6"
                        ></img>
                      </span>
                      Add to Cart
                    </button>
                  )}
                </div>
                <span className="text-rose-400">{item.category}</span>
                <h2 className="font-bold text-rose-900">{item.name}</h2>
                <span className="text-red font-semibold text-lg">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <section className="bg-white p-6 w-full lg:w-96 mb-2 lg:mb-0 lg:ml-4 rounded-2xl shadow-md self-start">
          <h1 className="font-bold text-rose-600 text-xl mb-4">
            Your Cart ({totalItems})
          </h1>
          {Object.entries(selectedProducts).length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 p-4">
              <img
                src="/assets/images/illustration-empty-cart.svg"
                alt="Cart Icon"
              />
              <p className="text-rose-400 font-semibold">
                Your added items will appear here
              </p>
            </div>
          ) : (
            <>
              <ul className="flex flex-col divide-y divide-gray-100">
                {Object.entries(selectedProducts).map(([id, quantity]) => {
                  const product = data.find((item) => item.id === Number(id));
                  return (
                    <li
                      key={id}
                      className="flex items-center justify-between py-4"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-gray-800">
                          {product.name}
                        </span>
                        <div className="flex gap-3 text-sm">
                          <span className="font-bold text-rose-600">
                            {quantity}x
                          </span>
                          <span className="text-gray-500">
                            @ ${product.price.toFixed(2)}
                          </span>
                          <span className="font-semibold text-gray-600">
                            ${(product.price * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedProducts((prev) => {
                            const copy = { ...prev };
                            delete copy[id];
                            return copy;
                          });
                        }}
                        aria-label={`Remove ${product.name} from cart`}
                        className="w-5 h-5 cursor-pointer rounded-full border border-gray-400 flex items-center justify-center text-gray-400 hover:border-gray-700 hover:text-gray-700 transition-colors shrink-0"
                      >
                        <img src="/assets/images/icon-remove-item.svg" alt="" />
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center justify-between py-4">
                <span className="text-sm text-gray-600">Order Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  $
                  {Object.entries(selectedProducts)
                    .reduce((sum, [id, quantity]) => {
                      const product = data.find((item) => item.id === Number(id));
                      return sum + product.price * quantity;
                    }, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-rose-50 rounded-lg py-3 px-4 mb-4">
                <img
                  src="/assets/images/icon-carbon-neutral.svg"
                  alt="Carbon Neutral"
                  className="w-5 h-5"
                />
                <p className="text-sm text-gray-700">
                  This is a <span className="font-semibold">carbon-neutral</span>{" "}
                  delivery
                </p>
              </div>
              <button
                onClick={() => setShowConfirmation(true)}
                className="w-full cursor-pointer bg-rose-600 hover:bg-rose-700 text-white font-semibold py-4 rounded-full transition-colors"
              >
                Confirm Order
              </button>
            </>
          )}
        </section>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 landscape:p-0">
          {
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm md:max-w-lg lg:max-w-xl text-center max-h-[90vh] overflow-y-auto mx-2">
              <img
                src="/assets/images/icon-order-confirmed.svg"
                alt="Confirmation"
              />
              <div className="flex flex-col gap-2 mt-4 text-left">
                <h1 className="text-4xl font-bold text-left">
                  Order <br /> Confirmed
                </h1>
                <p className="text-base text-gray-700">
                  We hope you enjoy your food!
                </p>
              </div>
              <ul className="bg-rose-100 divide-y divide-gray-200 mt-6 p-4 rounded-lg">
                {Object.entries(selectedProducts).map(([id, quantity]) => {
                  const product = data.find((item) => item.id === Number(id));
                  return (
                    <li
                      key={id}
                      className="flex items-center justify-between py-2"
                    >
                      <img
                        src={product.image.thumbnail}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg"
                      />
                      <div className="flex-1 ml-2 text-left p-2">
                        <span className="font-semibold">{product.name}</span>
                        <div className="flex gap-2 text-sm mt-1">
                          <span className="text-red font-semibold">
                            {quantity}x
                          </span>
                          <span className="text-gray-700">
                            @ ${product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <span className="font-semibold">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </li>
                  );
                })}
                <div className="flex items-center justify-between mt-4 w-full p-4">
                  <span>Order Total</span>
                  <span className="text-2xl font-bold">
                    $
                    {Object.entries(selectedProducts)
                      .reduce((sum, [id, quantity]) => {
                        const product = data.find(
                          (item) => item.id === Number(id),
                        );
                        return sum + product.price * quantity;
                      }, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </ul>
              <button
                className="w-full cursor-pointer bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full p-3 mt-4"
                onClick={() => {
                  setSelectedProducts({});
                  setShowConfirmation(false);
                }}
              >
                Start New Order
              </button>
            </div>
          }
        </div>
      )}
    </main>
  );
}

export default App;
