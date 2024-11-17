import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserForm.css";

const UserForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
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

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    const token = Cookies.get("token");
    const userId = Cookies.get("user"); // Retrieve userId directly from cookies

    if (!token ) {
      alert("User is not authenticated.");
      return;
    }

    try {
      // Make API request to update user data on the backend
      const response = await axios.post(
        "http://localhost:3000/api/user/update-data",
        { userId, ...formData }, // Include userId and formData
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        }
      );
 
      if (response.status === 200) {
        alert("Form submitted successfully!");
        navigate("/"); // Redirect to home page after form submission
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
    <div className="user-form-container">
      {step === 1 && (
        <div className="form-step">
          <h2 className="form-title">Personal Details</h2>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              required
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <div>
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
            <label>Height (cm):</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Enter your height"
              required
            />
          </div>
          <div className="form-group">
            <label>Weight (kg):</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Enter your weight"
              required
            />
          </div>
          <button onClick={handleNext} className="next-button">
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <h2 className="form-title">Medical Details</h2>
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
            <label>Number of Major Surgeries:</label>
            <input
              type="number"
              name="numberOfMajorSurgeries"
              value={formData.numberOfMajorSurgeries}
              onChange={handleChange}
              placeholder="Enter number"
            />
          </div>
          <div className="button-group">
            <button onClick={handleBack} className="back-button">
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="next-button"
              disabled={
                !formData.age ||
                !formData.gender ||
                !formData.height ||
                !formData.weight
              }
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserForm;
