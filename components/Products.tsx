'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../hold/store';
import {
  addProduct,
  deleteProduct,
} from '../slices/productsSlice';
import { Input, Button, Textarea } from './ui/index';
import { Product } from '../hold/types';
import { formatCurrency } from '../hold/utils';

export function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    unit: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value =
      e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value;
    setNewProduct({ ...newProduct, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addProduct({
        id: Date.now().toString(),
        ...newProduct,
      })
    );
    setNewProduct({ name: '', description: '', price: 0, unit: '' });
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <Input
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
          required
          className="bg-white border-black"
        />
        <Textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
          className="bg-white border-black"
        />
        <Input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          required
          className="bg-white border-black"
        />
        <Input
          name="unit"
          placeholder="Unit (e.g., pcs, kg, liter)"
          value={newProduct.unit}
          onChange={handleChange}
          required
          className="bg-white border-black"
        />
        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Add Product
        </Button>
      </form>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border border-black rounded bg-white"
          >
            <h3 className="font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p>
              Price: {formatCurrency(product.price)} per {product.unit}
            </p>
            <Button
              onClick={() => handleDelete(product.id)}
              className="mt-2 bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
