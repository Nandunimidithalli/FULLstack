import React, { useState } from "react";
import StudentForm from "../components/StudentForm";

function EditStudent({ student, onUpdateStudent, onCancel }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!student) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
        <h3>No Student Selected for Editing</h3>
        <p style={{ color: "var(--color-text-muted)", margin: "1rem 0" }}>
          Please choose a student from the directory table to modify their details.
        </p>
        <button type="button" className="btn btn--primary" onClick={onCancel}>
          Go to Directory
        </button>
      </div>
    );
  }

  const handleFormSubmit = async (updatedData) => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const result = await onUpdateStudent({
      ...updatedData,
      id: student.id || student._id,
    });
    setIsSubmitting(false);

    if (result && result.success) {
      setSuccessMessage(`Record for "${updatedData.name}" updated successfully!`);
    } else {
      setErrorMessage(result?.message || "Failed to update student.");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="form-page-container">
      {successMessage && (
        <div className="alert alert--success">
          <span>{successMessage}</span>
          <button
            type="button"
            className="alert__close-btn"
            onClick={() => setSuccessMessage("")}
          >
            ✕
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="alert alert--danger">
          <span>{errorMessage}</span>
          <button
            type="button"
            className="alert__close-btn"
            onClick={() => setErrorMessage("")}
          >
            ✕
          </button>
        </div>
      )}

      <div className="card">
        <div className="card__header">
          <div>
            <h3 className="card__title">Update Student Information</h3>
            <p className="card__subtitle">
              Editing: <strong>{student.name}</strong> ({student.rollNumber})
            </p>
          </div>
          <button type="button" className="btn btn--outline btn--sm" onClick={onCancel}>
            ← Back to Directory
          </button>
        </div>

        <StudentForm
          initialData={student}
          onSubmit={handleFormSubmit}
          onCancel={onCancel}
          submitLabel={isSubmitting ? "Saving..." : "Save Changes"}
        />
      </div>
    </div>
  );
}

export default EditStudent;
