'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../hold/store';
import { addInvoice } from '../slices/invoicesSlice';
import {
  Input,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/index';
import { InvoiceItem, Invoice } from '../hold/types';
import {
  formatCurrency,
  generateInvoiceNumber,
  calculateDueDate,
} from '../hold/utils';
import { DEFAULT_INVOICE_DUE_DAYS, MAX_INVOICE_ITEMS } from '../hold/constants';

export function CreateInvoice() {
  const dispatch = useDispatch();
  const clients = useSelector((state: RootState) => state.clients.clients);
  const products = useSelector((state: RootState) => state.products.products);

  const [invoice, setInvoice] = useState<
    Omit<Invoice, 'id' | 'total' | 'status'>
  >({
    clientId: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: calculateDueDate(
      new Date().toISOString().split('T')[0],
      DEFAULT_INVOICE_DUE_DAYS
    ),
    items: [],
  });

  const [currentItem, setCurrentItem] = useState<InvoiceItem>({
    productId: '',
    quantity: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentItem({
      ...currentItem,
      [e.target.name]: parseInt(e.target.value, 10),
    });
  };

  const addItem = () => {
    if (invoice.items.length >= MAX_INVOICE_ITEMS) {
      alert(`Maximum of ${MAX_INVOICE_ITEMS} items allowed per invoice.`);
      return;
    }
    setInvoice({
      ...invoice,
      items: [...invoice.items, currentItem],
    });
    setCurrentItem({ productId: '', quantity: 1 });
  };

  const calculateTotal = () => {
    return invoice.items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = calculateTotal();
    dispatch(
      addInvoice({
        id: generateInvoiceNumber(),
        ...invoice,
        total,
        status: 'draft',
      })
    );
    setInvoice({
      clientId: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: calculateDueDate(
        new Date().toISOString().split('T')[0],
        DEFAULT_INVOICE_DUE_DAYS
      ),
      items: [],
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          value={invoice.clientId}
          onValueChange={(value) => setInvoice({ ...invoice, clientId: value })}
        >
          <SelectTrigger className="w-full bg-white border-black">
            <SelectValue placeholder="Select Client" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="date"
          name="date"
          value={invoice.date}
          onChange={handleChange}
          required
          className="bg-white border-black"
        />
        <Input
          type="date"
          name="dueDate"
          value={invoice.dueDate}
          onChange={handleChange}
          required
          className="bg-white border-black"
        />
        <div className="space-y-2">
          <h3 className="font-bold">Items</h3>
          {invoice.items.map((item, index) => {
            const product = products.find((p) => p.id === item.productId);
            return (
              <div key={index} className="flex items-center space-x-2">
                <span>{product?.name}</span>
                <span>x {item.quantity}</span>
                <span>
                  = {formatCurrency((product?.price || 0) * item.quantity)}
                </span>
              </div>
            );
          })}
          <div className="flex items-center space-x-2">
            <Select
              value={currentItem.productId}
              onValueChange={(value) =>
                setCurrentItem({ ...currentItem, productId: value })
              }
            >
              <SelectTrigger className="w-full bg-white border-black">
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              name="quantity"
              value={currentItem.quantity}
              onChange={handleItemChange}
              min="1"
              className="w-20 bg-white border-black"
            />
            <Button
              type="button"
              onClick={addItem}
              className="bg-black text-white hover:bg-gray-800"
            >
              Add Item
            </Button>
          </div>
        </div>
        <div className="font-bold">
          Total: {formatCurrency(calculateTotal())}
        </div>
        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Create Invoice
        </Button>
      </form>
    </div>
  );
}
