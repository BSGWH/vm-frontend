import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './slices/bookingSlice';

const rootReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
        state = undefined;
    }
    return bookingReducer(state, action);
};

export const store = configureStore({
    reducer: {
        booking: rootReducer,
    },
});

// In dev environment, reset Redux every restart
if (process.env.NODE_ENV === 'development') {
    store.dispatch({ type: 'RESET_STORE' });
}
