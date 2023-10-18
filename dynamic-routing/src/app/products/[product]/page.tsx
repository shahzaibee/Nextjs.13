import { log } from "console";
import React from "react";

const Product = async ({ params }: { params: { product: string } }) => {
  const fetchData = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.product}`
  );
  const res = await fetchData.json();
  return (
    <div>
      product page Dynamic
      <h1 className="mt-10">Route: {params.product}</h1>
      <p className="mt-10">{res.id}</p>
      <p className="mt-10">{res.title}</p>
      <p className="mt-10">{res.body}</p>
    </div>
  );
};

export default Product;
