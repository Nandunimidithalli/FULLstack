import React from "react";

function Navbar({ activeTab, onToggleSidebar, onQuickAdd }) {
  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "System Overview & Analytics";
      case "view-students":
        return "Student Directory";
      case "add-student":
        return "Enroll New Student";
      case "edit-student":
        return "Update Student Details";
      default:
        return "Student Management System";
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__left">
        <button
          type="button"
          className="navbar__toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div>
          <h1 className="navbar__title">{getPageTitle()}</h1>
          <span className="navbar__subtitle">EduTrack Dashboard • Student Portal</span>
        </div>
      </div>

      <div className="navbar__right">
        {activeTab !== "add-student" && (
          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={onQuickAdd}
          >
            + Add Student
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
