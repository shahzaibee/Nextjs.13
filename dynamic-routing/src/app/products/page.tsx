import Link from "next/link";
import { it } from "node:test";
import React from "react";

const Products = async () => {
  const fetchData = await fetch("https://jsonplaceholder.typicode.com/posts");
  const res = await fetchData.json();

  return (
    <div >
      <ol>
        {res.map((item: any, i: number) => {
          return (
            <li key={i}>
              <Link href={`/products/${item.id}`}>
                <p>{item.title}</p>{" "}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Products;
