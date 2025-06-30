import ReactPaginate from "react-paginate";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={1}
      marginPagesDisplayed={1} // Show first and last page
      pageCount={totalPages}
      forcePage={currentPage - 1} // Important for controlled component
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      activeClassName="active"
      disabledClassName="disabled"
    />
  );
};

export default Pagination;
