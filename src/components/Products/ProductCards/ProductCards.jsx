import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

export default function ProductCards({ targetRef }) {
  const products = useSelector((state) => state.listItems.listItems);

  const [page, setPage] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const filters = useSelector((state) => state.filters.filters);
  const sort = useSelector((state) => state.filters.sort);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  useEffect(() => {
    let filteredProductsTemp = products?.filter((product) => {
      if (
        !filters?.authors?.length &&
        !filters?.publishers?.length &&
        !filters.search
      ) {
        return true;
      }

      const authorMatches = filters.authors.length
        ? filters.authors.includes(product.bookAuthor)
        : true;

      const publisherMatches = filters.publishers.length
        ? filters.publishers.includes(product.bookPublisher)
        : true;

      const searchMatches = filters.search
        ? product?.bookTitle
            ?.toLocaleLowerCase()
            .includes(filters.search?.toLocaleLowerCase()) ||
          product?.bookAuthor
            ?.toLocaleLowerCase()
            .includes(filters.search?.toLocaleLowerCase())
        : true;

      return authorMatches && publisherMatches && searchMatches;
    });

    if (sort.field && sort.order) {
      filteredProductsTemp = filteredProductsTemp.sort((a, b) => {
        if (sort.order === "low-to-high" || sort.order === "high-to-low") {
          return sort.order === "low-to-high"
            ? a.price - b.price
            : b.price - a.price;
        }
        if (
          sort.order === "high-rank-to-low-rank" ||
          sort.order === "low-rank-to-high-rank"
        ) {
          const rankA = a.bookRank;
          const rankB = b.bookRank;

          return sort.order === "high-rank-to-low-rank"
            ? rankB - rankA
            : rankA - rankB;
        }
        return 0;
      });
    }

    setFilteredProducts(filteredProductsTemp);
  }, [products, filters, sort]);

  useEffect(() => {
    setPage(0);
  }, [filters]);

  return (
    <Grid ref={targetRef} item xs={12} sm={8} lg={9}>
      {filters?.authors?.length || filters?.publishers?.length ? (
        <Box sx={{ marginBottom: "2rem" }}>
          <Typography
            sx={{
              borderBottom: "1px solid #cfcfcf",
              width: "fit-content",
              paddingBottom: ".25rem",
              marginBottom: ".5rem",
            }}
          >
            Selected Filter
            {filters?.authors?.length > 1 ||
            filters?.publishers?.length > 1 ||
            (filters?.publishers?.length && filters?.authors?.length)
              ? "s"
              : ""}{" "}
          </Typography>
          {filters?.authors?.length ? (
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ marginRight: ".5rem" }}>
                <strong>Authors:</strong>
              </Typography>
              {filters?.authors?.map((author, idx) => {
                return (
                  <Typography
                    sx={{
                      marginRight:
                        filters?.authors?.length !== idx + 1
                          ? ".25rem  "
                          : " 0",
                    }}
                  >
                    {author}
                    {filters?.authors?.length !== idx + 1 ? "," : " "}
                  </Typography>
                );
              })}
            </Box>
          ) : null}
          {filters?.publishers?.length ? (
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ marginRight: ".5rem" }}>
                <strong>Publishers:</strong>
              </Typography>
              {filters?.publishers?.map((publisher, idx) => {
                return (
                  <Typography
                    sx={{
                      marginRight:
                        filters?.publishers?.length !== idx + 1
                          ? ".25rem  "
                          : " 0",
                    }}
                  >
                    {publisher}
                    {filters?.publishers?.length !== idx + 1 ? "," : " "}
                  </Typography>
                );
              })}
            </Box>
          ) : null}
        </Box>
      ) : null}

      {filters?.search ? (
        filters?.search ? (
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ marginRight: ".5rem" }}>
              <strong>Searched:</strong>
            </Typography>
            <Typography>{filters?.search}</Typography>
          </Box>
        ) : null
      ) : null}
      <Grid container spacing={3}>
        {products?.length ? (
          filteredProducts?.length ? (
            filteredProducts
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                return <ProductCard product={product} />;
              })
          ) : (
            <Box
              sx={{
                justifyContent: "center",
                width: "100%",
                marginTop: "3rem",
                marginBottom: "3rem"
              }}
            >
              <Typography
                sx={{ justifyContent: "center", textAlign: "center" }}
                variant="h5"
              >
                No Products Found!
              </Typography>
            </Box>
          )
        ) : (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "calc(50% - 20px)",
              left: "calc(50% - 20px)",
            }}
          />
        )}
      </Grid>
      {filteredProducts?.length ? (
        <Pagination
          count={Math.ceil(filteredProducts?.length / rowsPerPage)}
          page={page + 1}
          onChange={(event, newPage) => handleChangePage(event, newPage - 1)}
          variant="outlined"
          shape="rounded"
          sx={{ mt: 10, display: "flex", justifyContent: "center" }}
        />
      ) : null}
    </Grid>
  );
}
