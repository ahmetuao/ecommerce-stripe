import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setSort } from '../../../redux/actions/filterActions'

export default function Sort() {
  const dispatch = useDispatch()
  const sort = useSelector((state) => state.filters.sort)

  const handleSortChange = (event, sortField) => {
    const value = event.target.value
    dispatch(setSort(sortField, value))
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
        Sort By
      </Typography>
      <Box sx={{ boxShadow: '0px 0px 10px #efefef', padding: '1rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl sx={{ marginBottom: '1rem' }}>
            <RadioGroup
              aria-labelledby="sortBy"
              name="sortBy"
              value={sort.order}
              onChange={(e) => handleSortChange(e, 'sortBy')}
            >
              <FormControlLabel
                value="low-rank-to-high-rank"
                control={<Radio />}
                label="Low Rank to High Rank"
              />
              <FormControlLabel
                value="high-rank-to-low-rank"
                control={<Radio />}
                label="High Rank to Low Rank"
              />
              <FormControlLabel
                value="high-to-low"
                control={<Radio />}
                label="High to low"
              />
              <FormControlLabel
                value="low-to-high"
                control={<Radio />}
                label="Low to high"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  )
}
