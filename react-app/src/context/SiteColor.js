import React, { useContext, useState, createContext } from 'react';
import ReactDOM from 'react-dom';

const SiteColorContext = createContext();

export function SiteColorProvider({ children }) {
	const [siteColor, setSiteColor] = useState('green');

	return (
		<SiteColorContext.Provider
			value={{
				siteColor,
				setSiteColor
			}}
		>
			{children}
		</SiteColorContext.Provider>
	);
}

const useSiteColorContext = () => useContext(SiteColorContext);

export default useSiteColorContext;
