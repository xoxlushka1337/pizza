import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import { useSelector } from "react-redux";

const Pagination = ({ onChangePage }) => {
	const pageCount = useSelector(state => state.filterSlice.pageCount);
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={event => onChangePage(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={pageCount - 1}
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;
