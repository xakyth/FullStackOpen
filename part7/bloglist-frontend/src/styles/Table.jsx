import styled from '@emotion/styled'
import { TableCell, TableHead } from '@mui/material'

export const BorderedTD = styled(TableCell)`
  &.MuiTableCell-root {
    border: 1px solid #000;
    font-weight: bold;
  }
`

export const StyledTH = styled(TableHead)`
  &.MuiTableHead-root {
    background-color: #b8b8b8;
  }
`
