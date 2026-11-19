import React from "react";

function StudentTable({ students, onEdit, onDelete }) {
  if (!students || students.length === 0) {
    return (
      <div className="table-empty-state" style={{ textAlign: "center", padding: "2rem" }}>
        <h3>No student records found</h3>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
          Try clearing your search filters or register a new student.
        </p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="student-table">
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Year</th>
            <th>Phone</th>
            <th>Status</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const sid = student.id || student._id;
            return (
              <tr key={sid}>
                <td>
                  <span className="badge badge--code">{student.rollNumber}</span>
                </td>
                <td>
                  <strong>{student.name}</strong>
                </td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>{student.year}</td>
                <td>{student.phone}</td>
                <td>
                  <span
                    className={`badge badge--${
                      student.status === "Active" ? "active" : "inactive"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                    <button
                      type="button"
                      className="btn btn--outline btn--sm"
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn--danger btn--sm"
                      onClick={() => onDelete(sid, student.name)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
