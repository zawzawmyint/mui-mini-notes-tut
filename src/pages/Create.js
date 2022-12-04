import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
});

export default function Create() {

  const classes = useStyles()

  const history = useHistory();

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('work')

  const handleSubmit = (e) => {
    e.preventDefault();

    setTitleError(false)
    setDetailsError(false)

    if (title == '') {
      setTitleError(true)
    }
    if (details == '') {
      setDetailsError(true)
    }

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category })
      }).then(() => history.push('/'))
    }
  }


  return (
    <Container>
      <Typography
        variant='h6'
        component='h2'
        gutterBottom color='textSecondary'
      >
        Create a New Note
      </Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label='Note title'
          color='secondary'
          variant='outlined'
          fullWidth
          required
          error={titleError}

        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label='Details'
          color='secondary'
          variant='outlined'
          multiline
          rows='4'
          fullWidth
          required
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value='money' control={<Radio color="secondary" />} label="Money" />
            <FormControlLabel value='todos' control={<Radio color="secondary" />} label="Todos" />
            <FormControlLabel value='reminders' control={<Radio color="secondary" />} label="Reminders" />
            <FormControlLabel value='work' control={<Radio color="secondary" />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type='submit'
          color='secondary'
          variant='contained'
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
      <br />
    </Container>
  )
}
