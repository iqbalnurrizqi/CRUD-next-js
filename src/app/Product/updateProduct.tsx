"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type product = {
    id: number;
    title: string;
    price: number;
  };

export default function UpdateProduct(product: product) {
  const [modal, setModal] = useState(false);
const [title, setTitle] = useState(product.title);
const [price, setPrice] = useState(product.price);
const [isMutating, setIsMutating] = useState(false);

const router = useRouter();

    async function handleUpdate(e:SyntheticEvent) {
        e.preventDefault();
        setIsMutating(true);
        await fetch(`http://localhost:5000/product/${product.id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price: price
            })
        });

        setIsMutating(false);

        router.refresh();
        setModal(false);
    }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Edit 
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {product.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold ">Title</label>
              <input
                type="text"
                className="input w-full input-border bg-slate-700"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                className="input w-full input-border bg-slate-700"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Price"
              />
            </div>
            <div className="modal-action">
              <button type="button" onClick={handleChange} className="btn">
                Close
              </button>
              {!isMutating ? (
              <button type="submit" className="btn btn-primary">
                update
              </button>
              ) : (
              <button type="button" className="btn loading">
                Updating...
              </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

