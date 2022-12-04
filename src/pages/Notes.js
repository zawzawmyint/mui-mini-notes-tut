import React, { useEffect } from 'react'
import { useState } from 'react'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';

export default function Notes() {

  const [notes, setNotes] = useState([]);

  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE',
      body: "Content-type/json"
    })

    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes)
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])
  return (
    <Container>
      {/* <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} md={6} lg={4} >
            <NoteCard handleDelete={handleDelete} note={note} />
          </Grid>
        ))}

      </Grid> */}

      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {notes.map((note) => (
          <div item key={note.id}>
            <NoteCard handleDelete={handleDelete} note={note} />
          </div>
        ))}
      </Masonry>

    </Container>
  )
}
