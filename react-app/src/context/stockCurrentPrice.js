import React, { useContext, useState, createContext } from 'react';
import ReactDOM from 'react-dom';

const StockCurrentPrice = createContext();

export function StockCurrentPriceProvider({ children }) {
	const [priceContext, setPriceContext] = useState(-1);
	const [portfolioValue, setPortfolioWorth] = useState(0);

	return (
		<StockCurrentPrice.Provider
			value={{
				priceContext,
				setPriceContext,
				portfolioValue,
				setPortfolioWorth
			}}
		>
			{children}
		</StockCurrentPrice.Provider>
	);
}

const useStockPriceContext = () => useContext(StockCurrentPrice);

export default useStockPriceContext;
