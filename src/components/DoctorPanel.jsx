import React, { useState } from 'react';
import { Box, TextField, Typography, MenuItem, Button, Grid } from '@mui/material';

const medicines = ['Paracetamol', 'Azithromycin', 'Amoxicillin', 'Ibuprofen'];

function DoctorPanel() {
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Prescription Panel
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            fullWidth
            label="Medicine"
            value={selectedMedicine}
            onChange={(e) => setSelectedMedicine(e.target.value)}
          >
            {medicines.map((med) => (
              <MenuItem key={med} value={med}>
                {med}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Frequency"
            placeholder="e.g. 1-0-1"
            fullWidth
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Duration (days)"
            placeholder="e.g. 5"
            fullWidth
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            Add to Prescription
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DoctorPanel;
