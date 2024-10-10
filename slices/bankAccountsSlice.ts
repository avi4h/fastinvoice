import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BankAccount } from '../hold/types';

interface BankAccountsState {
  accounts: BankAccount[];
}

const initialState: BankAccountsState = {
  accounts: [],
};

const bankAccountsSlice = createSlice({
  name: 'bankAccounts',
  initialState,
  reducers: {
    addBankAccount: (state, action: PayloadAction<BankAccount>) => {
      state.accounts.push(action.payload);
    },
    updateBankAccount: (state, action: PayloadAction<BankAccount>) => {
      const index = state.accounts.findIndex(
        (account) => account.id === action.payload.id
      );
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
    },
    deleteBankAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload
      );
    },
    setActiveAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.map((account) => ({
        ...account,
        isActive: account.id === action.payload,
      }));
    },
  },
});

export const {
  addBankAccount,
  updateBankAccount,
  deleteBankAccount,
  setActiveAccount,
} = bankAccountsSlice.actions;
export default bankAccountsSlice.reducer;
