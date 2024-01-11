import { createTheme } from '@mui/material'
import { green } from '@mui/material/colors'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#222222',
    },
    text: {
      primary: '#ffffff',
    },
  },
})
