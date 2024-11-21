import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserForm.css";
const baseUrl = process.env.REACT_APP_API_URL;

const UserForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
    diabetes: false,
    bloodPressureProblems: false,
    anyTransplants: false,
    anyChronicDiseases: false,
    knownAllergies: false,
    historyOfCancerInFamily: false,
    numberOfMajorSurgeries: "",
  });

  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && (!formData.gender || !formData.age || !formData.height || !formData.weight)) {
      alert("Please fill out all the required fields.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    const token = Cookies.get("token");
    const userId = Cookies.get("user");

    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/user/update-data`,
        { userId, ...formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Form submitted successfully!");
        navigate("/");
      } else {
        alert("Error submitting the form, please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred, please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="form-container">
      <div className={`form-card step-${step}`}>
        <h1 className="form-title">Complete Your Health Profile</h1>
        <p className="form-step-indicator">Step {step} of 3</p>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="form-step">
            <div className="form-group">
              <label>Gender</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Enter your height"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter your weight"
                className="form-input"
                required
              />
            </div>
            <button onClick={handleNext} className="btn btn-primary">
              Next
            </button>
          </div>
        )}

        {/* Step 2: Medical History */}
        {step === 2 && (
          <div className="form-step">
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="diabetes"
                  checked={formData.diabetes}
                  onChange={handleChange}
                />
                Diabetes
              </label>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="bloodPressureProblems"
                  checked={formData.bloodPressureProblems}
                  onChange={handleChange}
                />
                Blood Pressure Problems
              </label>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="anyTransplants"
                  checked={formData.anyTransplants}
                  onChange={handleChange}
                />
                Any Transplants
              </label>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="anyChronicDiseases"
                  checked={formData.anyChronicDiseases}
                  onChange={handleChange}
                />
                Any Chronic Diseases
              </label>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="knownAllergies"
                  checked={formData.knownAllergies}
                  onChange={handleChange}
                />
                Known Allergies
              </label>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="historyOfCancerInFamily"
                  checked={formData.historyOfCancerInFamily}
                  onChange={handleChange}
                />
                History of Cancer in Family
              </label>
            </div>
            <div className="form-group">
              <label>Number of Major Surgeries</label>
              <input
                type="number"
                name="numberOfMajorSurgeries"
                value={formData.numberOfMajorSurgeries}
                onChange={handleChange}
                placeholder="Enter number"
                className="form-input"
              />
            </div>
            <div className="button-group">
              <button onClick={handleBack} className="btn btn-secondary">
                Back
              </button>
              <button onClick={handleNext} className="btn btn-primary">
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="form-step">
            <p>You're all set! Click Submit to complete your health profile.</p>
            <div className="button-group">
              <button onClick={handleBack} className="btn btn-secondary">
                Back
              </button>
              <button onClick={handleSubmit} className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm;
