// store.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'; // combined reducers
import rootSaga from './sagas'; // <- your root saga

// 1. Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// 2. Configure store with saga middleware
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, 
      serializableCheck: false, 
    }).concat(sagaMiddleware),
});

// 3. Run the root saga
sagaMiddleware.run(rootSaga);

// 4. Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
