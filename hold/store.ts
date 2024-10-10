import { configureStore } from '@reduxjs/toolkit';
import companyReducer from '../slices/companySlice';
import bankAccountsReducer from '../slices/bankAccountsSlice';
import clientsReducer from '../slices/clientsSlice';
import products from '../slices/productsSlice';
import invoicesReducer from '../slices/invoicesSlice';
import uiReducer from '../slices/uiSlice';

export const store = configureStore({
  reducer: {
    company: companyReducer,
    bankAccounts: bankAccountsReducer,
    clients: clientsReducer,
    products: products,
    invoices: invoicesReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
