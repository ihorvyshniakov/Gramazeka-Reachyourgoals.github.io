import React, {useState} from 'react';

import { sortOptions, viewOptions } from '../Constants/constants';

export const ViewContextProvider = ({children}) => {
	const [sortType, setSortType] = useState(sortOptions.lowFirst);
	const [viewType, setViewType] = useState(viewOptions.little);
	const [likedList, setLikedList] = useState([]);
	const [ordersList, setOrdersList] = useState([]);
	
	const globalContext = {
		sortType, 
		setSortType, 
		viewType, 
		setViewType,
		likedList, 
		setLikedList,
		ordersList, 
		setOrdersList,
	};
	return (
		<GlobalContext.Provider value={globalContext}>
			{children}
		</GlobalContext.Provider>
	)
}

export const GlobalContext = React.createContext();