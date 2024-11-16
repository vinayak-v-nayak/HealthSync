import React, { useState } from "react";
import "./UserForm.css";

const UserForm = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(28);
  const [height, setHeight] = useState(167);
  const [weight, setWeight] = useState(65);
  const [heartRate, setHeartRate] = useState(63);
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    const userData = {
      gender,
      age,
      height,
      weight,
      heartRate,
    };
    console.log("User Data:", userData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="user-form-container">
      {step === 1 && (
        <div className="form-step">
          <h2 className="form-title">Who are you?</h2>
          <div className="gender-selection">
            <div
              className={`gender-option ${
                gender === "Female" ? "selected" : ""
              }`}
              onClick={() => setGender("Female")}
            >
              <span role="img" aria-label="Female">
                ♀️
              </span>
              <p>FEMALE</p>
            </div>
            <div
              className={`gender-option ${
                gender === "Male" ? "selected" : ""
              }`}
              onClick={() => setGender("Male")}
            >
              <span role="img" aria-label="Male">
                ♂️
              </span>
              <p>MALE</p>
            </div>
          </div>
          <button
            onClick={handleNext}
            disabled={!gender}
            className="next-button"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <h2 className="form-title">How old are you?</h2>
          <div className="slider-container">
            <input
              type="range"
              min="10"
              max="100"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="slider"
            />
            <p className="slider-value">{age} years</p>
          </div>
          <div className="button-group">
            <button onClick={handleBack} className="back-button">
              Back
            </button>
            <button onClick={handleNext} className="next-button">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="form-step">
          <h2 className="form-title">How tall are you?</h2>
          <div className="slider-container">
            <input
              type="range"
              min="100"
              max="220"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="slider"
            />
            <p className="slider-value">{height} cm</p>
          </div>
          <h2 className="form-title">How much do you weigh?</h2>
          <div className="slider-container">
            <input
              type="range"
              min="30"
              max="200"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="slider"
            />
            <p className="slider-value">{weight} kg</p>
          </div>
          <div className="button-group">
            <button onClick={handleBack} className="back-button">
              Back
            </button>
            <button onClick={handleNext} className="next-button">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="form-step">
          <h2 className="form-title">What is your resting heart rate?</h2>
          <div className="slider-container">
            <input
              type="range"
              min="40"
              max="120"
              value={heartRate}
              onChange={(e) => setHeartRate(Number(e.target.value))}
              className="slider"
            />
            <p className="slider-value">{heartRate} bpm</p>
          </div>
          <div className="button-group">
            <button onClick={handleBack} className="back-button">
              Back
            </button>
            <button onClick={handleSubmit} className="next-button">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserForm;
