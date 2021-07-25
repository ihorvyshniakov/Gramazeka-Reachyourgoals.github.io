import React, { useContext } from 'react';
import {sortOptions, viewOptions} from '../Helpers/Constants/constants';
import { GlobalContext } from '../Helpers/Context/Context';

import './FilterSort.css';

const FilterSort = () => {
	const globalContext = useContext(GlobalContext);
	// viewType, viewSortType;

	const changeSortTypeHandler = () => {
		if(globalContext.sortType == sortOptions.lowFirst){
			globalContext.setSortType(sortOptions.highFirst)
		} else {
			globalContext.setSortType(sortOptions.lowFirst)
		}
	}

	const changeViewTypeHandler = () => {
		if(globalContext.viewType == viewOptions.little){
			globalContext.setViewType(viewOptions.many)
		} else {
			globalContext.setViewType(viewOptions.little)
		}
	}

	return (
		<div className="filterSort">
			<div className="sorting r5 hover" onClick={changeSortTypeHandler}>
				<i className={`fa fa-sort-amount-${globalContext.sortType === sortOptions.highFirst ? 'desc' : 'asc'}`} aria-hidden="true"></i>
			</div>
			<div className="view r5 hover" onClick={changeViewTypeHandler}>
				<i className={`fa ${globalContext.viewType === viewOptions.little ? 'fa-pause' : 'fa-th'}`} aria-hidden="true"></i>
			</div>
		</div>
	)
}

export default FilterSort;