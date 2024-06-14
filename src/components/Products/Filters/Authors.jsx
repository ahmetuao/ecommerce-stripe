import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../../../redux/actions/filterActions'

export default function Authors() {
  const [authors, setAuthors] = useState([])
  const products = useSelector((state) => state.listItems.listItems)
  const selectedAuthors = useSelector((state) => state.filters.filters.authors)
  const filters = useSelector((state) => state.filters.filters)

  const dispatch = useDispatch()

  useEffect(() => {
    if (products?.length) {
      const AuthorSet = new Set()
      products.forEach((product) => {
        if (product?.bookAuthor) {
          AuthorSet.add(product.bookAuthor)
        }
      })
      const uniqueAuthors = Array.from(AuthorSet)
      setAuthors(uniqueAuthors)
    }
  }, [products])

  const handleAuthorChange = (author) => {
    const newSelectedAuthors = selectedAuthors?.includes(author)
      ? selectedAuthors.filter((b) => b !== author)
      : [...selectedAuthors, author]
    dispatch(setFilter('authors', newSelectedAuthors))
  }

  return (
    <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
        Authors
      </Typography>
      <Box sx={{ boxShadow: '0px 0px 10px #efefef', padding: '1rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormGroup
            sx={{
              maxHeight: '200px',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
              overflow: 'auto',
            }}
          >
            {authors.map((author, idx) => (
              <FormControlLabel
                key={idx}
                control={
                  <Checkbox
                    checked={selectedAuthors?.includes(author)}
                    onChange={() => handleAuthorChange(author)}
                  />
                }
                label={author}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
    </Box>
  )
}
