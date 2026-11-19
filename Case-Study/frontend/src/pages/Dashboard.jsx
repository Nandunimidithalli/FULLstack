import React from "react";
import StatCard from "../components/StatCard";

function Dashboard({ students, setActiveTab, onEditStudent, onDeleteStudent }) {
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "Active").length;
  const inactiveStudents = totalStudents - activeStudents;

  const departmentCounts = students.reduce((acc, curr) => {
    acc[curr.department] = (acc[curr.department] || 0) + 1;
    return acc;
  }, {});

  const totalDepartments = Object.keys(departmentCounts).length;
  const recentStudents = [...students].slice(-4).reverse();

  return (
    <div className="dashboard-page">
      <div className="welcome-banner">
        <div className="welcome-banner__text">
          <h2>Welcome to EduTrack Dashboard 👋</h2>
          <p>
            Monitor real-time student enrollment stats and departmental distributions.
          </p>
        </div>
        <div>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => setActiveTab("add-student")}
          >
            + Enroll Student
          </button>
        </div>
      </div>

      <div className="stat-cards-grid">
        <StatCard
          title="Total Students"
          value={totalStudents}
          subtitle="All registered records"
          variant="primary"
          onClick={() => setActiveTab("view-students")}
          icon="🎓"
        />
        <StatCard
          title="Active Students"
          value={activeStudents}
          subtitle="Currently enrolled"
          variant="success"
          onClick={() => setActiveTab("view-students")}
          icon="✅"
        />
        <StatCard
          title="Inactive Students"
          value={inactiveStudents}
          subtitle="Suspended or on-leave"
          variant="warning"
          icon="⏸️"
        />
        <StatCard
          title="Departments"
          value={totalDepartments}
          subtitle="Active study branches"
          variant="primary"
          icon="🏛️"
        />
      </div>

      <div className="card">
        <div className="card__header">
          <div>
            <h3 className="card__title">Recently Enrolled Students</h3>
            <p className="card__subtitle">Latest additions to the portal</p>
          </div>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => setActiveTab("view-students")}
          >
            View All →
          </button>
        </div>

        {recentStudents.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)" }}>No students added yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((s) => (
                  <tr key={s.id || s._id}>
                    <td>
                      <span className="badge badge--code">{s.rollNumber}</span>
                    </td>
                    <td>{s.name}</td>
                    <td>{s.department}</td>
                    <td>{s.year}</td>
                    <td>
                      <span
                        className={`badge badge--${
                          s.status === "Active" ? "active" : "inactive"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
