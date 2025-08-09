import ReactPaginate from "react-paginate";

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <ReactPaginate
      containerClassName="pagination mt-3 d-flex justify-content-center gap-2"
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      activeClassName="active"
      disabledClassName="disabled"
      pageClassName="page"
      pageLinkClassName="page-link"
      previousClassName="page"
      previousLinkClassName="page-link align-vertical"
      nextClassName="page"
      nextLinkClassName="page-link align-vertical"
      breakClassName="page"
      breakLinkClassName="page-link"
    />
  );
};

export default Pagination;
