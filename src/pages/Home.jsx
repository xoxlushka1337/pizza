import React from "react";
import Pagination from "../components/Pagination";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { AppContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

const Home = () => {
	const dispatch = useDispatch();
	const categoryId = useSelector(state => state.filterSlice.categoryId);
	const sortType = useSelector(state => state.filterSlice.sort.sortProperty);

	const { searchValue } = React.useContext(AppContext);
	const [items, setItems] = React.useState([]);
	const [isLoad, setIsLoad] = React.useState(true);
	const [currentPage, setCurrentPage] = React.useState(1);

	const onChangeCategory = id => {
		dispatch(setCategoryId(id));
	};

	React.useEffect(() => {
		setIsLoad(true);

		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const sortBy = sortType.replace("-", "");
		const order = sortType.includes("-") ? "asc" : "desc";
		const search = searchValue ? `search=${searchValue}` : "";

		fetch(
			`https://6470c3d33de51400f724e622.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`
		)
			.then(res => {
				return res.json();
			})
			.then(json => {
				setItems(json);
				setIsLoad(false);
			});
		window.scroll(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]);

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					value={categoryId}
					onClickCategory={i => onChangeCategory(i)}
				/>
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoad
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
			<Pagination onChangePage={number => setCurrentPage(number)} />
		</div>
	);
};

export default Home;
