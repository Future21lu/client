import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  Medication as MedicationIcon,
  Assignment as PrescriptionIcon,
  Logout as LogoutIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { 
  mockPatients, 
  mockVisitHistory, 
  mockPrescriptions,
  getPrescriptionsByDoctorId 
} from '../data/mockData';

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openPrescriptionDialog, setOpenPrescriptionDialog] = useState(false);
  const [openHistoryDialog, setOpenHistoryDialog] = useState(false);
  const [prescriptionForm, setPrescriptionForm] = useState({
    diagnosis: '',
    medicines: [{ name: '', dosage: '', frequency: '', duration: '' }],
    notes: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Initialize with mock data
  const [assignedPatients] = useState([...mockPatients]);
  const [visitHistory] = useState({ ...mockVisitHistory });
  const [prescriptions, setPrescriptions] = useState([...getPrescriptionsByDoctorId(1)]); // Assuming doctor ID 1

  const handleAddPrescription = (patient) => {
    setSelectedPatient(patient);
    setPrescriptionForm({
      diagnosis: '',
      medicines: [{ name: '', dosage: '', frequency: '', duration: '' }],
      notes: '',
    });
    setOpenPrescriptionDialog(true);
  };

  const handleViewHistory = (patient) => {
    setSelectedPatient(patient);
    setOpenHistoryDialog(true);
  };

  const handleAddMedicine = () => {
    setPrescriptionForm({
      ...prescriptionForm,
      medicines: [...prescriptionForm.medicines, { name: '', dosage: '', frequency: '', duration: '' }],
    });
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = prescriptionForm.medicines.map((med, i) =>
      i === index ? { ...med, [field]: value } : med
    );
    setPrescriptionForm({ ...prescriptionForm, medicines: updatedMedicines });
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = prescriptionForm.medicines.filter((_, i) => i !== index);
    setPrescriptionForm({ ...prescriptionForm, medicines: updatedMedicines });
  };

  const handleSavePrescription = () => {
    const newPrescription = {
      id: Date.now(),
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      date: new Date().toLocaleDateString(),
      ...prescriptionForm,
    };

    setPrescriptions([...prescriptions, newPrescription]);
    setSnackbar({
      open: true,
      message: 'Prescription added successfully!',
      severity: 'success',
    });
    setOpenPrescriptionDialog(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'error';
      case 'Follow-up':
        return 'warning';
      case 'Recovered':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" sx={{ bgcolor: '#2e7d32' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Doctor Dashboard
          </Typography>
          <Button color="inherit" onClick={() => navigate('/admin-dashboard')}>
            Admin Panel
          </Button>
          <Button color="inherit" onClick={() => navigate('/opd-counter')}>
            OPD Counter
          </Button>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={() => navigate('/')}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 2, color: '#2e7d32', fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {assignedPatients.length}
                  </Typography>
                  <Typography color="textSecondary">Assigned Patients</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <PrescriptionIcon sx={{ mr: 2, color: '#1976d2', fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {prescriptions.length}
                  </Typography>
                  <Typography color="textSecondary">Prescriptions Today</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <MedicationIcon sx={{ mr: 2, color: '#ed6c02', fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {assignedPatients.filter(p => p.status === 'Active').length}
                  </Typography>
                  <Typography color="textSecondary">Active Cases</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <HistoryIcon sx={{ mr: 2, color: '#9c27b0', fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {assignedPatients.filter(p => p.status === 'Follow-up').length}
                  </Typography>
                  <Typography color="textSecondary">Follow-ups</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Assigned Patients */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon sx={{ mr: 1 }} />
            Assigned Patients
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Age/Gender</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Last Visit</TableCell>
                  <TableCell>Condition</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignedPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age} / {patient.gender}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>{patient.condition}</TableCell>
                    <TableCell>
                      <Chip
                        label={patient.status}
                        color={getStatusColor(patient.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleAddPrescription(patient)}
                        color="primary"
                        title="Add Prescription"
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleViewHistory(patient)}
                        color="secondary"
                        title="View History"
                      >
                        <ViewIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Recent Prescriptions */}
        {prescriptions.length > 0 && (
          <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <PrescriptionIcon sx={{ mr: 1 }} />
              Recent Prescriptions
            </Typography>
            {prescriptions.map((prescription) => (
              <Accordion key={prescription.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {prescription.patientName}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {prescription.date} - {prescription.diagnosis}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Medicines:
                      </Typography>
                      <List dense>
                        {prescription.medicines.map((med, index) => (
                          <ListItem key={index}>
                            <ListItemText
                              primary={med.name}
                              secondary={`${med.dosage} - ${med.frequency} for ${med.duration}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Notes:
                      </Typography>
                      <Typography variant="body2">{prescription.notes}</Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        )}
      </Container>

      {/* Add Prescription Dialog */}
      <Dialog open={openPrescriptionDialog} onClose={() => setOpenPrescriptionDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Add Prescription for {selectedPatient?.name}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Diagnosis"
                value={prescriptionForm.diagnosis}
                onChange={(e) => setPrescriptionForm({ ...prescriptionForm, diagnosis: e.target.value })}
                multiline
                rows={2}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Medicines
              </Typography>
              {prescriptionForm.medicines.map((medicine, index) => (
                <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Medicine Name"
                      value={medicine.name}
                      onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      fullWidth
                      label="Dosage"
                      value={medicine.dosage}
                      onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                      placeholder="e.g., 500mg"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      select
                      fullWidth
                      label="Frequency"
                      value={medicine.frequency}
                      onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                    >
                      <MenuItem value="Once daily">Once daily</MenuItem>
                      <MenuItem value="Twice daily">Twice daily</MenuItem>
                      <MenuItem value="Three times daily">Three times daily</MenuItem>
                      <MenuItem value="As needed">As needed</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      fullWidth
                      label="Duration"
                      value={medicine.duration}
                      onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                      placeholder="e.g., 7 days"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveMedicine(index)}
                      disabled={prescriptionForm.medicines.length === 1}
                      fullWidth
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              ))}
              <Button variant="outlined" onClick={handleAddMedicine} startIcon={<AddIcon />}>
                Add Medicine
              </Button>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes"
                value={prescriptionForm.notes}
                onChange={(e) => setPrescriptionForm({ ...prescriptionForm, notes: e.target.value })}
                multiline
                rows={3}
                placeholder="Any additional instructions or notes..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPrescriptionDialog(false)}>Cancel</Button>
          <Button onClick={handleSavePrescription} variant="contained">
            Save Prescription
          </Button>
        </DialogActions>
      </Dialog>

      {/* View History Dialog */}
      <Dialog open={openHistoryDialog} onClose={() => setOpenHistoryDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Visit History - {selectedPatient?.name}
        </DialogTitle>
        <DialogContent>
          {selectedPatient && visitHistory[selectedPatient.id] ? (
            <List>
              {visitHistory[selectedPatient.id].map((visit, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {visit.diagnosis}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {visit.date}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Doctor:</strong> {visit.doctor}
                          </Typography>
                          {visit.vitals && (
                            <Typography variant="body2" color="textSecondary">
                              <strong>Vitals:</strong> BP: {visit.vitals.bp}, Pulse: {visit.vitals.pulse}, Temp: {visit.vitals.temp}
                            </Typography>
                          )}
                          <Typography variant="body2" color="textSecondary">
                            <strong>Medicines:</strong> {visit.medicines}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Notes:</strong> {visit.notes}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < visitHistory[selectedPatient.id].length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography>No visit history available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenHistoryDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}