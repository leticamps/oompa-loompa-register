import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store/store';
import List from './components/List';
import Details from './components/Details';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<List />} />
          <Route path="/:id" exact element={<Details />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
