import React, { useState } from "react";
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
  Tabs,
  Tab,
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
  Snackbar,
  Alert,
  MenuItem,
  Avatar,
  Fade,
  Slide,
  InputAdornment,
  Tooltip,
  Badge,
  LinearProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  People as PeopleIcon,
  LocalHospital as DoctorIcon,
  Medication as MedicineIcon,
  Assignment as ReportIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Inventory as InventoryIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);

  // Enhanced sample data with more realistic information
  const [patients, setPatients] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      age: 35, 
      gender: "Male", 
      phone: "9876543210", 
      email: "john.doe@email.com",
      address: "123 Main St, Downtown", 
      status: "Active",
      lastVisit: "2024-01-15",
      condition: "Hypertension"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      age: 28, 
      gender: "Female", 
      phone: "9876543211", 
      email: "jane.smith@email.com",
      address: "456 Oak Ave, Uptown", 
      status: "Active",
      lastVisit: "2024-01-12",
      condition: "Diabetes"
    },
    { 
      id: 3, 
      name: "Bob Johnson", 
      age: 45, 
      gender: "Male", 
      phone: "9876543212", 
      email: "bob.johnson@email.com",
      address: "789 Pine Rd, Suburbs", 
      status: "Inactive",
      lastVisit: "2024-01-08",
      condition: "Recovered"
    },
  ]);

  const [doctors, setDoctors] = useState([
    { 
      id: 1, 
      name: "Dr. Sarah Wilson", 
      specialization: "Cardiology", 
      phone: "9876543220", 
      email: "sarah@hospital.com", 
      status: "Active",
      experience: "15 years",
      patients: 45,
      rating: 4.8
    },
    { 
      id: 2, 
      name: "Dr. Michael Brown", 
      specialization: "Neurology", 
      phone: "9876543221", 
      email: "michael@hospital.com", 
      status: "Active",
      experience: "12 years",
      patients: 38,
      rating: 4.9
    },
    { 
      id: 3, 
      name: "Dr. Emily Davis", 
      specialization: "Pediatrics", 
      phone: "9876543222", 
      email: "emily@hospital.com", 
      status: "Active",
      experience: "8 years",
      patients: 52,
      rating: 4.7
    },
  ]);

  const [medicines, setMedicines] = useState([
    { 
      id: 1, 
      name: "Paracetamol", 
      category: "Analgesic", 
      stock: 500, 
      price: 10, 
      manufacturer: "PharmaCorp",
      expiryDate: "2025-06-15",
      batchNo: "PC001"
    },
    { 
      id: 2, 
      name: "Amoxicillin", 
      category: "Antibiotic", 
      stock: 200, 
      price: 25, 
      manufacturer: "MediLab",
      expiryDate: "2025-03-20",
      batchNo: "ML002"
    },
    { 
      id: 3, 
      name: "Ibuprofen", 
      category: "Anti-inflammatory", 
      stock: 50, 
      price: 15, 
      manufacturer: "HealthPlus",
      expiryDate: "2024-12-10",
      batchNo: "HP003"
    },
  ]);

  const [prescriptions] = useState([
    { 
      id: 1, 
      patientName: "John Doe", 
      doctorName: "Dr. Sarah Wilson", 
      date: "2024-01-15", 
      medicines: "Paracetamol, Amoxicillin", 
      status: "Completed",
      diagnosis: "Hypertension",
      amount: 350
    },
    { 
      id: 2, 
      patientName: "Jane Smith", 
      doctorName: "Dr. Michael Brown", 
      date: "2024-01-14", 
      medicines: "Ibuprofen", 
      status: "Pending",
      diagnosis: "Migraine",
      amount: 150
    },
  ]);

  const [formData, setFormData] = useState({});

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSearchTerm("");
  };

  const handleOpenDialog = (type, item = null) => {
    setDialogType(type);
    setSelectedItem(item);
    setFormData(item || {});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
    setFormData({});
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isEdit = selectedItem !== null;
    const newId = isEdit ? selectedItem.id : Date.now();
    const newItem = { ...formData, id: newId };

    switch (dialogType) {
      case "patient":
        if (isEdit) {
          setPatients(patients.map(p => p.id === selectedItem.id ? newItem : p));
        } else {
          setPatients([...patients, { ...newItem, status: "Active", lastVisit: new Date().toISOString().split('T')[0] }]);
        }
        break;
      case "doctor":
        if (isEdit) {
          setDoctors(doctors.map(d => d.id === selectedItem.id ? newItem : d));
        } else {
          setDoctors([...doctors, { ...newItem, status: "Active", patients: 0, rating: 5.0 }]);
        }
        break;
      case "medicine":
        if (isEdit) {
          setMedicines(medicines.map(m => m.id === selectedItem.id ? newItem : m));
        } else {
          setMedicines([...medicines, newItem]);
        }
        break;
    }

    setSnackbar({
      open: true,
      message: `${dialogType.charAt(0).toUpperCase() + dialogType.slice(1)} ${isEdit ? "updated" : "added"} successfully!`,
      severity: "success"
    });
    setLoading(false);
    handleCloseDialog();
  };

  const handleDelete = (type, id) => {
    switch (type) {
      case "patient":
        setPatients(patients.filter(p => p.id !== id));
        break;
      case "doctor":
        setDoctors(doctors.filter(d => d.id !== id));
        break;
      case "medicine":
        setMedicines(medicines.filter(m => m.id !== id));
        break;
    }
    setSnackbar({ 
      open: true, 
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`, 
      severity: "success" 
    });
  };

  const filterData = (data, searchTerm) => {
    if (!searchTerm) return data;
    return data.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const getStockStatus = (stock) => {
    if (stock < 50) return { color: 'error', icon: <WarningIcon /> };
    if (stock < 100) return { color: 'warning', icon: <WarningIcon /> };
    return { color: 'success', icon: <CheckCircleIcon /> };
  };

  const renderPatientTable = () => (
    <Fade in={true} timeout={500}>
      <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Patient</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Details</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData(patients, searchTerm).map((patient, index) => (
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
                      <PersonIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">{patient.name}</Typography>
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
                    <Typography variant="body2">{patient.condition}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Last visit: {patient.lastVisit}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={patient.status}
                    color={patient.status === "Active" ? "success" : "default"}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Edit Patient">
                      <IconButton 
                        onClick={() => handleOpenDialog("patient", patient)}
                        sx={{ color: 'primary.main' }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Patient">
                      <IconButton 
                        onClick={() => handleDelete("patient", patient.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
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
  );

  const renderDoctorTable = () => (
    <Fade in={true} timeout={500}>
      <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'secondary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Doctor</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Performance</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData(doctors, searchTerm).map((doctor, index) => (
              <TableRow 
                key={doctor.id}
                sx={{ 
                  '&:hover': { bgcolor: 'rgba(156, 39, 176, 0.04)' },
                  animation: `fadeInUp 0.5s ease ${index * 0.1}s both`
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      <DoctorIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">{doctor.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {doctor.specialization} • {doctor.experience}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">{doctor.phone}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">{doctor.email}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="body2">
                      <Badge badgeContent={doctor.patients} color="primary" sx={{ mr: 2 }}>
                        <PeopleIcon sx={{ fontSize: 16 }} />
                      </Badge>
                      Patients
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Rating: ⭐ {doctor.rating}/5.0
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={doctor.status}
                    color={doctor.status === "Active" ? "success" : "default"}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Edit Doctor">
                      <IconButton 
                        onClick={() => handleOpenDialog("doctor", doctor)}
                        sx={{ color: 'secondary.main' }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Doctor">
                      <IconButton 
                        onClick={() => handleDelete("doctor", doctor.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
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
  );

  const renderMedicineTable = () => (
    <Fade in={true} timeout={500}>
      <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'success.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Medicine</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Stock & Price</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Details</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData(medicines, searchTerm).map((medicine, index) => {
              const stockStatus = getStockStatus(medicine.stock);
              return (
                <TableRow 
                  key={medicine.id}
                  sx={{ 
                    '&:hover': { bgcolor: 'rgba(46, 125, 50, 0.04)' },
                    animation: `fadeInUp 0.5s ease ${index * 0.1}s both`
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'success.main' }}>
                        <MedicineIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">{medicine.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {medicine.category}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <InventoryIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Chip
                          label={`${medicine.stock} units`}
                          color={stockStatus.color}
                          size="small"
                          icon={stockStatus.icon}
                          sx={{ fontWeight: 'bold' }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <MoneyIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" fontWeight="bold">₹{medicine.price}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography variant="body2">{medicine.manufacturer}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        Batch: {medicine.batchNo}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Exp: {medicine.expiryDate}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Edit Medicine">
                        <IconButton 
                          onClick={() => handleOpenDialog("medicine", medicine)}
                          sx={{ color: 'success.main' }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Medicine">
                        <IconButton 
                          onClick={() => handleDelete("medicine", medicine.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fade>
  );

  const renderPrescriptionTable = () => (
    <Fade in={true} timeout={500}>
      <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'warning.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Prescription</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Patient & Doctor</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Details</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData(prescriptions, searchTerm).map((prescription, index) => (
              <TableRow 
                key={prescription.id}
                sx={{ 
                  '&:hover': { bgcolor: 'rgba(255, 152, 0, 0.04)' },
                  animation: `fadeInUp 0.5s ease ${index * 0.1}s both`
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'warning.main' }}>
                      <ReportIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">#{prescription.id}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {prescription.date}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="body2" fontWeight="bold">{prescription.patientName}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      by {prescription.doctorName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="body2">{prescription.diagnosis}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {prescription.medicines}
                    </Typography>
                    <Typography variant="caption" fontWeight="bold" color="success.main">
                      ₹{prescription.amount}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={prescription.status}
                    color={prescription.status === "Completed" ? "success" : "warning"}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fade>
  );

  const renderDialog = () => {
    const isPatient = dialogType === "patient";
    const isDoctor = dialogType === "doctor";
    const isMedicine = dialogType === "medicine";

    return (
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
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
          {isPatient && <PersonIcon />}
          {isDoctor && <DoctorIcon />}
          {isMedicine && <MedicineIcon />}
          {selectedItem ? "Edit" : "Add"} {dialogType.charAt(0).toUpperCase() + dialogType.slice(1)}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {loading && <LinearProgress sx={{ mb: 2 }} />}
          <Grid container spacing={3}>
            {isPatient && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    value={formData.age || ""}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Gender"
                    value={formData.gender || ""}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={3}
                    value={formData.address || ""}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Medical Condition"
                    value={formData.condition || ""}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  />
                </Grid>
              </>
            )}

            {isDoctor && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Doctor Name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DoctorIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Specialization"
                    value={formData.specialization || ""}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Experience"
                    value={formData.experience || ""}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g., 10 years"
                  />
                </Grid>
              </>
            )}

            {isMedicine && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Medicine Name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MedicineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Category"
                    value={formData.category || ""}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Stock Quantity"
                    type="number"
                    value={formData.stock || ""}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <InventoryIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Price (₹)"
                    type="number"
                    value={formData.price || ""}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Batch Number"
                    value={formData.batchNo || ""}
                    onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Manufacturer"
                    value={formData.manufacturer || ""}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    type="date"
                    value={formData.expiryDate || ""}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            disabled={loading}
            sx={{ minWidth: 120 }}
          >
            {loading ? 'Saving...' : (selectedItem ? "Update" : "Add")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const tabData = [
    { 
      label: "Patients", 
      icon: <PeopleIcon />, 
      count: patients.length,
      color: 'primary.main',
      bgColor: 'rgba(25, 118, 210, 0.1)'
    },
    { 
      label: "Doctors", 
      icon: <DoctorIcon />, 
      count: doctors.length,
      color: 'secondary.main',
      bgColor: 'rgba(156, 39, 176, 0.1)'
    },
    { 
      label: "Medicines", 
      icon: <MedicineIcon />, 
      count: medicines.length,
      color: 'success.main',
      bgColor: 'rgba(46, 125, 50, 0.1)'
    },
    { 
      label: "Reports", 
      icon: <ReportIcon />, 
      count: prescriptions.length,
      color: 'warning.main',
      bgColor: 'rgba(255, 152, 0, 0.1)'
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <Toolbar sx={{ py: 1 }}>
          <DashboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Hospital Admin Dashboard
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => navigate("/opd-counter")}
            sx={{ mr: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            OPD Counter
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate("/dashboard")}
            sx={{ mr: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            Doctor Panel
          </Button>
          <Button 
            color="inherit" 
            startIcon={<LogoutIcon />} 
            onClick={() => navigate("/")}
            sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Enhanced Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {tabData.map((tab, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  cursor: "pointer",
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.15)'
                  },
                  bgcolor: tab.bgColor,
                  border: activeTab === index ? `2px solid ${tab.color}` : 'none',
                  animation: `fadeInUp 0.6s ease ${index * 0.1}s both`
                }} 
                onClick={() => setActiveTab(index)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h3" fontWeight="bold" sx={{ color: tab.color, mb: 1 }}>
                        {tab.count}
                      </Typography>
                      <Typography variant="h6" color="textSecondary" fontWeight="medium">
                        {tab.label}
                      </Typography>
                    </Box>
                    <Box sx={{ color: tab.color, opacity: 0.8 }}>
                      {React.cloneElement(tab.icon, { sx: { fontSize: 48 } })}
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
                    <Typography variant="caption" color="success.main" fontWeight="bold">
                      +12% from last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Main Content */}
        <Paper sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}>
          <Box sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              sx={{ 
                px: 3,
                '& .MuiTab-root': {
                  minHeight: 72,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }
              }}
            >
              {tabData.map((tab, index) => (
                <Tab 
                  key={index} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {tab.icon}
                      {tab.label}
                      <Chip 
                        label={tab.count} 
                        size="small" 
                        sx={{ 
                          bgcolor: activeTab === index ? tab.color : 'grey.200',
                          color: activeTab === index ? 'white' : 'text.secondary',
                          fontWeight: 'bold'
                        }} 
                      />
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Box>

          <Box sx={{ p: 4 }}>
            {/* Enhanced Search and Add Button */}
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: 'center',
              mb: 4,
              gap: 2
            }}>
              <TextField
                placeholder={`Search ${tabData[activeTab].label.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'action.active' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  minWidth: 350,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: 'grey.50'
                  }
                }}
              />
              {activeTab < 3 && (
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog(["patient", "doctor", "medicine"][activeTab])}
                  sx={{ 
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                      boxShadow: '0 12px 32px rgba(25, 118, 210, 0.4)'
                    }
                  }}
                >
                  Add {tabData[activeTab].label.slice(0, -1)}
                </Button>
              )}
            </Box>

            {/* Tables */}
            {activeTab === 0 && renderPatientTable()}
            {activeTab === 1 && renderDoctorTable()}
            {activeTab === 2 && renderMedicineTable()}
            {activeTab === 3 && renderPrescriptionTable()}
          </Box>
        </Paper>
      </Container>

      {renderDialog()}

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