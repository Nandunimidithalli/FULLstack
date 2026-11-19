import React, { useState, useMemo } from "react";
import StudentTable from "../components/StudentTable";
import { DEPARTMENTS } from "../data/initialStudents";

function ViewStudents({ students, onEdit, onDelete, onNavigateToAdd }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        student.name.toLowerCase().includes(q) ||
        student.rollNumber.toLowerCase().includes(q) ||
        student.email.toLowerCase().includes(q);

      const matchesDept = selectedDept === "All" || student.department === selectedDept;
      const matchesStatus = selectedStatus === "All" || student.status === selectedStatus;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [students, searchTerm, selectedDept, selectedStatus]);

  const handleClear = () => {
    setSearchTerm("");
    setSelectedDept("All");
    setSelectedStatus("All");
  };

  return (
    <div className="view-students-page">
      <div className="card">
        <div className="card__header">
          <div>
            <h3 className="card__title">Student Directory ({filteredStudents.length})</h3>
            <p className="card__subtitle">Filter and search student profiles</p>
          </div>
          <button type="button" className="btn btn--primary btn--sm" onClick={onNavigateToAdd}>
            + Add New Student
          </button>
        </div>

        <div className="filter-bar">
          <div className="filter-bar__inputs">
            <input
              type="text"
              className="search-field"
              placeholder="Search by name, roll, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="select-field"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <select
              className="select-field"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {(searchTerm || selectedDept !== "All" || selectedStatus !== "All") && (
            <button type="button" className="btn btn--outline btn--sm" onClick={handleClear}>
              Clear Filters
            </button>
          )}
        </div>

        <StudentTable
          students={filteredStudents}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

export default ViewStudents;
