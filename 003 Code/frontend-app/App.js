import React from 'react';
import createSagaMiddleware from 'redux-saga';
import ReduxThunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import rootReducer, { rootSaga } from './slices';
import RootStack from './screens/RootStack';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
	reducer: rootReducer,
	middleware: [ReduxThunk, sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<RootStack />
			</NavigationContainer>
		</Provider>
	);
}

export default App;