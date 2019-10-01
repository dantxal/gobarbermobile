import AsyncStorate from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber',
      storage: AsyncStorate,
      whitelist: ['auth', 'user'],
    },
    reducers,
  );
  return persistedReducer;
};
