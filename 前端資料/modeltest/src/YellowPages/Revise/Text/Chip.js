import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    height:"100px",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray({chips,removeChip}) {
  const classes = useStyles();
  const handleDelete = (chipToDelete) => () => {
    removeChip(chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <Paper component="ul" className={classes.root}>
      {chips.map((data) => {
        let icon;
        return (
          <li key={data.key} style={{height:"30px"}}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={data.label === 'React' ? undefined : handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
}
