import React from 'react'
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

const ColorChangerGrid = () => {
    const [value, setValue] = React.useState(30);

    const handleChange = (event, newValue) => {
      setValue(newValue);
      console.log(newValue);
    };

  return (
    <Stack spacing={2} defaultValue={50} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Slider aria-label="Volume" value={value} onChange={handleChange} />
    </Stack>
  )
}

export default ColorChangerGrid