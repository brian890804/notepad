import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 50,
    height: 50,
  },
}));



export default function IconBreadcrumbs() {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb" >
      <Link color="textPrimary" href="/" onClick className={classes.link}draggable="false">
        <HomeIcon className={classes.icon} />
        <h1>頁首</h1>
      </Link>
      <Link
        color="textPrimary"
        href="/a"
        onClick
        className={classes.link}
        draggable="false"
      >
        <ShoppingCartIcon className={classes.icon} />
        <h1>購物車</h1>
      </Link>
      <Link color="textPrimary"href="" className={classes.link}draggable="false">
        <ListAltIcon className={classes.icon} />
        <h1>表格</h1>
      </Link>
    </Breadcrumbs>
  );
}
