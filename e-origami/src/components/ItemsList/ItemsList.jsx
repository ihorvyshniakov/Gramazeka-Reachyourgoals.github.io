import React, { useContext } from 'react';

import { GlobalContext } from '../Helpers/Context/Context';
import { sortOptions, viewOptions } from '../Helpers/Constants/constants';
import { posts } from '../Helpers/Data';

import './ItemsList.css';

// TODO: Refactor this code, cause using component inside component

const ItemsList = ({isShowForOrder, home, favorites, order}) => {
	const globalContext = useContext(GlobalContext);
	
	const likesListHandler = (el) => {
		// if there's no such item -> add it
		if(!globalContext.likedList.some(item => item.id == el.id)){
			globalContext.setLikedList([...globalContext.likedList, el]);
		} else {
			// otherwise -> remove it
			let filteredList = globalContext.likedList.filter(item => item.id != el.id);
			globalContext.setLikedList(filteredList);
		}
	}
	
	const ordersListHandler = (el) => {
		// if there's no such item -> add it
		if(!globalContext.ordersList.some(item => item.id == el.id)){
			globalContext.setOrdersList([...globalContext.ordersList, el]);
		} else {
			// otherwise -> remove it
			let filteredList = globalContext.ordersList.filter(item => item.id != el.id);
			globalContext.setOrdersList(filteredList);
		}
	}

	const showArrayOfElements = (array) => {
		return array.map(el => (
			<div className="item r5">
				<div className="img">image #{el.id}</div>
				<div className="buttons">
					<div className={`favorite ${el.favorite ? 'added' : 'removed'}`}>
						<i className={`fa fa-heart${
							globalContext.likedList.some(item => item.id == el.id)
							? ''
							: '-o'
						} hover active`} 
							onClick={() => likesListHandler(el)}
							aria-hidden="true"></i>
					</div>
					<p className="price">{el.price}$</p>
					<div className="order">
						<i className={`fa fa-${
							globalContext.ordersList.some(item => item.id == el.id)
							? order ? 'times' : 'shopping-cart'
							: 'shopping-basket'
						} hover`}
							onClick={() => ordersListHandler(el)} 
							aria-hidden="true"></i>
					</div>
				</div>
			</div>
		))
	}

	const ChoosePage = () => {
		if(home){
			return globalContext.sortType === sortOptions.lowFirst
				? showArrayOfElements(posts.sort((a,b) => a.price - b.price))
				: showArrayOfElements(posts.sort((a,b) => b.price - a.price))
		} else if(favorites){
			return globalContext.sortType === sortOptions.lowFirst
				? showArrayOfElements(globalContext.likedList.sort((a,b) => a.price - b.price))
				: showArrayOfElements(globalContext.likedList.sort((a,b) => b.price - a.price))
		} else if(order){
			return showArrayOfElements(globalContext.ordersList)
		}
	}

	return (
		// just add class "line" for order page
		<div className={`list scroll ${globalContext.viewType == viewOptions.little ? 'little' : 'many'} ${isShowForOrder && 'line'}`}>
			<ChoosePage/>
		</div>
	)
}

export default ItemsList;