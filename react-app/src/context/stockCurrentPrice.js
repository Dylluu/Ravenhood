import React, { useContext, useState, createContext } from 'react';
import ReactDOM from 'react-dom';

const StockCurrentPrice = createContext();

export function StockCurrentPriceProvider({ children }) {
	const [priceContext, setPriceContext] = useState(-1);

	return (
		<StockCurrentPrice.Provider
			value={{
				priceContext,
				setPriceContext
			}}
		>
			{children}
		</StockCurrentPrice.Provider>
	);
}

const useStockPriceContext = () => useContext(StockCurrentPrice);

export default useStockPriceContext;
