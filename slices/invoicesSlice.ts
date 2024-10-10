import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Invoice } from '../hold/types';

interface InvoicesState {
  invoices: Invoice[];
}

const initialState: InvoicesState = {
  invoices: [],
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoices.push(action.payload);
    },
    updateInvoice: (state, action: PayloadAction<Invoice>) => {
      const index = state.invoices.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
    },
    deleteInvoice: (state, action: PayloadAction<string>) => {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload
      );
    },
    updateInvoiceStatus: (
      state,
      action: PayloadAction<{ id: string; status: 'draft' | 'sent' | 'paid' }>
    ) => {
      const invoice = state.invoices.find(
        (invoice) => invoice.id === action.payload.id
      );
      if (invoice) {
        invoice.status = action.payload.status;
      }
    },
  },
});

export const { addInvoice, updateInvoice, deleteInvoice, updateInvoiceStatus } =
  invoicesSlice.actions;
export default invoicesSlice.reducer;
