import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import ItemsList from "../AllProducts/itemsList";


// Main pagination component
function PaginatedItems({ itemsPerPage, data, type, column }: any) {
  // An example array of 150 items (replace with your actual data)
  const items: any = data

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Calculate the slice of items to display for the current page
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    // Calculate the total number of pages
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  // Invoke when the user clicks to request another page
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ItemsList currentItems={currentItems} type={type} column={column} />
      <div className='w-100 mt-5'>
        <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default PaginatedItems;
