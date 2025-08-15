import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import {
  Users, Stethoscope, Pill, FileText, MoreHorizontal, Search, PlusCircle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, LogOut, Sun, Moon, Hospital
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  mockPatients, 
  mockDoctors, 
  mockMedicines, 
  mockPrescriptions 
} from '../data/mockData';

// Styled Components
const StyledCard = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
    {children}
  </div>
);

const StyledButton = ({ children, onClick, className = '', variant = 'primary', disabled = false }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </button>
  );
};

const StyledInput = ({ value, onChange, placeholder, icon, className = '' }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const StyledModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-full overflow-y-auto">
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const DropdownMenu = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
        {trigger}
      </button>
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20 border dark:border-gray-700"
          onMouseLeave={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownMenuItem = ({ children, onClick }) => (
  <button onClick={onClick} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
    {children}
  </button>
);

const Badge = ({ children, color }) => {
    const colorClasses = {
        green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClasses[color]}`}>{children}</span>;
}

const DataTable = ({ columns, data, onEdit, onDelete, filterTerm }) => {
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;

    const filteredData = useMemo(() =>
        data.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(filterTerm.toLowerCase())
            )
        ), [data, filterTerm]);

    const paginatedData = useMemo(() =>
        filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [filteredData, page, rowsPerPage]
    );
    
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    return (
        <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.accessor} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {col.Header}
                            </th>
                        ))}
                        {(onEdit || onDelete) && <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>}
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedData.map((row) => (
                        <tr key={row.id}>
                            {columns.map((col) => (
                                <td key={col.accessor} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                    {col.Cell ? col.Cell({ value: row[col.accessor] }) : row[col.accessor]}
                                </td>
                            ))}
                            {(onEdit || onDelete) && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                    <DropdownMenu trigger={<MoreHorizontal size={20} />}>
                                        {onEdit && <DropdownMenuItem onClick={() => onEdit(row)}>Edit</DropdownMenuItem>}
                                        {onDelete && <DropdownMenuItem onClick={() => onDelete(row.id)}>Delete</DropdownMenuItem>}
                                    </DropdownMenu>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center justify-between py-4 px-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    Page {page + 1} of {totalPages || 1}
                </span>
                <div className="flex items-center gap-2">
                    <StyledButton variant="ghost" onClick={() => setPage(0)} disabled={page === 0}><ChevronsLeft size={16} /></StyledButton>
                    <StyledButton variant="ghost" onClick={() => setPage(p => p - 1)} disabled={page === 0}><ChevronLeft size={16} /></StyledButton>
                    <StyledButton variant="ghost" onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}><ChevronRight size={16} /></StyledButton>
                    <StyledButton variant="ghost" onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1}><ChevronsRight size={16} /></StyledButton>
                </div>
            </div>
        </div>
    );
};

const FormField = ({ label, children, className = '' }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    {children}
  </div>
);

const FormInput = (props) => (
  <input {...props} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
);

const FormSelect = ({ children, ...props }) => (
  <select {...props} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
    {children}
  </select>
);

// Dashboard Section with Charts
const DashboardSection = ({ stats }) => {
    const genderData = useMemo(() => {
        const maleCount = mockPatients.filter(p => p.gender === 'Male').length;
        const femaleCount = mockPatients.filter(p => p.gender === 'Female').length;
        return [
            { name: 'Male', value: maleCount, color: '#3b82f6' },
            { name: 'Female', value: femaleCount, color: '#ec4899' }
        ];
    }, []);

    const medicineStockData = useMemo(() => 
        mockMedicines.map(med => ({
            name: med.name,
            stock: med.stock
        }))
    , []);

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StyledCard className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-white bg-opacity-20 mr-4">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm opacity-90">Patients</p>
                            <p className="text-2xl font-bold">{stats.patients}</p>
                        </div>
                    </div>
                </StyledCard>

                <StyledCard className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-white bg-opacity-20 mr-4">
                            <Stethoscope size={24} />
                        </div>
                        <div>
                            <p className="text-sm opacity-90">Doctors</p>
                            <p className="text-2xl font-bold">{stats.doctors}</p>
                        </div>
                    </div>
                </StyledCard>

                <StyledCard className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-white bg-opacity-20 mr-4">
                            <Pill size={24} />
                        </div>
                        <div>
                            <p className="text-sm opacity-90">Medicines</p>
                            <p className="text-2xl font-bold">{stats.medicines}</p>
                        </div>
                    </div>
                </StyledCard>

                <StyledCard className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-white bg-opacity-20 mr-4">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-sm opacity-90">Reports</p>
                            <p className="text-2xl font-bold">{stats.reports}</p>
                        </div>
                    </div>
                </StyledCard>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StyledCard>
                    <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Patient Gender Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie 
                                data={genderData} 
                                dataKey="value" 
                                nameKey="name" 
                                cx="50%" 
                                cy="50%" 
                                outerRadius={80} 
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {genderData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </StyledCard>

                <StyledCard>
                    <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Medicine Stock Levels</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={medicineStockData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(200, 200, 200, 0.2)" />
                            <XAxis dataKey="name" tick={{ fill: '#a0a0a0', fontSize: 12 }} />
                            <YAxis tick={{ fill: '#a0a0a0', fontSize: 12 }} />
                            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} labelStyle={{ color: '#fff' }} />
                            <Legend />
                            <Bar dataKey="stock" fill="#8b5cf6" />
                        </BarChart>
                    </ResponsiveContainer>
                </StyledCard>
            </div>
        </div>
    );
};

// Section Components
const PatientSection = ({ patients, setPatients, filterTerm, handleOpenModal }) => {
    const columns = [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Age', accessor: 'age' },
        { Header: 'Gender', accessor: 'gender' },
        { Header: 'Phone', accessor: 'phone' },
        { Header: 'Department', accessor: 'department' },
        { Header: 'Status', accessor: 'status', Cell: ({ value }) => <Badge color={value === 'Active' ? 'green' : 'gray'}>{value}</Badge> },
    ];
    return <DataTable columns={columns} data={patients} onEdit={(item) => handleOpenModal('patient', item)} onDelete={(id) => setPatients(p => p.filter(i => i.id !== id))} filterTerm={filterTerm} />;
};

const DoctorSection = ({ doctors, setDoctors, filterTerm, handleOpenModal }) => {
    const columns = [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Specialization', accessor: 'specialization' },
        { Header: 'Phone', accessor: 'phone' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Experience', accessor: 'experience' },
        { Header: 'Status', accessor: 'status', Cell: ({ value }) => <Badge color={value === 'Active' ? 'green' : 'gray'}>{value}</Badge> },
    ];
    return <DataTable columns={columns} data={doctors} onEdit={(item) => handleOpenModal('doctor', item)} onDelete={(id) => setDoctors(d => d.filter(i => i.id !== id))} filterTerm={filterTerm} />;
};

const MedicineSection = ({ medicines, setMedicines, filterTerm, handleOpenModal }) => {
    const columns = [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Category', accessor: 'category' },
        { Header: 'Stock', accessor: 'stock', Cell: ({ value }) => <Badge color={value < 100 ? 'red' : 'green'}>{value}</Badge> },
        { Header: 'Price', accessor: 'price', Cell: ({ value }) => `₹${value}` },
        { Header: 'Manufacturer', accessor: 'manufacturer' },
        { Header: 'Batch No', accessor: 'batchNo' },
    ];
    return <DataTable columns={columns} data={medicines} onEdit={(item) => handleOpenModal('medicine', item)} onDelete={(id) => setMedicines(m => m.filter(i => i.id !== id))} filterTerm={filterTerm} />;
};

const ReportSection = ({ reports, filterTerm }) => {
    const columns = [
        { Header: 'Patient', accessor: 'patientName' },
        { Header: 'Doctor', accessor: 'doctorName' },
        { Header: 'Date', accessor: 'date' },
        { Header: 'Diagnosis', accessor: 'diagnosis' },
        { Header: 'Status', accessor: 'status', Cell: ({ value }) => <Badge color={value === 'Completed' ? 'green' : 'yellow'}>{value}</Badge> },
    ];
    return <DataTable columns={columns} data={reports} filterTerm={filterTerm} />;
};

// Main Component
function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [patients, setPatients] = useState([...mockPatients]);
  const [doctors, setDoctors] = useState([...mockDoctors]);
  const [medicines, setMedicines] = useState([...mockMedicines]);
  const [reports] = useState([...mockPrescriptions]);
  const [filterTerm, setFilterTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize dark mode
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setCurrentItem(item);
    setFormData(item || {});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setFormData({});
  };

  const handleSave = () => {
    const isEdit = currentItem !== null;
    const newId = isEdit ? currentItem.id : Date.now();
    const newItem = { ...formData, id: newId };

    switch (modalType) {
      case 'patient':
        setPatients(isEdit ? patients.map(p => p.id === currentItem.id ? newItem : p) : [...patients, { ...newItem, status: "Active" }]);
        break;
      case 'doctor':
        setDoctors(isEdit ? doctors.map(d => d.id === currentItem.id ? newItem : d) : [...doctors, { ...newItem, status: "Active" }]);
        break;
      case 'medicine':
        setMedicines(isEdit ? medicines.map(m => m.id === currentItem.id ? newItem : m) : [...medicines, newItem]);
        break;
      default: break;
    }
    handleCloseModal();
  };
  
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
      document.documentElement.classList.toggle('dark');
  }

  const TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: <Hospital size={20} /> },
    { id: 'patients', label: 'Patients', icon: <Users size={20} /> },
    { id: 'doctors', label: 'Doctors', icon: <Stethoscope size={20} /> },
    { id: 'medicines', label: 'Medicines', icon: <Pill size={20} /> },
    { id: 'reports', label: 'Reports', icon: <FileText size={20} /> },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
        case 'dashboard':
            return <DashboardSection stats={{ patients: patients.length, doctors: doctors.length, medicines: medicines.length, reports: reports.length }} />;
        case 'patients':
            return <PatientSection patients={patients} setPatients={setPatients} filterTerm={filterTerm} handleOpenModal={handleOpenModal} />;
        case 'doctors':
            return <DoctorSection doctors={doctors} setDoctors={setDoctors} filterTerm={filterTerm} handleOpenModal={handleOpenModal} />;
        case 'medicines':
            return <MedicineSection medicines={medicines} setMedicines={setMedicines} filterTerm={filterTerm} handleOpenModal={handleOpenModal} />;
        case 'reports':
            return <ReportSection reports={reports} filterTerm={filterTerm} />;
        default:
            return null;
    }
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'patient':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Name"><FormInput name="name" value={formData.name || ''} onChange={handleFormChange} /></FormField>
            <FormField label="Age"><FormInput name="age" type="number" value={formData.age || ''} onChange={handleFormChange} /></FormField>
            <FormField label="Gender">
              <FormSelect name="gender" value={formData.gender || ''} onChange={handleFormChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </FormSelect>
            </FormField>
            <FormField label="Phone"><FormInput name="phone" value={formData.phone || ''} onChange={handleFormChange} /></FormField>
            <FormField label="Address" className="md:col-span-2"><FormInput name="address" value={formData.address || ''} onChange={handleFormChange} /></FormField>
            <FormField label="Department"><FormInput name="department" value={formData.department || ''} onChange={handleFormChange} /></FormField>
            <FormField label="Aadhar"><FormInput name="aadhar" value={formData.aadhar || ''} onChange={handleFormChange} /></FormField>
          </div>
        );
      case 'doctor':
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Name"><FormInput name="name" value={formData.name || ''} onChange={handleFormChange} /></FormField>
                <FormField label="Specialization"><FormInput name="specialization" value={formData.specialization || ''} onChange={handleFormChange} /></FormField>
                <FormField label="Phone"><FormInput name="phone" value={formData.phone || ''} onChange={handleFormChange} /></FormField>
                <FormField label="Email"><FormInput name="email" type="email" value={formData.email || ''} onChange={handleFormChange} /></FormField>
                <FormField label="Experience"><FormInput name="experience" value={formData.experience || ''} onChange={handleFormChange} /></FormField>
                <FormField label="Qualification"><FormInput name="qualification" value={formData.qualification || ''} onChange={handleFormChange} /></FormField>
            </div>
        );
      case 'medicine':
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Name"><FormInput name="name" value={formData.name || ''} onChange={handleFormChange} /></FormField>
                <FormField label="Category"><FormInput name="category" value={formData.category || ''} onChange={handleFormChange} /></FormField>
                <FormField label="Stock"><FormInput name="stock" type="number" value={formData.stock || ''} onChange={handleFormChange} /></FormField>
                <FormField label="Price (₹)"><FormInput name="price" type="number" value={formData.price || ''} onChange={handleFormChange} /></FormField>
                <FormField label="Manufacturer"><FormInput name="manufacturer" value={formData.manufacturer || ''} onChange={handleFormChange} /></FormField>
                <FormField label="Batch Number"><FormInput name="batchNo" value={formData.batchNo || ''} onChange={handleFormChange} /></FormField>
            </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col">
        <div className="h-16 flex items-center justify-center px-4 border-b dark:border-gray-700">
          <Hospital className="text-blue-600" size={28} />
          <h1 className="text-xl font-bold ml-2 text-gray-900 dark:text-white">MediDash</h1>
        </div>
        <nav className="flex-grow px-4 py-4">
          <ul>
            {TABS.map((tab) => (
              <li key={tab.id}>
                <button 
                  onClick={() => setActiveSection(tab.id)}
                  className={`w-full flex items-center px-4 py-2 my-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeSection === tab.id ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-3">{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t dark:border-gray-700">
            <StyledButton variant="secondary" className="w-full" onClick={() => navigate('/')}>
                <LogOut size={16} /> Logout
            </StyledButton>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between px-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{TABS.find(t => t.id === activeSection)?.label}</h2>
          <div className="flex items-center gap-4">
            {activeSection !== 'dashboard' && (
              <StyledInput
                value={filterTerm}
                onChange={(e) => setFilterTerm(e.target.value)}
                placeholder={`Search in ${TABS.find(t => t.id === activeSection)?.label}...`}
                icon={<Search size={20} className="text-gray-400" />}
                className="w-64"
              />
            )}
            {activeSection !== 'dashboard' && activeSection !== 'reports' && (
              <StyledButton onClick={() => handleOpenModal(activeSection.slice(0, -1))}>
                <PlusCircle size={16} /> Add New
              </StyledButton>
            )}
            <StyledButton variant="ghost" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </StyledButton>
            <StyledButton variant="secondary" onClick={() => navigate('/dashboard')}>
                Doctor Panel
            </StyledButton>
            <StyledButton variant="secondary" onClick={() => navigate('/opd-counter')}>
                OPD Counter
            </StyledButton>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          {activeSection === 'dashboard' ? (
            renderActiveSection()
          ) : (
            <StyledCard className="w-full">
              {renderActiveSection()}
            </StyledCard>
          )}
        </main>
      </div>
      
      {/* Modal */}
      <StyledModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={`${currentItem ? 'Edit' : 'Add'} ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`}
      >
        <div className="p-6">
          {renderModalContent()}
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t dark:border-gray-700 flex justify-end gap-3">
            <StyledButton variant="secondary" onClick={handleCloseModal}>Cancel</StyledButton>
            <StyledButton variant="primary" onClick={handleSave}>{currentItem ? 'Update' : 'Save'}</StyledButton>
        </div>
      </StyledModal>
    </div>
  );
}

export default AdminDashboard;