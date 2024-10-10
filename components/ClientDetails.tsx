'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../hold/store';
import { addClient, deleteClient } from '../slices/clientsSlice';
import { Input, Button, Textarea } from './ui/index';
import { Client } from '../hold/types';
import { validateGSTIN } from '../hold/utils';

export function ClientDetails() {
  const dispatch = useDispatch();
  const clients = useSelector((state: RootState) => state.clients.clients);
  const [newClient, setNewClient] = useState<Omit<Client, 'id'>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    gstin: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateGSTIN(newClient.gstin)) {
      alert('Invalid GSTIN format');
      return;
    }
    dispatch(
      addClient({
        id: Date.now().toString(),
        ...newClient,
      })
    );
    setNewClient({ name: '', email: '', phone: '', address: '', gstin: '' });
  };

  const handleDelete = (id: string) => {
    dispatch(deleteClient(id));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <Input
          name="name"
          placeholder="Client Name"
          value={newClient.name}
          onChange={handleChange}
          required
          className="bg-white border-black"
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={newClient.email}
          onChange={handleChange}
          required
          className="bg-white border-black"
        />
        <Input
          name="phone"
          placeholder="Phone"
          value={newClient.phone}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
          className="bg-white border-black"
        />
        <Textarea
          name="address"
          placeholder="Address"
          value={newClient.address}
          onChange={handleChange}
          required
          className="bg-white border-black"
        />
        <Input
          name="gstin"
          placeholder="GSTIN"
          value={newClient.gstin}
          onChange={handleChange}
          pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
          className="bg-white border-black"
        />
        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Add Client
        </Button>
      </form>
      <div className="space-y-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="p-4 border border-black rounded bg-white"
          >
            <h3 className="font-bold">{client.name}</h3>
            <p>Email: {client.email}</p>
            <p>Phone: {client.phone}</p>
            <p>Address: {client.address}</p>
            <p>GSTIN: {client.gstin}</p>
            <Button
              onClick={() => handleDelete(client.id)}
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
