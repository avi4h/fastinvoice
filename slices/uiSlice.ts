import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  activeSection: string;
  sidebarOpen: boolean;
}

const initialState: UIState = {
  activeSection: 'company',
  sidebarOpen: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { setActiveSection, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
