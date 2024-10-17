// src/FitnessScore.js
import React, { useState } from "react";
import "../assets/css/FitnessScore.css";

const FitnessScore = () => {
    const [score, setScore] = useState(0);
    const [age, setAge] = useState("");
    const [activityLevel, setActivityLevel] = useState("");

    const calculateScore = () => {
        let calculatedScore = 0;

        // Simple scoring logic
        if (activityLevel === "high") calculatedScore += 50;
        else if (activityLevel === "medium") calculatedScore += 30;
        else if (activityLevel === "low") calculatedScore += 10;

        if (age < 30) calculatedScore += 20;
        else if (age < 50) calculatedScore += 10;
        else calculatedScore += 5;

        setScore(calculatedScore);
    };

    return (
        <div className="fitness-score-container">
            <h1>Fitness Score Calculator</h1>
            <input
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <select
                onChange={(e) => setActivityLevel(e.target.value)}
                value={activityLevel}
            >
                <option value="">Select Activity Level</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
            <button onClick={calculateScore}>Calculate Score</button>
            {score > 0 && <h2>Your Fitness Score: {score}</h2>}
        </div>
    );
};

export default FitnessScore;
