import React from "react";
import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import { Route, Routes } from "react-router-dom";

export const AppContext = React.createContext();

function App() {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="*" element={<NotFound />} />
					<Route path="cart" element={<Cart />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
