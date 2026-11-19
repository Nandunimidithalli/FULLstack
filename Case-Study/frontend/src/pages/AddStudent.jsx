import React, { useState } from "react";
import StudentForm from "../components/StudentForm";

function AddStudent({ onAddStudent, onNavigateToView }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (studentData) => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const result = await onAddStudent(studentData);
    setIsSubmitting(false);

    if (result && result.success) {
      setSuccessMessage(`Student "${studentData.name}" enrolled successfully!`);
    } else {
      setErrorMessage(result?.message || "Failed to register student.");
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
            <h3 className="card__title">Enroll New Student</h3>
            <p className="card__subtitle">Enter academic profile information</p>
          </div>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={onNavigateToView}
          >
            ← View Directory
          </button>
        </div>

        <StudentForm
          onSubmit={handleFormSubmit}
          onCancel={onNavigateToView}
          submitLabel={isSubmitting ? "Enrolling..." : "Enroll Student"}
        />
      </div>
    </div>
  );
}

export default AddStudent;
