// File: src/pages/OPDCounterDashboard.jsx
// v13 — Move both cards slightly to the right, reduce Items card width,
// and make Enter print when inputs are empty but Items has content.

import React, { useMemo, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Paper,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Container,
  Snackbar,
  Alert,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  MenuItem,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import bg from "../assets/bg.png";
import { QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import { departments, labTests, otherTests } from "../data/mockData";

// === Layout constants ===
const SPACER_COL = 64;           // px — pushes both cards slightly to the RIGHT
const LEFT_CARD_WIDTH = 620;     // px — Patient Registration
const RIGHT_CARD_WIDTH = 560;    // px — Items (reduced width)
const LEFT_CARD_HEIGHT = 560;    // px
const RIGHT_CARD_HEIGHT = 520;   // px — slightly shorter

export const OPDCounterDashboard = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    place: "",
    aadhar: "",
    gender: "",
    department: "",
    labTestsSelected: [],
    otherSelected: [],
    ration: "",
  });
  const [mode, setMode] = useState("OPD");
  const [openHelp, setOpenHelp] = useState(false);
  const [qrData, setQRData] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [items, setItems] = useState([]); // {id, type:'dept'|'lab'|'other', label, price}
  const total = useMemo(() => items.reduce((s, it) => s + (Number(it.price) || 0), 0), [items]);

  const [deptInput, setDeptInput] = useState("");
  const [labInput, setLabInput] = useState("");
  const [otherInput, setOtherInput] = useState("");

  const deptRef = useRef(null);
  const labRef = useRef(null);
  const otherRef = useRef(null);
  const printBtnRef = useRef(null);
  const toggleOPDRef = useRef(null);
  const toggleLabRef = useRef(null);
  const toggleOtherRef = useRef(null);

  const upsertItem = (predicate, newItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(predicate);
      if (idx === -1) return [...prev, newItem];
      const next = [...prev];
      next[idx] = { ...prev[idx], ...newItem };
      return next;
    });
  };
  const removeItems = (pred) => setItems((prev) => prev.filter((x) => !pred(x)));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAadhar = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 12);
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setFormData((prev) => ({ ...prev, aadhar: value }));
  };

  const getSuggestion = (list, input, exclude = []) => {
    if (!input) return "";
    const lower = input.toLowerCase();
    const cand = list.find((x) => x.toLowerCase().startsWith(lower) && !exclude.includes(x));
    return cand || "";
  };

  const handleDepartmentSelect = (event, value) => {
    const val = value || "";
    setFormData((prev) => ({ ...prev, department: val }));
    if (val) upsertItem((x) => x.type === "dept", { id: "dept", type: "dept", label: `Department: ${val}`, price: 20 });
    else removeItems((x) => x.type === "dept");
  };

  const addLabByLabel = (label) => {
    if (!label || formData.labTestsSelected.includes(label)) return;
    const price = 100 + Math.floor(Math.random() * 300);
    setFormData((prev) => ({ ...prev, labTestsSelected: [...prev.labTestsSelected, label] }));
    upsertItem((x) => x.type === "lab" && x.label === label, { id: `lab-${label}`, type: "lab", label, price });
  };
  const addOtherByLabel = (label) => {
    if (!label || formData.otherSelected.includes(label)) return;
    const price = 100 + Math.floor(Math.random() * 300);
    setFormData((prev) => ({ ...prev, otherSelected: [...prev.otherSelected, label] }));
    upsertItem((x) => x.type === "other" && x.label === label, { id: `other-${label}`, type: "other", label, price });
  };

  const handleLabChange = (event, values) => {
    values.forEach(addLabByLabel);
    removeItems((x) => x.type === "lab" && !values.includes(x.label));
  };
  const handleOtherChange = (event, values) => {
    values.forEach(addOtherByLabel);
    removeItems((x) => x.type === "other" && !values.includes(x.label));
  };

  const deleteItem = (item) => {
    removeItems((x) => x.id === item.id);
    if (item.type === "lab") setFormData((p) => ({ ...p, labTestsSelected: p.labTestsSelected.filter((t) => t !== item.label) }));
    else if (item.type === "other") setFormData((p) => ({ ...p, otherSelected: p.otherSelected.filter((t) => t !== item.label) }));
    else if (item.type === "dept") setFormData((p) => ({ ...p, department: "" }));
  };

  // PRINT (Enter anywhere except inside a typeahead with value)
  const onKeyDownGlobal = (e) => {
    const isTypeahead = deptRef.current?.contains(e.target) || labRef.current?.contains(e.target) || otherRef.current?.contains(e.target);
    if (e.key === "Enter" && !e.shiftKey && !isTypeahead) {
      e.preventDefault();
      handlePrintSlip();
    }
  };

  // If input is empty AND there are items, Enter should print.
  const tryEnterToPrintFromEmpty = (e, inputVal) => {
    if (e.key === "Enter" && !inputVal && items.length > 0) {
      e.preventDefault();
      handlePrintSlip();
      return true;
    }
    return false;
  };

  // Key handling for typeahead inputs (valid-only + empty-enter prints)
  const onDeptKeyDown = (e) => {
    if (tryEnterToPrintFromEmpty(e, deptInput)) return;
    const suggestion = getSuggestion(departments, deptInput);
    if (e.key === "Tab") {
      if (deptInput && suggestion) {
        e.preventDefault();
        setDeptInput(suggestion);
        handleDepartmentSelect(null, suggestion);
      }
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const value = suggestion; // only accept valid
      if (value) handleDepartmentSelect(null, value);
    }
  };
  const onLabKeyDown = (e) => {
    if (tryEnterToPrintFromEmpty(e, labInput)) return;
    const suggestion = getSuggestion(labTests, labInput, formData.labTestsSelected);
    if (e.key === "Tab") {
      if (labInput && suggestion) {
        e.preventDefault();
        setLabInput(suggestion);
      }
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const value = suggestion; // only accept valid
      if (value) {
        addLabByLabel(value);
        setLabInput("");
        setTimeout(() => labRef.current?.querySelector("input")?.focus(), 0);
      }
    }
  };
  const onOtherKeyDown = (e) => {
    if (tryEnterToPrintFromEmpty(e, otherInput)) return;
    const suggestion = getSuggestion(otherTests, otherInput, formData.otherSelected);
    if (e.key === "Tab") {
      if (otherInput && suggestion) {
        e.preventDefault();
        setOtherInput(suggestion);
      }
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const value = suggestion; // only accept valid
      if (value) {
        addOtherByLabel(value);
        setOtherInput("");
        setTimeout(() => otherRef.current?.querySelector("input")?.focus(), 0);
      }
    }
  };

  const onPrintKeyDown = (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const ref = mode === "OPD" ? toggleOPDRef : mode === "Lab" ? toggleLabRef : toggleOtherRef;
      ref.current?.focus();
    }
  };

  const validateFields = () => {
    const { name, age, place, aadhar, gender } = formData;
    if (!name || !age || !place || !aadhar || !gender) return false;
    return aadhar.replace(/\s/g, "").length === 12;
  };

  const handlePrintSlip = () => {
    if (!validateFields()) {
      setSnackbar({ open: true, message: "Please fill all required fields correctly.", severity: "error" });
      return;
    }
    const id = `PID${Math.floor(100000 + Math.random() * 900000)}`;
    const data = { ...formData, id, mode, items, total, time: new Date().toLocaleString() };
    setQRData(JSON.stringify({ id, total }));

    const doc = new jsPDF();
    doc.text("CliniQ - Patient OPD Slip", 14, 16);
    doc.autoTable({
      head: [["Field", "Value"]],
      body: [
        ["Patient ID", id],
        ["Name", formData.name],
        ["Age", formData.age],
        ["Place", formData.place],
        ["Aadhar", formData.aadhar],
        ["Gender", formData.gender],
        ["Mode", mode],
        ["Date/Time", data.time],
      ],
      startY: 22,
      theme: "striped",
    });
    const itemRows = items.map((it) => [it.label, `₹${it.price}`]);
    if (itemRows.length) doc.autoTable({ head: [["Item", "Price"]], body: itemRows, startY: (doc.lastAutoTable?.finalY || 40) + 6 });
    const finalY = doc.lastAutoTable?.finalY || 40;
    doc.text(`Total: ₹${total}`, 14, finalY + 10);
    doc.save(`${id}_slip.pdf`);
    setSnackbar({ open: true, message: "Slip generated.", severity: "success" });
  };

  const GhostOverlay = ({ value, list, exclude = [] }) => {
    const suggestion = getSuggestion(list, value, exclude);
    const suffix = suggestion && value && suggestion.toLowerCase().startsWith(value.toLowerCase()) ? suggestion.slice(value.length) : "";
    if (!suffix) return null;
    return (
      <Box sx={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(0,0,0,0.35)", font: "inherit", whiteSpace: "pre", width: "calc(100% - 28px)", overflow: "hidden" }}>
        <span style={{ visibility: "hidden" }}>{value}</span>
        <span>{suffix}</span>
      </Box>
    );
  };

  const getCols = () => {
    switch (mode) {
      case "OPD":
        return "1.6fr 1fr 1fr";
      case "Lab":
        return "1.1fr 1.8fr 1.1fr";
      case "Other":
        return "1fr 1fr 1.6fr";
      default:
        return "1fr 1fr 1fr";
    }
  };
  const highlightSx = (active) => ({
    border: active ? "2px solid #1976d2" : "1px solid rgba(0,0,0,0.12)",
    borderRadius: 1,
    transition: "border-color 200ms ease, box-shadow 200ms ease",
    boxShadow: active ? "0 0 0 3px rgba(25,118,210,0.15)" : "none",
    padding: 0.5,
  });

  return (
    <Box sx={{ minHeight: "100vh", backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} onKeyDown={onKeyDownGlobal}>
      <AppBar position="static" elevation={2} sx={{ bgcolor: "#000", color: "#fff" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#fff" }}>CliniQ</Typography>
          <Button color="inherit" startIcon={<HelpOutlineIcon />} onClick={() => setOpenHelp(true)}>Help</Button>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={() => navigate("/")}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Fixed grid with a left spacer column to push both cards to the RIGHT */}
      <Container maxWidth={false} sx={{ mt: 5 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `${SPACER_COL}px ${LEFT_CARD_WIDTH}px ${RIGHT_CARD_WIDTH}px`,
            justifyContent: 'center',
            columnGap: 32,
            rowGap: 32,
            width: '100%',
          }}
        >
          {/* LEFT: Patient Registration */}
          <Paper sx={{ p: 3, borderRadius: 4, height: `${LEFT_CARD_HEIGHT}px`, width: `${LEFT_CARD_WIDTH}px`, display: 'flex', flexDirection: 'column', overflow: 'hidden', gridColumn: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
              <PersonAddAlt1Icon sx={{ fontSize: 42, mr: 1 }} />
              <Typography variant="h5" fontWeight="bold" sx={{ textDecoration: 'underline' }}>
                Patient Registration
              </Typography>
            </Box>

            {/* Two-column form */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField fullWidth required name="aadhar" label="Aadhar*" value={formData.aadhar} onChange={handleAadhar} inputProps={{ inputMode: 'numeric', pattern: "\\d{4} \\d{4} \\d{4}" }} sx={{ '& .MuiInputBase-root': { height: '56px' } }} />
              <TextField fullWidth required name="name" label="Name*" value={formData.name} onChange={handleChange} inputProps={{ inputMode: 'text' }} sx={{ '& .MuiInputBase-root': { height: '56px' } }} />
              <TextField fullWidth required name="age" label="Age*" type="number" value={formData.age} onChange={handleChange} sx={{ '& .MuiInputBase-root': { height: '56px' } }} />
              <TextField fullWidth required name="place" label="Place*" value={formData.place} onChange={handleChange} inputProps={{ inputMode: 'text' }} sx={{ '& .MuiInputBase-root': { height: '56px' } }} />
              <TextField select fullWidth required name="gender" label="Gender*" value={formData.gender} onChange={handleChange} sx={{ '& .MuiInputBase-root': { height: '56px' } }}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField fullWidth name="ration" label="Ration Card No." value={formData.ration} onChange={handleChange} sx={{ '& .MuiInputBase-root': { height: '56px' } }} />
            </Box>

            {/* Toggle */}
            <Box textAlign="center" my={2}>
              <ToggleButtonGroup value={mode} exclusive onChange={(e, v) => v && setMode(v)}>
                <ToggleButton ref={toggleOPDRef} value="OPD">Department</ToggleButton>
                <ToggleButton ref={toggleLabRef} value="Lab">Lab Tests</ToggleButton>
                <ToggleButton ref={toggleOtherRef} value="Other">Other Tests</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Animated three selectors */}
            <Box sx={{ display: 'grid', gridTemplateColumns: getCols(), gap: 2, transition: 'grid-template-columns 300ms ease' }}>
              <Box sx={{ position: 'relative', ...highlightSx(mode==='OPD') }} ref={deptRef}>
                <GhostOverlay value={deptInput} list={departments} />
                <Autocomplete
                  options={departments}
                  value={formData.department || null}
                  inputValue={deptInput}
                  onInputChange={(e, val) => setDeptInput(val)}
                  onChange={(e, val) => handleDepartmentSelect(e, val)}
                  freeSolo={false}
                  disableClearable
                  renderInput={(params) => (
                    <TextField {...params} label="Department*" required disabled={mode !== 'OPD'} onKeyDown={onDeptKeyDown} sx={{ '& .MuiInputBase-root': { height: '56px' } }} />
                  )}
                  disabled={mode !== 'OPD'}
                  renderTags={() => null}
                  disablePortal
                />
              </Box>

              <Box sx={{ position: 'relative', ...highlightSx(mode==='Lab') }} ref={labRef}>
                <GhostOverlay value={labInput} list={labTests} exclude={formData.labTestsSelected} />
                <Autocomplete
                  multiple
                  options={labTests}
                  filterSelectedOptions
                  value={formData.labTestsSelected}
                  inputValue={labInput}
                  onInputChange={(e, val) => setLabInput(val)}
                  onChange={handleLabChange}
                  freeSolo={false}
                  disableCloseOnSelect
                  disableClearable
                  renderTags={() => null}
                  renderInput={(params) => (
                    <TextField {...params} label="Lab Test(s)*" required disabled={mode !== 'Lab'} onKeyDown={onLabKeyDown} sx={{ '& .MuiInputBase-root': { minHeight: '56px' } }} />
                  )}
                  disabled={mode !== 'Lab'}
                  disablePortal
                />
              </Box>

              <Box sx={{ position: 'relative', ...highlightSx(mode==='Other') }} ref={otherRef}>
                <GhostOverlay value={otherInput} list={otherTests} exclude={formData.otherSelected} />
                <Autocomplete
                  multiple
                  options={otherTests}
                  filterSelectedOptions
                  value={formData.otherSelected}
                  inputValue={otherInput}
                  onInputChange={(e, val) => setOtherInput(val)}
                  onChange={handleOtherChange}
                  freeSolo={false}
                  disableCloseOnSelect
                  disableClearable
                  renderTags={() => null}
                  renderInput={(params) => (
                    <TextField {...params} label="Other Test(s)*" required disabled={mode !== 'Other'} onKeyDown={onOtherKeyDown} sx={{ '& .MuiInputBase-root': { minHeight: '56px' } }} />
                  )}
                  disabled={mode !== 'Other'}
                  disablePortal
                />
              </Box>
            </Box>

            <Box mt={3} />
            <Box sx={{ flexGrow: 1 }} />

            <Box display="flex" justifyContent="center" mt={2}>
              <Button ref={printBtnRef} variant="contained" size="large" onClick={handlePrintSlip} onKeyDown={onPrintKeyDown} sx={{ px: 5, py: 1.5, bgcolor: 'black' }}>
                PRINT SLIP
              </Button>
            </Box>

            <Box mt={2} display="flex" justifyContent="center" sx={{ minHeight: 130 }}>
              {qrData && <QRCodeSVG value={qrData} size={120} />}
            </Box>
          </Paper>

          {/* RIGHT: Items */}
          <Paper sx={{ p: 2, borderRadius: 4, height: `${RIGHT_CARD_HEIGHT}px`, width: `${RIGHT_CARD_WIDTH}px`, display: 'flex', flexDirection: 'column', overflow: 'hidden', gridColumn: 3, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Items</Typography>
            <Divider sx={{ mb: 1 }} />
            <List
              dense
              sx={{
                flexGrow: 1,
                overflowY: 'scroll',
                overflowX: 'hidden',
                scrollbarGutter: 'stable both-edges',
                bgcolor: '#fff',
                borderRadius: 2,
                minWidth: 0,
              }}
            >
              {items.length === 0 && (
                <ListItem>
                  <ListItemText
                    primary="No items added yet"
                    secondary="Select Department/Lab/Other to add"
                    primaryTypographyProps={{ noWrap: true, sx: { textOverflow: 'ellipsis' } }}
                    secondaryTypographyProps={{ noWrap: true, sx: { textOverflow: 'ellipsis' } }}
                  />
                </ListItem>
              )}
              {items.map((it) => (
                <ListItem
                  key={it.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(it)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{ minWidth: 0 }}
                >
                  <ListItemText
                    primary={it.label}
                    secondary={`₹${it.price}`}
                    primaryTypographyProps={{ noWrap: true, sx: { overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 } }}
                    secondaryTypographyProps={{ noWrap: true, sx: { overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 } }}
                    sx={{ minWidth: 0 }}
                  />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" fontWeight={700}>Total</Typography>
              <Typography variant="h6" fontWeight={800}>₹{total}</Typography>
            </Box>
          </Paper>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ position: 'fixed', right: 12, bottom: 8, color: '#fff', fontSize: 12 }}>© Manmed Dynamics.</Box>

      {/* Help */}
      <Dialog open={openHelp} onClose={() => setOpenHelp(false)}>
        <DialogTitle>Help & Emergency Contacts</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ul>
              <li>Type to search; Tab to complete suggestion; Enter to add (Lab/Other). Only valid options are accepted.</li>
              <li>Department cost is fixed at ₹20. Lab/Other vary per test.</li>
              <li>Press Enter elsewhere to print. After Print, Tab goes to toggles.</li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenHelp(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
