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
  Avatar,
  Fade,
  Slide,
  InputAdornment,
  Tooltip,
  Badge,
  LinearProgress,
  CardHeader,
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
  LocalHospital as DoctorIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  AccessTime as TimeIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const [loading, setLoading] = useState(false);

  // Enhanced sample data - assigned patients
  const [assignedPatients] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 35,
      gender: 'Male',
      phone: '9876543210',
      email: 'john.doe@email.com',
      lastVisit: '2024-01-10',
      condition: 'Hypertension',
      status: 'Active',
      priority: 'High',
      nextAppointment: '2024-01-20',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 28,
      gender: 'Female',
      phone: '9876543211',
      email: 'jane.smith@email.com',
      lastVisit: '2024-01-12',
      condition: 'Diabetes',
      status: 'Follow-up',
      priority: 'Medium',
      nextAppointment: '2024-01-18',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      age: 45,
      gender: 'Male',
      phone: '9876543212',
      email: 'bob.johnson@email.com',
      lastVisit: '2024-01-08',
      condition: 'Migraine',
      status: 'Recovered',
      priority: 'Low',
      nextAppointment: '2024-02-01',
    },
  ]);

  // Enhanced visit history
  const [visitHistory] = useState({
    1: [
      {
        date: '2024-01-10',
        diagnosis: 'Hypertension',
        medicines: 'Amlodipine 5mg, Metoprolol 25mg',
        notes: 'Blood pressure under control. Continue medication.',
        doctor: 'Dr. Sarah Wilson',
        vitals: { bp: '130/85', pulse: '72', temp: '98.6°F' },
        followUp: '2024-01-20'
      },
      {
        date: '2023-12-15',
        diagnosis: 'Hypertension - Initial',
        medicines: 'Amlodipine 5mg',
        notes: 'Newly diagnosed hypertension. Lifestyle changes recommended.',
        doctor: 'Dr. Sarah Wilson',
        vitals: { bp: '145/95', pulse: '78', temp: '98.4°F' },
        followUp: '2024-01-10'
      },
    ],
    2: [
      {
        date: '2024-01-12',
        diagnosis: 'Type 2 Diabetes',
        medicines: 'Metformin 500mg, Glimepiride 2mg',
        notes: 'HbA1c levels improved. Continue current treatment.',
        doctor: 'Dr. Michael Brown',
        vitals: { bp: '125/80', pulse: '68', temp: '98.2°F', glucose: '140 mg/dL' },
        followUp: '2024-01-18'
      },
    ],
    3: [
      {
        date: '2024-01-08',
        diagnosis: 'Migraine',
        medicines: 'Sumatriptan 50mg, Propranolol 40mg',
        notes: 'Migraine episodes reduced. Preventive medication working well.',
        doctor: 'Dr. Emily Davis',
        vitals: { bp: '120/75', pulse: '65', temp: '98.1°F' },
        followUp: '2024-02-01'
      },
    ],
  });

  const [prescriptions, setPrescriptions] = useState([]);

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

  const handleSavePrescription = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newPrescription = {
      id: Date.now(),
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      ...prescriptionForm,
    };

    setPrescriptions([...prescriptions, newPrescription]);
    setSnackbar({
      open: true,
      message: 'Prescription added successfully!',
      severity: 'success',
    });
    setLoading(false);
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const statsData = [
    {
      title: 'Assigned Patients',
      value: assignedPatients.length,
      icon: <PersonIcon />,
      color: 'primary.main',
      bgColor: 'rgba(25, 118, 210, 0.1)',
      trend: '+5%'
    },
    {
      title: 'Prescriptions Today',
      value: prescriptions.length,
      icon: <PrescriptionIcon />,
      color: 'secondary.main',
      bgColor: 'rgba(156, 39, 176, 0.1)',
      trend: '+12%'
    },
    {
      title: 'Active Cases',
      value: assignedPatients.filter(p => p.status === 'Active').length,
      icon: <MedicationIcon />,
      color: 'error.main',
      bgColor: 'rgba(211, 47, 47, 0.1)',
      trend: '+3%'
    },
    {
      title: 'Follow-ups',
      value: assignedPatients.filter(p => p.status === 'Follow-up').length,
      icon: <ScheduleIcon />,
      color: 'warning.main',
      bgColor: 'rgba(255, 152, 0, 0.1)',
      trend: '+8%'
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)' }}>
        <Toolbar sx={{ py: 1 }}>
          <DoctorIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Doctor Dashboard
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => navigate('/admin-dashboard')}
            sx={{ mr: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            Admin Panel
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/opd-counter')}
            sx={{ mr: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            OPD Counter
          </Button>
          <Button 
            color="inherit" 
            startIcon={<LogoutIcon />} 
            onClick={() => navigate('/')}
            sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Enhanced Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsData.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.15)'
                },
                bgcolor: stat.bgColor,
                animation: `fadeInUp 0.6s ease ${index * 0.1}s both`
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h3" fontWeight="bold" sx={{ color: stat.color, mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary" fontWeight="medium">
                        {stat.title}
                      </Typography>
                    </Box>
                    <Box sx={{ color: stat.color, opacity: 0.8 }}>
                      {React.cloneElement(stat.icon, { sx: { fontSize: 48 } })}
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
                    <Typography variant="caption" color="success.main" fontWeight="bold">
                      {stat.trend} from last week
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Enhanced Assigned Patients */}
        <Paper sx={{ 
          borderRadius: 4, 
          overflow: 'hidden', 
          boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
          mb: 4
        }}>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <PersonIcon />
                </Avatar>
                <Typography variant="h5" fontWeight="bold">
                  Assigned Patients
                </Typography>
              </Box>
            }
            sx={{ bgcolor: 'primary.main', color: 'white' }}
          />
          <Fade in={true} timeout={500}>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: 'grey.50' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Medical Info</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Next Visit</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assignedPatients.map((patient, index) => (
                    <TableRow 
                      key={patient.id}
                      sx={{ 
                        '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.04)' },
                        animation: `fadeInUp 0.5s ease ${index * 0.1}s both`
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {patient.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {patient.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {patient.age} years • {patient.gender}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">{patient.phone}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">{patient.email}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography variant="body2" fontWeight="bold">
                            {patient.condition}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="textSecondary">
                              Last: {patient.lastVisit}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Chip
                            label={patient.status}
                            color={getStatusColor(patient.status)}
                            size="small"
                            sx={{ fontWeight: 'bold' }}
                          />
                          <Chip
                            label={`${patient.priority} Priority`}
                            color={getPriorityColor(patient.priority)}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <TimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">{patient.nextAppointment}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Add Prescription">
                            <IconButton
                              onClick={() => handleAddPrescription(patient)}
                              sx={{ 
                                color: 'primary.main',
                                '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.1)' }
                              }}
                            >
                              <AddIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="View History">
                            <IconButton
                              onClick={() => handleViewHistory(patient)}
                              sx={{ 
                                color: 'secondary.main',
                                '&:hover': { bgcolor: 'rgba(156, 39, 176, 0.1)' }
                              }}
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Fade>
        </Paper>

        {/* Enhanced Recent Prescriptions */}
        {prescriptions.length > 0 && (
          <Paper sx={{ 
            borderRadius: 4, 
            overflow: 'hidden', 
            boxShadow: '0 12px 40px rgba(0,0,0,0.1)' 
          }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <PrescriptionIcon />
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold">
                    Recent Prescriptions
                  </Typography>
                  <Badge badgeContent={prescriptions.length} color="secondary" />
                </Box>
              }
              sx={{ bgcolor: 'secondary.main', color: 'white' }}
            />
            <Box sx={{ p: 2 }}>
              {prescriptions.map((prescription, index) => (
                <Accordion 
                  key={prescription.id}
                  sx={{ 
                    mb: 1,
                    borderRadius: 2,
                    '&:before': { display: 'none' },
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    animation: `fadeInUp 0.5s ease ${index * 0.1}s both`
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      bgcolor: 'grey.50',
                      borderRadius: 2,
                      '&:hover': { bgcolor: 'grey.100' }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <PrescriptionIcon />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {prescription.patientName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {prescription.date} at {prescription.time}
                        </Typography>
                      </Box>
                      <Chip 
                        label={prescription.diagnosis} 
                        color="primary" 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ bgcolor: 'white' }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1,
                          color: 'primary.main',
                          fontWeight: 'bold'
                        }}>
                          <MedicationIcon />
                          Prescribed Medicines:
                        </Typography>
                        <List dense>
                          {prescription.medicines.map((med, medIndex) => (
                            <ListItem key={medIndex} sx={{ pl: 0 }}>
                              <ListItemText
                                primary={
                                  <Typography variant="body2" fontWeight="bold">
                                    {med.name}
                                  </Typography>
                                }
                                secondary={
                                  <Typography variant="caption" color="textSecondary">
                                    {med.dosage} - {med.frequency} for {med.duration}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1,
                          color: 'secondary.main',
                          fontWeight: 'bold'
                        }}>
                          <HistoryIcon />
                          Additional Notes:
                        </Typography>
                        <Paper sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                          <Typography variant="body2">
                            {prescription.notes || 'No additional notes provided.'}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Paper>
        )}
      </Container>

      {/* Enhanced Add Prescription Dialog */}
      <Dialog 
        open={openPrescriptionDialog} 
        onClose={() => setOpenPrescriptionDialog(false)} 
        maxWidth="lg" 
        fullWidth
        TransitionComponent={Transition}
        PaperProps={{
          sx: { borderRadius: 3, boxShadow: '0 24px 48px rgba(0,0,0,0.2)' }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <PrescriptionIcon />
          Add Prescription for {selectedPatient?.name}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {loading && <LinearProgress sx={{ mb: 2 }} />}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Diagnosis"
                value={prescriptionForm.diagnosis}
                onChange={(e) => setPrescriptionForm({ ...prescriptionForm, diagnosis: e.target.value })}
                multiline
                rows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MedicationIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MedicationIcon color="primary" />
                  Medicines
                </Typography>
                <Chip 
                  label={`${prescriptionForm.medicines.length} medicine(s)`} 
                  color="primary" 
                  size="small" 
                />
              </Box>
              {prescriptionForm.medicines.map((medicine, index) => (
                <Paper 
                  key={index} 
                  sx={{ 
                    p: 2, 
                    mb: 2, 
                    borderRadius: 2, 
                    bgcolor: 'grey.50',
                    border: '1px solid',
                    borderColor: 'grey.200'
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="Medicine Name"
                        value={medicine.name}
                        onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        fullWidth
                        label="Dosage"
                        value={medicine.dosage}
                        onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                        placeholder="e.g., 500mg"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        select
                        fullWidth
                        label="Frequency"
                        value={medicine.frequency}
                        onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveMedicine(index)}
                        disabled={prescriptionForm.medicines.length === 1}
                        fullWidth
                        sx={{ height: '56px', borderRadius: 2 }}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
              <Button 
                variant="outlined" 
                onClick={handleAddMedicine} 
                startIcon={<AddIcon />}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Add Another Medicine
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
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Button 
            onClick={() => setOpenPrescriptionDialog(false)}
            disabled={loading}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSavePrescription} 
            variant="contained" 
            disabled={loading}
            sx={{ minWidth: 140, borderRadius: 2 }}
          >
            {loading ? 'Saving...' : 'Save Prescription'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Enhanced View History Dialog */}
      <Dialog 
        open={openHistoryDialog} 
        onClose={() => setOpenHistoryDialog(false)} 
        maxWidth="lg" 
        fullWidth
        TransitionComponent={Transition}
        PaperProps={{
          sx: { borderRadius: 3, boxShadow: '0 24px 48px rgba(0,0,0,0.2)' }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: 'secondary.main', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <HistoryIcon />
          Visit History - {selectedPatient?.name}
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {selectedPatient && visitHistory[selectedPatient.id] ? (
            <List sx={{ p: 0 }}>
              {visitHistory[selectedPatient.id].map((visit, index) => (
                <React.Fragment key={index}>
                  <ListItem 
                    alignItems="flex-start" 
                    sx={{ 
                      p: 3,
                      '&:hover': { bgcolor: 'grey.50' }
                    }}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        mb: 2
                      }}>
                        <Box>
                          <Typography variant="h6" fontWeight="bold" color="primary.main">
                            {visit.diagnosis}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {visit.date} • {visit.doctor}
                          </Typography>
                        </Box>
                        <Chip 
                          label={`Visit ${index + 1}`} 
                          color="secondary" 
                          size="small" 
                        />
                      </Box>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Paper sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 2 }}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                              Prescribed Medicines:
                            </Typography>
                            <Typography variant="body2">{visit.medicines}</Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Paper sx={{ p: 2, bgcolor: 'secondary.50', borderRadius: 2 }}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                              Vital Signs:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {Object.entries(visit.vitals).map(([key, value]) => (
                                <Chip 
                                  key={key} 
                                  label={`${key.toUpperCase()}: ${value}`} 
                                  size="small" 
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </Paper>
                        </Grid>
                        <Grid item xs={12}>
                          <Paper sx={{ p: 2, bgcolor: 'warning.50', borderRadius: 2 }}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                              Doctor's Notes:
                            </Typography>
                            <Typography variant="body2">{visit.notes}</Typography>
                            {visit.followUp && (
                              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                                <Typography variant="caption" color="warning.main" fontWeight="bold">
                                  Follow-up: {visit.followUp}
                                </Typography>
                              </Box>
                            )}
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  </ListItem>
                  {index < visitHistory[selectedPatient.id].length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <HistoryIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
              <Typography variant="h6" color="textSecondary">
                No visit history available
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Button 
            onClick={() => setOpenHistoryDialog(false)}
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ borderRadius: 2, fontWeight: 'bold' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
}