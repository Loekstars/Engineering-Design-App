import React from 'react'
import { BottomNavigation } from '@mui/material'
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';

const BottomNav = () => {
    const [value, setValue] = React.useState(0);

  return (
    <div class="block md:hidden sticky z-50 bottom-2">
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
        >
            <BottomNavigationAction label="Home" href="/" icon={<HomeIcon />} />
            <BottomNavigationAction label="About Us"  onclick="" href="/Aboutus" icon={<InfoIcon />} />
            <BottomNavigationAction label="Settings" href="/Settings" icon={<SettingsIcon />} />
        </BottomNavigation>
    </div>
  )
}

export default BottomNav