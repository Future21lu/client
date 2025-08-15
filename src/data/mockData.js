// Mock data for Hospital Management System
export const mockPatients = [
  {
    id: 1,
    name: "John Doe",
    age: 35,
    gender: "Male",
    phone: "9876543210",
    address: "123 Main St, Downtown",
    aadhar: "1234 5678 9012",
    status: "Active",
    department: "Cardiology",
    lastVisit: "2024-01-15",
    condition: "Hypertension",
    ration: "APL123456"
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    gender: "Female",
    phone: "9876543211",
    address: "456 Oak Ave, Uptown",
    aadhar: "2345 6789 0123",
    status: "Active",
    department: "Neurology",
    lastVisit: "2024-01-12",
    condition: "Diabetes",
    ration: "BPL789012"
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 45,
    gender: "Male",
    phone: "9876543212",
    address: "789 Pine Rd, Midtown",
    aadhar: "3456 7890 1234",
    status: "Recovered",
    department: "Pediatrics",
    lastVisit: "2024-01-08",
    condition: "Migraine",
    ration: "APL345678"
  },
  {
    id: 4,
    name: "Alice Brown",
    age: 32,
    gender: "Female",
    phone: "9876543213",
    address: "321 Elm St, Westside",
    aadhar: "4567 8901 2345",
    status: "Follow-up",
    department: "Dermatology",
    lastVisit: "2024-01-10",
    condition: "Skin Allergy",
    ration: "BPL456789"
  },
  {
    id: 5,
    name: "Charlie Wilson",
    age: 55,
    gender: "Male",
    phone: "9876543214",
    address: "654 Maple Ave, Eastside",
    aadhar: "5678 9012 3456",
    status: "Active",
    department: "Orthopedics",
    lastVisit: "2024-01-14",
    condition: "Arthritis",
    ration: "APL567890"
  }
];

export const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    specialization: "Cardiology",
    phone: "9876543220",
    email: "sarah.wilson@hospital.com",
    status: "Active",
    experience: "15 years",
    qualification: "MD, DM Cardiology"
  },
  {
    id: 2,
    name: "Dr. Michael Brown",
    specialization: "Neurology",
    phone: "9876543221",
    email: "michael.brown@hospital.com",
    status: "Active",
    experience: "12 years",
    qualification: "MD, DM Neurology"
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    specialization: "Pediatrics",
    phone: "9876543222",
    email: "emily.davis@hospital.com",
    status: "Active",
    experience: "10 years",
    qualification: "MD Pediatrics"
  },
  {
    id: 4,
    name: "Dr. James Miller",
    specialization: "Dermatology",
    phone: "9876543223",
    email: "james.miller@hospital.com",
    status: "Active",
    experience: "8 years",
    qualification: "MD Dermatology"
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    specialization: "Orthopedics",
    phone: "9876543224",
    email: "lisa.anderson@hospital.com",
    status: "Active",
    experience: "18 years",
    qualification: "MS Orthopedics"
  }
];

export const mockMedicines = [
  {
    id: 1,
    name: "Paracetamol",
    category: "Analgesic",
    stock: 500,
    price: 10,
    manufacturer: "PharmaCorp",
    expiryDate: "2025-12-31",
    batchNo: "PC001"
  },
  {
    id: 2,
    name: "Amoxicillin",
    category: "Antibiotic",
    stock: 200,
    price: 25,
    manufacturer: "MediLab",
    expiryDate: "2025-08-15",
    batchNo: "ML002"
  },
  {
    id: 3,
    name: "Ibuprofen",
    category: "Anti-inflammatory",
    stock: 300,
    price: 15,
    manufacturer: "HealthPlus",
    expiryDate: "2025-10-20",
    batchNo: "HP003"
  },
  {
    id: 4,
    name: "Metformin",
    category: "Antidiabetic",
    stock: 150,
    price: 30,
    manufacturer: "DiabetCare",
    expiryDate: "2025-06-30",
    batchNo: "DC004"
  },
  {
    id: 5,
    name: "Amlodipine",
    category: "Antihypertensive",
    stock: 80,
    price: 35,
    manufacturer: "CardioMed",
    expiryDate: "2025-09-15",
    batchNo: "CM005"
  },
  {
    id: 6,
    name: "Omeprazole",
    category: "Proton Pump Inhibitor",
    stock: 250,
    price: 20,
    manufacturer: "GastroHealth",
    expiryDate: "2025-11-10",
    batchNo: "GH006"
  }
];

export const mockPrescriptions = [
  {
    id: 1,
    patientId: 1,
    patientName: "John Doe",
    doctorId: 1,
    doctorName: "Dr. Sarah Wilson",
    date: "2024-01-15",
    diagnosis: "Hypertension",
    medicines: [
      { name: "Amlodipine", dosage: "5mg", frequency: "Once daily", duration: "30 days" },
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days" }
    ],
    notes: "Blood pressure under control. Continue medication. Follow up in 1 month.",
    status: "Completed"
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Jane Smith",
    doctorId: 2,
    doctorName: "Dr. Michael Brown",
    date: "2024-01-12",
    diagnosis: "Type 2 Diabetes",
    medicines: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days" }
    ],
    notes: "HbA1c levels improved. Continue current treatment.",
    status: "Completed"
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Bob Johnson",
    doctorId: 3,
    doctorName: "Dr. Emily Davis",
    date: "2024-01-08",
    diagnosis: "Migraine",
    medicines: [
      { name: "Ibuprofen", dosage: "400mg", frequency: "As needed", duration: "7 days" }
    ],
    notes: "Migraine episodes reduced. Take medication only when needed.",
    status: "Completed"
  },
  {
    id: 4,
    patientId: 4,
    patientName: "Alice Brown",
    doctorId: 4,
    doctorName: "Dr. James Miller",
    date: "2024-01-10",
    diagnosis: "Skin Allergy",
    medicines: [
      { name: "Paracetamol", dosage: "500mg", frequency: "Three times daily", duration: "5 days" }
    ],
    notes: "Allergic reaction subsiding. Complete the course.",
    status: "Pending"
  }
];

export const mockVisitHistory = {
  1: [
    {
      date: "2024-01-15",
      diagnosis: "Hypertension",
      medicines: "Amlodipine 5mg, Metformin 500mg",
      notes: "Blood pressure under control. Continue medication.",
      doctor: "Dr. Sarah Wilson",
      vitals: { bp: "130/80", pulse: "72", temp: "98.6°F" }
    },
    {
      date: "2023-12-15",
      diagnosis: "Hypertension - Initial",
      medicines: "Amlodipine 5mg",
      notes: "Newly diagnosed hypertension. Lifestyle changes recommended.",
      doctor: "Dr. Sarah Wilson",
      vitals: { bp: "150/95", pulse: "78", temp: "98.4°F" }
    }
  ],
  2: [
    {
      date: "2024-01-12",
      diagnosis: "Type 2 Diabetes",
      medicines: "Metformin 500mg",
      notes: "HbA1c levels improved. Continue current treatment.",
      doctor: "Dr. Michael Brown",
      vitals: { bp: "120/75", pulse: "68", temp: "98.2°F", sugar: "140 mg/dl" }
    },
    {
      date: "2023-11-20",
      diagnosis: "Type 2 Diabetes - Initial",
      medicines: "Metformin 500mg",
      notes: "Newly diagnosed diabetes. Diet and exercise counseling provided.",
      doctor: "Dr. Michael Brown",
      vitals: { bp: "125/80", pulse: "70", temp: "98.5°F", sugar: "180 mg/dl" }
    }
  ],
  3: [
    {
      date: "2024-01-08",
      diagnosis: "Migraine",
      medicines: "Ibuprofen 400mg",
      notes: "Migraine episodes reduced. Take medication only when needed.",
      doctor: "Dr. Emily Davis",
      vitals: { bp: "115/70", pulse: "65", temp: "98.1°F" }
    }
  ],
  4: [
    {
      date: "2024-01-10",
      diagnosis: "Skin Allergy",
      medicines: "Paracetamol 500mg",
      notes: "Allergic reaction subsiding. Complete the course.",
      doctor: "Dr. James Miller",
      vitals: { bp: "118/72", pulse: "70", temp: "98.3°F" }
    }
  ]
};

export const departments = [
  "General Medicine",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
  "ENT",
  "Obstetrics and Gynaecology",
  "General Surgery",
  "Anesthesiology",
  "Pathology",
  "Biochemistry",
  "Dentistry",
  "Microbiology",
  "Pharmacology",
  "Physiology",
  "Psychiatry",
  "Radiology"
];

export const labTests = [
  "Blood Sugar",
  "CBC (Complete Blood Count)",
  "Liver Function Test",
  "Kidney Function Test",
  "Urine Routine",
  "ECG",
  "X-Ray Chest",
  "Lipid Profile",
  "Thyroid Function Test",
  "HbA1c"
];

export const otherTests = [
  "ECG Follow-up",
  "Specialist Consultation",
  "Nutrition Counseling",
  "Physiotherapy",
  "Health Checkup",
  "Vaccination",
  "Dressing",
  "Injection"
];

// Utility functions
export const getPatientById = (id) => mockPatients.find(patient => patient.id === parseInt(id));
export const getDoctorById = (id) => mockDoctors.find(doctor => doctor.id === parseInt(id));
export const getMedicineById = (id) => mockMedicines.find(medicine => medicine.id === parseInt(id));
export const getPrescriptionsByPatientId = (patientId) => mockPrescriptions.filter(prescription => prescription.patientId === parseInt(patientId));
export const getPrescriptionsByDoctorId = (doctorId) => mockPrescriptions.filter(prescription => prescription.doctorId === parseInt(doctorId));