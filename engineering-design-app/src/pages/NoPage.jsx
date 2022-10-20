import React from 'react'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

//This is a page to display whenever there is no page to render

const NoPage = () => {
  return (
    <div class="text-center pt-16 h-screen">
      <PrecisionManufacturingIcon style={{ fontSize: 100 }} />
      <h1 class="text-9xl">404</h1>
      <h2 class="text-6xl">Page Not Found</h2>
    </div>
  )
}

export default NoPage