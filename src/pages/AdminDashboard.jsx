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
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { 
  mockPatients, 
  mockDoctors, 
  mockMedicines, 
  mockPrescriptions 
} from "../data/mockData";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Initialize state with mock data
  const [patients, setPatients] = useState([...mockPatients]);
  const [doctors, setDoctors] = useState([...mockDoctors]);
  const [medicines, setMedicines] = useState([...mockMedicines]);
  const [prescriptions] = useState([...mockPrescriptions]);

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

  const handleSave = () => {
    const isEdit = selectedItem !== null;
    const newId = isEdit ? selectedItem.id : Date.now();
    const newItem = { ...formData, id: newId };

    switch (dialogType) {
      case "patient":
        if (isEdit) {
          setPatients(patients.map(p => p.id === selectedItem.id ? newItem : p));
        } else {
          setPatients([...patients, { ...newItem, status: "Active" }]);
        }
        break;
      case "doctor":
        if (isEdit) {
          setDoctors(doctors.map(d => d.id === selectedItem.id ? newItem : d));
        } else {
          setDoctors([...doctors, { ...newItem, status: "Active" }]);
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
      message: `${dialogType} ${isEdit ? "updated" : "added"} successfully!`,
      severity: "success"
    });
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
    setSnackbar({ open: true, message: `${type} deleted successfully!`, severity: "success" });
  };

  const filterData = (data, searchTerm) => {
    if (!searchTerm) return data;
    return data.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const renderPatientTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterData(patients, searchTerm).map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.address}</TableCell>
              <TableCell>{patient.department}</TableCell>
              <TableCell>
                <Chip
                  label={patient.status}
                  color={patient.status === "Active" ? "success" : "default"}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpenDialog("patient", patient)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete("patient", patient.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderDoctorTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Specialization</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Experience</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterData(doctors, searchTerm).map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>{doctor.name}</TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell>{doctor.phone}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>{doctor.experience}</TableCell>
              <TableCell>
                <Chip
                  label={doctor.status}
                  color={doctor.status === "Active" ? "success" : "default"}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpenDialog("doctor", doctor)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete("doctor", doctor.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderMedicineTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Price (₹)</TableCell>
            <TableCell>Manufacturer</TableCell>
            <TableCell>Batch No</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterData(medicines, searchTerm).map((medicine) => (
            <TableRow key={medicine.id}>
              <TableCell>{medicine.name}</TableCell>
              <TableCell>{medicine.category}</TableCell>
              <TableCell>
                <Chip
                  label={medicine.stock}
                  color={medicine.stock < 100 ? "error" : "success"}
                  size="small"
                />
              </TableCell>
              <TableCell>₹{medicine.price}</TableCell>
              <TableCell>{medicine.manufacturer}</TableCell>
              <TableCell>{medicine.batchNo}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpenDialog("medicine", medicine)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete("medicine", medicine.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderPrescriptionTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Diagnosis</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterData(prescriptions, searchTerm).map((prescription) => (
            <TableRow key={prescription.id}>
              <TableCell>{prescription.patientName}</TableCell>
              <TableCell>{prescription.doctorName}</TableCell>
              <TableCell>{prescription.date}</TableCell>
              <TableCell>{prescription.diagnosis}</TableCell>
              <TableCell>
                <Chip
                  label={prescription.status}
                  color={prescription.status === "Completed" ? "success" : "warning"}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderDialog = () => {
    const isPatient = dialogType === "patient";
    const isDoctor = dialogType === "doctor";
    const isMedicine = dialogType === "medicine";

    return (
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedItem ? "Edit" : "Add"} {dialogType.charAt(0).toUpperCase() + dialogType.slice(1)}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {isPatient && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    label="Phone"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={2}
                    value={formData.address || ""}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    value={formData.department || ""}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Aadhar Number"
                    value={formData.aadhar || ""}
                    onChange={(e) => setFormData({ ...formData, aadhar: e.target.value })}
                  />
                </Grid>
              </>
            )}

            {isDoctor && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    label="Phone"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Experience"
                    value={formData.experience || ""}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Qualification"
                    value={formData.qualification || ""}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
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
                    label="Stock"
                    type="number"
                    value={formData.stock || ""}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Price (₹)"
                    type="number"
                    value={formData.price || ""}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                    label="Batch Number"
                    value={formData.batchNo || ""}
                    onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })}
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
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {selectedItem ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const tabData = [
    { label: "Patients", icon: <PeopleIcon />, count: patients.length },
    { label: "Doctors", icon: <DoctorIcon />, count: doctors.length },
    { label: "Medicines", icon: <MedicineIcon />, count: medicines.length },
    { label: "Reports", icon: <ReportIcon />, count: prescriptions.length },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Hospital Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={() => navigate("/opd-counter")}>
            OPD Counter
          </Button>
          <Button color="inherit" onClick={() => navigate("/dashboard")}>
            Doctor Panel
          </Button>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={() => navigate("/")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {tabData.map((tab, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ cursor: "pointer" }} onClick={() => setActiveTab(index)}>
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ mr: 2, color: "#1976d2" }}>{tab.icon}</Box>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {tab.count}
                    </Typography>
                    <Typography color="textSecondary">{tab.label}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Main Content */}
        <Paper sx={{ p: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
            {tabData.map((tab, index) => (
              <Tab key={index} label={tab.label} icon={tab.icon} />
            ))}
          </Tabs>

          {/* Search and Add Button */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <TextField
              placeholder={`Search ${tabData[activeTab].label.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: "action.active" }} />,
              }}
              sx={{ minWidth: 300 }}
            />
            {activeTab < 3 && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog(["patient", "doctor", "medicine"][activeTab])}
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
        </Paper>
      </Container>

      {renderDialog()}

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