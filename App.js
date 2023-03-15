import React from 'react';
import AuthProvider from './AuthProvider';

import Main from './Main';

const App = () => {

  return (
    <AuthProvider>
      <Main/>
    </AuthProvider>
  );
};

export default App;
