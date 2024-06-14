import axios from "axios";
import {
  CLOSE_MODAL,
  FETCH_LISTITEMS_FAIL,
  FETCH_LISTITEMS_START,
  FETCH_LISTITEMS_SUCCESS,
  OPEN_MODAL,
} from "./actionTypes";

export const fetchListItems = () => async (dispatch) => {
  dispatch({ type: FETCH_LISTITEMS_START });

  try {
    let url = `https://all-books-api.p.rapidapi.com/getBooks`;

    const response = await axios.get(url, {
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_XRapidApiKey,
        "x-rapidapi-host": process.env.REACT_APP_XRapidApiHost,
      },
    });
    const books = response.data;

    const booksWithPrice = books
      .filter(
        (book) =>
          book.bookIsbn &&
          book.bookIsbn.trim() !== "" &&
          book.bookIsbn.trim() !== "None"
      )
      .map((book) => {
        const bookIsbn = book.bookIsbn;
        const price =
          parseFloat(
            `0.${bookIsbn
              .split("")
              .reduce((acc, char) => acc + char.charCodeAt(0), 0)}`
          ) * book?.bookRank;
        return {
          ...book,
          price: price.toFixed(2),
        };
      });

    dispatch({
      type: FETCH_LISTITEMS_SUCCESS,
      payload: booksWithPrice,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    dispatch({ type: FETCH_LISTITEMS_FAIL });
  }
};

export const openModal = (content, contentType) => ({
  type: OPEN_MODAL,
  payload: { content, contentType },
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
