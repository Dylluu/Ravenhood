import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { SiteColorProvider } from './context/SiteColor';
import { StockCurrentPriceProvider } from './context/stockCurrentPrice';

const store = configureStore();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<StockCurrentPriceProvider>
				<SiteColorProvider>
					<ModalProvider>
						<App />
					</ModalProvider>
				</SiteColorProvider>
			</StockCurrentPriceProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
