import {
  Box,
  Checkbox,

  FormControlLabel,
  FormGroup,



  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../../redux/actions/filterActions";

export default function Publisher() {
  const [publishers, setPublishers] = useState([]);
  const products = useSelector((state) => state.listItems.listItems);
  const selectedPublishers = useSelector((state) => state.filters.filters.publishers);
  const selectedAuthors = useSelector((state) => state.filters.filters.authors);

  const dispatch = useDispatch();


  useEffect(() => {
    if (products?.length) {
      const publisherSet = new Set();
      products.forEach((product) => {
        if (
          product?.bookPublisher &&
          (!selectedAuthors.length || selectedAuthors.includes(product.bookAuthor))
        ) {
          publisherSet.add(product.bookPublisher);
        }
      });
      const uniquePublishers = Array.from(publisherSet);
      setPublishers(uniquePublishers);

      const validSelectedPublishers = selectedPublishers.filter((publisher) =>
        uniquePublishers.includes(publisher)
      );
      if (validSelectedPublishers.length !== selectedPublishers.length) {
        dispatch(setFilter("publishers", validSelectedPublishers));
      }
    }
  }, [products, selectedAuthors, selectedPublishers, dispatch]);

  const handlePublisherChange = (publisher) => {
    const newSelectedPublishers = selectedPublishers?.includes(publisher)
      ? selectedPublishers.filter((b) => b !== publisher)
      : [...selectedPublishers, publisher];
    dispatch(setFilter("publishers", newSelectedPublishers));
  };

  return (
    <Box sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
        Publisher
      </Typography>
      <Box sx={{ boxShadow: "0px 0px 10px #efefef", padding: "1rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormGroup
            sx={{
              maxHeight: "200px",
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              overflow: "auto",
            }}
          >
            {publishers?.map((publisher) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPublishers?.includes(publisher)}
                      onChange={() => handlePublisherChange(publisher)}
                    />
                  }
                  label={publisher}
                />
              );
            })}
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
}
