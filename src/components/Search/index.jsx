import React, { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import imgSearch from "./imgs/search.png";
import imgCross from "./imgs/cross.png";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search = () => {
	const [value, setValue] = useState("");

	const dispatch = useDispatch();

	const inputRef = React.useRef();

	const onClickClear = () => {
		dispatch(setSearchValue(""));
		setValue("");
		inputRef.current.focus();
	};

	const updateSearchValue = useCallback(
		debounce(str => {
			console.log(str);
			dispatch(setSearchValue(str));
		}, 250),
		[]
	);

	const onChangeInput = event => {
		console.log(event);
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<div className={styles.root}>
			<img className={styles.iconSearch} src={imgSearch} alt="" />
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				type="text"
				placeholder="Поиск пиццы..."
			/>
			{value && (
				<img
					onClick={() => onClickClear()}
					className={styles.iconCross}
					src={imgCross}
					alt=""
				/>
			)}
		</div>
	);
};

export default Search;
