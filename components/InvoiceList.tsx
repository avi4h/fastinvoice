'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../hold/store';
import { deleteInvoice, updateInvoiceStatus } from '../slices/invoicesSlice';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/index';
import { formatCurrency } from '../hold/utils';
import { INVOICE_STATUS } from '../hold/constants';

export function InvoiceList() {
  const dispatch = useDispatch();
  const invoices = useSelector((state: RootState) => state.invoices.invoices);
  const clients = useSelector((state: RootState) => state.clients.clients);

  const handleDelete = (id: string) => {
    dispatch(deleteInvoice(id));
  };

  const handleStatusChange = (
    id: string,
    status: 'draft' | 'sent' | 'paid'
  ) => {
    dispatch(updateInvoiceStatus({ id, status }));
  };

  const getClientName = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    return client ? client.name : 'Unknown Client';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="p-4 border border-black rounded bg-white"
          >
            <h3 className="font-bold">Invoice #{invoice.id}</h3>
            <p>Client: {getClientName(invoice.clientId)}</p>
            <p>Date: {invoice.date}</p>
            <p>Due Date: {invoice.dueDate}</p>
            <p>Total: {formatCurrency(invoice.total)}</p>
            <div className="flex items-center mt-2">
              <Select
                value={invoice.status}
                onValueChange={(value: 'draft' | 'sent' | 'paid') =>
                  handleStatusChange(invoice.id, value)
                }
              >
                <SelectTrigger className="w-[180px] bg-white border-black">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(INVOICE_STATUS).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => handleDelete(invoice.id)}
                className="ml-2 bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
