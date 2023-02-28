import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const PaginationComponent = ({
  categoryName,
  searchQuery,
  paginationLinksNumber,
  pageNum,
}) => {
  //console.log(categoryName, searchQuery, paginationLinksNumber, pageNum);

  const category = categoryName ? `category/${categoryName}/` : "";
  const search = searchQuery ? `category/${searchQuery}/` : "";
  const url = `/product-list/${category}${search}`;
  return (
    <>
      <Pagination>
        {/*<Pagination.First />*/}
        <LinkContainer to={`${url}${pageNum - 1}`}>
          <Pagination.Prev disabled={pageNum === 1} />
        </LinkContainer>
        {[...Array(paginationLinksNumber).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={`${url}${x + 1}`}
            active={x + 1 === pageNum}
          >
            <Pagination.Item>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
        {/* <Pagination.Item active>{1}</Pagination.Item>*/}

        {/*<Pagination.Ellipsis />*/}

        <LinkContainer to={`${url}${pageNum + 1}`}>
          <Pagination.Next disabled={pageNum === paginationLinksNumber} />
        </LinkContainer>
        {/* <Pagination.Last />*/}
      </Pagination>
    </>
  );
};

export default PaginationComponent;
