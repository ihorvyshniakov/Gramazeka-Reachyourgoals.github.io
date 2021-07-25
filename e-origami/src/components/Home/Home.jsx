import React from 'react';

import {isShowOnPage} from '../Helpers/Constants/constants';
import FilterSort from '../FilterSort/FilterSort';
import ItemsList from '../ItemsList/ItemsList';

const Home = () => {
	return (
		<>
			{isShowOnPage.home.filterSort && <FilterSort />}
			<ItemsList home={true}/>
		</>
	)
}

export default Home;