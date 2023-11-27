import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import ReduxThunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import rootReducer, { rootSaga } from './slices';
import RootStack from './screens/RootStack';
import Snackbar from './containers/common/Snackbar';
import { showSnackbar } from './slices/common';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
	reducer: rootReducer,
	middleware: [ReduxThunk, sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

function App() {
	// FCM Foreground
	useEffect(() => {
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			store.dispatch(showSnackbar(remoteMessage.notification.body));
		});

		return unsubscribe;
	}, []);

	return (
		<Provider store={store}>
			<NavigationContainer>
				<RootStack />
			</NavigationContainer>
			<Snackbar />
		</Provider>
	);
}

export default App;