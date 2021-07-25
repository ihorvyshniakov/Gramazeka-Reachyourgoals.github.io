import React, { useContext } from 'react';

import './Order.css';

import {isShowOnPage} from '../Helpers/Constants/constants';
import FilterSort from '../FilterSort/FilterSort';
import ItemsList from '../ItemsList/ItemsList';
import { GlobalContext } from '../Helpers/Context/Context';

const Order = () => {
	const globalContext = useContext(GlobalContext);

	return (
		<>
			{isShowOnPage.order.filterSort && <FilterSort/>}
			<ItemsList isShowForOrder={true} order={true}/>
			<div className="total r5">
				<pre className="text">Total: <span className="value">{
					globalContext.ordersList.reduce((sum, el) => {
						return sum + el.price
					}, 0)
				}</span>$</pre>
			</div>
		</>
	)
}

export default Order;