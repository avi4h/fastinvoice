import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Company } from '../hold/types';

const initialState: Company = {
  companyName: '',
  address: '',
  state: '',
  stateCode: '',
  email: '',
  contactNumber: '',
  gstin: '',
  panNumber: '',
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    updateCompanyDetails: (state, action: PayloadAction<Partial<Company>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateCompanyDetails } = companySlice.actions;
export default companySlice.reducer;
