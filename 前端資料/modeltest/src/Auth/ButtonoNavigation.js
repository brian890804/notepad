import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: 30,
  },
  border: {
    borderRight: "1px solid",
    height: "50%",
    color: "#757575",
    fontWeight:"bolder"
  },
  border1: {
    height: "50%",
  }
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction className={classes.border} label="黃頁夾" value="MenuBook" icon={<MenuBookIcon />} />
      <BottomNavigationAction className={classes.border} label="名片夾" value="RecentActors" icon={<RecentActorsIcon />} />
      <BottomNavigationAction className={classes.border} label="推播" value="ScreenShare" icon={<ScreenShareIcon />} />
      <BottomNavigationAction className={classes.border1} label="設定" value="Settings" icon={<SettingsIcon />} />
    </BottomNavigation>
  );
}