'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../hold/store';
import { updateCompanyDetails } from '../slices/companySlice';
import {
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  ScrollArea,
} from './ui/index';
import { INDIAN_STATES } from '../hold/constants';

export function CompanyDetails() {
  const dispatch = useDispatch();
  const companyDetails = useSelector((state: RootState) => state.company);

  useEffect(() => {
    if (companyDetails.state) {
      const selectedState = INDIAN_STATES.find(
        (state) => state.name === companyDetails.state
      );
      if (selectedState) {
        dispatch(updateCompanyDetails({ stateCode: selectedState.code }));
      }
    }
  }, [companyDetails.state, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(updateCompanyDetails({ [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Additional logic can be added here if needed
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <Input
        name="companyName"
        placeholder="Company Name"
        value={companyDetails.companyName}
        onChange={handleChange}
        required
        className="bg-white border-black"
      />
      <Textarea
        name="address"
        placeholder="Address"
        value={companyDetails.address}
        onChange={handleChange}
        required
        className="bg-white border-black"
      />
      <Select
        name="state"
        value={companyDetails.state}
        onValueChange={(value) =>
          dispatch(updateCompanyDetails({ state: value }))
        }
      >
        <SelectTrigger className="bg-white border-black">
          <SelectValue placeholder="Select State" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-[200px]">
            {INDIAN_STATES.map((state) => (
              <SelectItem key={state.name} value={state.name}>
                {state.name}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <Input
        name="stateCode"
        placeholder="State Code"
        value={companyDetails.stateCode}
        readOnly
        className="bg-gray-100 border-black"
      />
      <Input
        name="email"
        type="email"
        placeholder="Email-ID"
        value={companyDetails.email}
        onChange={handleChange}
        required
        className="bg-white border-black"
      />
      <Input
        name="contactNumber"
        placeholder="Contact Number"
        value={companyDetails.contactNumber}
        onChange={handleChange}
        required
        pattern="[0-9]{10}"
        className="bg-white border-black"
      />
      <Input
        name="gstin"
        placeholder="GSTIN"
        value={companyDetails.gstin}
        onChange={handleChange}
        required
        pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
        className="bg-white border-black"
      />
      <Input
        name="panNumber"
        placeholder="PAN Number"
        value={companyDetails.panNumber}
        onChange={handleChange}
        required
        pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
        className="bg-white border-black"
      />
      <Button
        type="submit"
        className="w-full bg-black text-white hover:bg-gray-800"
      >
        Save Company Details
      </Button>
    </form>
  );
}
