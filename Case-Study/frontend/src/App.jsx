import React, { useState, useEffect, useCallback } from "react";
import { initialStudents } from "./data/initialStudents";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ViewStudents from "./pages/ViewStudents";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import "./App.css";

const getApiBaseUrl = () => {
  const envUrl = (import.meta.env.VITE_API_URL || "http://localhost:5000/api/students")
    .trim()
    .replace(/\/+$/, "");
  return envUrl.endsWith("/api/students") ? envUrl : `${envUrl}/api/students`;
};

const API_BASE_URL = getApiBaseUrl();

function App() {
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isServerConnected, setIsServerConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error("Could not reach backend API");

      const result = await response.json();
      const list = Array.isArray(result) ? result : result.data || [];

      if (list.length > 0) {
        setStudents(list);
      } else {
        setStudents(initialStudents);
      }
      setIsServerConnected(true);
    } catch (err) {
      console.warn("Backend not detected, loading default records:", err.message);
      setStudents(initialStudents);
      setIsServerConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Create student
  const handleAddStudent = async (studentData) => {
    try {
      if (isServerConnected) {
        const response = await fetch(API_BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to register student");

        showToast("Student added to database successfully!", "success");
        fetchStudents();
        return { success: true };
      } else {
        // Fallback local state
        const newRecord = { ...studentData, id: String(Date.now()) };
        setStudents((prev) => [newRecord, ...prev]);
        showToast("Student added locally (offline mode)", "success");
        return { success: true };
      }
    } catch (error) {
      showToast(error.message, "danger");
      return { success: false, message: error.message };
    }
  };

  // Update student
  const handleUpdateStudent = async (updatedData) => {
    const studentId = updatedData.id || updatedData._id;
    try {
      if (isServerConnected) {
        const response = await fetch(`${API_BASE_URL}/${studentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to update record");

        showToast("Student record updated successfully!", "success");
        fetchStudents();
        return { success: true };
      } else {
        setStudents((prev) =>
          prev.map((s) => ((s.id || s._id) === studentId ? { ...s, ...updatedData } : s))
        );
        showToast("Student updated locally", "success");
        return { success: true };
      }
    } catch (error) {
      showToast(error.message, "danger");
      return { success: false, message: error.message };
    }
  };

  // Delete student
  const handleDeleteStudent = async (studentId, studentName) => {
    if (!window.confirm(`Are you sure you want to delete ${studentName}?`)) return;

    try {
      if (isServerConnected) {
        const response = await fetch(`${API_BASE_URL}/${studentId}`, {
          method: "DELETE",
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to delete student");

        showToast(`Student "${studentName}" removed successfully`, "success");
        fetchStudents();
      } else {
        setStudents((prev) => prev.filter((s) => (s.id || s._id) !== studentId));
        showToast(`Student "${studentName}" removed locally`, "success");
      }
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  // Navigate to edit
  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setActiveTab("edit-student");
  };

  return (
    <div className="app-layout">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        studentCount={students.length}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="main-wrapper">
        <Navbar
          activeTab={activeTab}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onQuickAdd={() => setActiveTab("add-student")}
        />

        <main className="content-container">
          {toast && (
            <div className={`alert alert--${toast.type}`}>
              <span>{toast.message}</span>
              <button
                type="button"
                className="alert__close-btn"
                onClick={() => setToast(null)}
              >
                ✕
              </button>
            </div>
          )}

          {activeTab === "dashboard" && (
            <Dashboard
              students={students}
              setActiveTab={setActiveTab}
              onEditStudent={handleEditClick}
              onDeleteStudent={handleDeleteStudent}
            />
          )}

          {activeTab === "view-students" && (
            <ViewStudents
              students={students}
              onEdit={handleEditClick}
              onDelete={handleDeleteStudent}
              onNavigateToAdd={() => setActiveTab("add-student")}
            />
          )}

          {activeTab === "add-student" && (
            <AddStudent
              onAddStudent={handleAddStudent}
              onNavigateToView={() => setActiveTab("view-students")}
            />
          )}

          {activeTab === "edit-student" && (
            <EditStudent
              student={selectedStudent}
              onUpdateStudent={handleUpdateStudent}
              onCancel={() => {
                setSelectedStudent(null);
                setActiveTab("view-students");
              }}
            />
          )}
        </main>

        <footer className="app-footer">
          <p>© 2026 Student Management System • Full-Stack Web Development Case Study</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
