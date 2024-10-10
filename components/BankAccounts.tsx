'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../hold/store';
import {
  addBankAccount,
  setActiveAccount,
} from '../slices/bankAccountsSlice';
import { Input, Button, Switch } from './ui/index';
import { BankAccount } from '../hold/types';

export function BankAccounts() {
  const dispatch = useDispatch();
  const bankAccounts = useSelector(
    (state: RootState) => state.bankAccounts.accounts
  );
  const [newAccount, setNewAccount] = useState<
    Omit<BankAccount, 'id' | 'isActive'>
  >({
    bankName: '',
    accountNumber: '',
    ifscCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addBankAccount({
        id: Date.now().toString(),
        ...newAccount,
        isActive: bankAccounts.length === 0, // Set as active if it's the first account
      })
    );
    setNewAccount({ bankName: '', accountNumber: '', ifscCode: '' });
  };

  const toggleActive = (id: string) => {
    dispatch(setActiveAccount(id));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <Input
          name="bankName"
          placeholder="Bank Name"
          value={newAccount.bankName}
          onChange={handleChange}
          required
          className="bg-white border-black"
        />
        <Input
          name="accountNumber"
          placeholder="Account Number"
          value={newAccount.accountNumber}
          onChange={handleChange}
          required
          pattern="[0-9]{9,18}"
          className="bg-white border-black"
        />
        <Input
          name="ifscCode"
          placeholder="IFSC Code"
          value={newAccount.ifscCode}
          onChange={handleChange}
          required
          pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
          className="bg-white border-black"
        />
        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Add Bank Account
        </Button>
      </form>
      <div className="space-y-4">
        {bankAccounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between p-4 border border-black rounded bg-white"
          >
            <div>
              <p className="font-bold">{account.bankName}</p>
              <p>Account: {account.accountNumber}</p>
              <p>IFSC: {account.ifscCode}</p>
            </div>
            <Switch
              checked={account.isActive}
              onCheckedChange={() => toggleActive(account.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
