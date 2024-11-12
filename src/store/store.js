import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { getListReducer } from './getListReducer.js';
import { updateExpirationTimeReducer } from './updateExpirationTime.js';
import { getDetailsReducer } from './getDetailsReducer.js';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['workerList', 'workerDetails', 'expirationTime'],
};

const rootReducer = combineReducers({
  workerList: getListReducer,
  workerDetails: getDetailsReducer,
  expirationTime: updateExpirationTimeReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
export default store;
