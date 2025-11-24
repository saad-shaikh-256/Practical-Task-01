import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

const StudentList = () => {
  // API Base URL (Backend)
  const API_URL = "http://localhost:3001";

  // --- STATE MANAGEMENT ---
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'delete'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', course: '' });

  // --- 1. FETCH DATA (READ) ---
  const fetchStudents = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get(`${API_URL}/getUsers`);
        setStudents(response.data);
    } catch (err) {
        console.error("Error fetching students:", err);
    } finally {
        setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchStudents();
  }, []);


  // --- HANDLERS ---

  const openAddModal = () => {
    setModalType('add');
    setFormData({ name: '', email: '', course: '' });
  };

  const openEditModal = (student) => {
    setModalType('edit');
    setSelectedStudent(student);
    setFormData({ name: student.name, email: student.email, course: student.course });
  };

  const openDeleteModal = (student) => {
    setModalType('delete');
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedStudent(null);
  };

  // --- 2. HANDLE SUBMIT (CREATE / UPDATE) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (modalType === 'add') {
            // Create API Call
            await axios.post(`${API_URL}/createUser`, formData);
        } else if (modalType === 'edit') {
            // Update API Call
            await axios.put(`${API_URL}/updateUser/${selectedStudent._id}`, formData);
        }
        // Refresh List
        fetchStudents();
        closeModal();
    } catch (err) {
        console.error("Error saving student:", err);
    }
  };

  // --- 3. HANDLE DELETE ---
  const handleDelete = async () => {
    try {
        await axios.delete(`${API_URL}/deleteUser/${selectedStudent._id}`);
        fetchStudents(); // Refresh List
        closeModal();
    } catch (err) {
        console.error("Error deleting student:", err);
    }
  };


  // --- DYNAMIC STATS ---
  const stats = [
    { label: 'Total Students', value: students.length, icon: 'user-group', color: 'text-white', bg: 'bg-zinc-900', border: 'border-zinc-700' },
    { label: 'Active Learners', value: students.length > 0 ? students.length - 1 : 0, icon: 'user-check-01', color: 'text-white', bg: 'bg-zinc-900', border: 'border-zinc-700' }, // Mock logic for active
    { label: 'Courses', value: '8', icon: 'book-open-01', color: 'text-white', bg: 'bg-zinc-900', border: 'border-zinc-700' },
  ];

  return (
    <div className="flex-1 h-full flex flex-col p-6 lg:p-10 overflow-hidden relative">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Student Records</h1>
          <p className="text-zinc-500 text-sm mt-1">View and manage all enrolled students.</p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
        >
          <i className="hgi hgi-stroke hgi-plus-sign text-lg"></i>
          <span className="text-sm font-medium">Add Student</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
            <div key={index} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${stat.bg} ${stat.color} border ${stat.border}`}>
                    <i className={`hgi hgi-stroke hgi-${stat.icon}`}></i>
                </div>
                <div>
                    <p className="text-zinc-500 text-xs font-medium uppercase tracking-wide">{stat.label}</p>
                    <p className="text-2xl font-semibold text-zinc-100">{stat.value}</p>
                </div>
            </div>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950/50 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-900/50 border-b border-zinc-800">
              <tr className="text-zinc-400 text-xs uppercase tracking-wider font-medium">
                <th className="p-5 font-medium pl-6">Name</th>
                <th className="p-5 font-medium">Contact</th>
                <th className="p-5 font-medium">Course</th>
                <th className="p-5 font-medium text-center">Status</th>
                <th className="p-5 font-medium text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-zinc-800/50">
              {/* Loading State */}
              {isLoading && (
                <tr>
                    <td colSpan="5" className="p-8 text-center text-zinc-500">Loading data...</td>
                </tr>
              )}

              {/* Empty State */}
              {!isLoading && students.length === 0 && (
                <tr>
                    <td colSpan="5" className="p-8 text-center text-zinc-500">No students found. Add one to get started.</td>
                </tr>
              )}

              {/* Data Rows */}
              {students.map((student) => (
                <tr key={student._id} className="group hover:bg-zinc-900/40 transition-colors duration-150">
                  <td className="p-5 pl-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center text-sm font-bold border border-zinc-700">
                            {student.name ? student.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <span className="font-medium text-zinc-200">{student.name}</span>
                    </div>
                  </td>
                  <td className="p-5 text-zinc-400">{student.email}</td>
                  <td className="p-5"><span className="bg-zinc-900 border border-zinc-700 text-zinc-300 px-2.5 py-1 rounded text-xs font-medium">{student.course}</span></td>
                  <td className="p-5 text-center">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${student.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${student.status === 'Active' ? 'bg-emerald-400' : 'bg-zinc-500'}`}></div>
                        {student.status || 'Active'}
                    </div>
                  </td>
                  <td className="p-5 text-right pr-6">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button onClick={() => openEditModal(student)} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-all">
                            <i className="hgi hgi-stroke hgi-pencil-edit-02 text-lg"></i>
                        </button>
                        <button onClick={() => openDeleteModal(student)} className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 rounded-md transition-all">
                            <i className="hgi hgi-stroke hgi-delete-02 text-lg"></i>
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalType === 'add' || modalType === 'edit'}
        onClose={closeModal}
        title={modalType === 'add' ? 'Add New Student' : 'Edit Student Details'}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Full Name</label>
                <input
                    type="text"
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-zinc-600"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Email Address</label>
                <input
                    type="email"
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-zinc-600"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Course</label>
                <input
                    type="text"
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-zinc-600"
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                />
            </div>

            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-zinc-800">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg shadow-indigo-500/20">
                    {modalType === 'add' ? 'Create Student' : 'Save Changes'}
                </button>
            </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={modalType === 'delete'}
        onClose={closeModal}
        title="Confirm Deletion"
      >
        <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                <i className="hgi hgi-stroke hgi-alert-02 text-2xl text-rose-500 shrink-0"></i>
                <div>
                    <h3 className="text-sm font-semibold text-rose-500">Warning</h3>
                    <p className="text-xs text-rose-300/80 mt-1">
                        Are you sure you want to delete <span className="font-bold text-white">"{selectedStudent?.name}"</span>?
                    </p>
                </div>
            </div>
            <div className="flex justify-end gap-3 mt-2">
                <button onClick={closeModal} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">Cancel</button>
                <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-lg shadow-rose-500/20">
                    Delete Student
                </button>
            </div>
        </div>
      </Modal>

    </div>
  );
};

export default StudentList;