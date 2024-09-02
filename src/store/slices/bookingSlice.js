import { createSlice } from '@reduxjs/toolkit';

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        vehicleID: null,
        serviceID: null,
        providerID: null,
        dateTime: {
            date: null,
            time: null,
        },
    },
    reducers: {
        setVehicleID: (state, action) => {
            state.vehicleID = action.payload;
        },
        setServiceID: (state, action) => {
            state.serviceID = action.payload;
        },
        setProviderID: (state, action) => {
            state.providerID = action.payload;
        },
        setTime: (state, action) => {
            state.dateTime.date = action.payload.date;
            state.dateTime.time = action.payload.time;
        },
        clearBooking: (state) => {
            state.vehicleID = null;
            state.serviceID = null;
            state.providerID = null;
            state.dateTime = {
                date: null,
                time: null,
            };
        },
    },
});

export const { setVehicleID, setServiceID, setProviderID, setTime, clearBooking } = bookingSlice.actions;

export default bookingSlice.reducer;