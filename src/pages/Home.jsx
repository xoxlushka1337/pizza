import React from "react";
import Pagination from "../components/Pagination";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { AppContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setPageCount } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

const Home = () => {
	const dispatch = useDispatch();
	const categoryId = useSelector(state => state.filterSlice.categoryId);
	const sortType = useSelector(state => state.filterSlice.sort.sortProperty);
	const pageCount = useSelector(state => state.filterSlice.pageCount);
	const { items, status } = useSelector(state => state.pizzasSlice);

	const { searchValue } = React.useContext(AppContext);

	const onChangeCategory = id => {
		dispatch(setCategoryId(id));
	};

	const getPizzas = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const sortBy = sortType.replace("-", "");
		const order = sortType.includes("-") ? "asc" : "desc";
		const search = searchValue ? `search=${searchValue}` : "";

		dispatch(
			fetchPizzas({
				category,
				sortBy,
				order,
				search,
				pageCount,
			})
		);
		window.scroll(0, 0);
	};

	React.useEffect(() => {
		getPizzas();
	}, [categoryId, sortType, searchValue, pageCount]);

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
				{status === "loading"
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
			<Pagination onChangePage={number => dispatch(setPageCount(number))} />
		</div>
	);
};

export default Home;
