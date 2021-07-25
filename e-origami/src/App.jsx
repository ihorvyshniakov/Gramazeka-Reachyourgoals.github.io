import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Favorites from './components/Favorites/Favorites';
import Order from './components/Order/Order';
import { ViewContextProvider } from './components/Helpers/Context/Context';

import './App.css';

const App = () => {
  return (
	<BrowserRouter>
		<ViewContextProvider>
				<div className="App">
					<Header/>
					<main>
						<div className="container r10">
							<Route path='/home' component={Home}/>
							<Route path='/favorites' component={Favorites}/>
							<Route path='/order' component={Order}/>
						</div>
					</main>
				</div>
		</ViewContextProvider>
	</BrowserRouter>
  );
}

export default App;
