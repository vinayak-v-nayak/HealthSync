const express = require('express');
const connectDB = require('./config/db');
const Policy = require('./models/policy');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/signup');
const { authenticateToken } = require('../Middleware/authenticateToken'); // Updated path
const FitnessScore = require('./models/FitnessScore');
const { verifyUser } = require('../Middleware/verifyUser'); // Updated path
const ChatMessage = require('./models/chatMessage');
const {isAuthenticated} = require('../Middleware/isAuthenticated');
const UserData = require('./models/userData');
const {authenticate}= require('../Middleware/authenticate');
const { authenticatedToken } = require('../Middleware/authenticatedToken'); // Updated path


const app = express();
const port = 3000;

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:3001', // Adjust this to your frontend's origin
    credentials: true // Allow credentials (cookies, etc.)
}));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Backend route for fetching distinct policy filters
app.get('/api/policies/filters', async (req, res) => {
    try {
        const brandNames = await Policy.distinct("Brand_Name");
        const coverageAmounts = await Policy.distinct("Coverage_Amount");
        res.json({ brandNames, coverageAmounts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Backend route for fetching policies based on filters
app.get('/api/policies', async (req, res) => {
    const { brandName, coverageAmount } = req.query;
    
    // Build your query based on brand and coverage
    const query = {};
    if (brandName) query.Brand_Name = brandName;
    if (coverageAmount) query.Coverage_Amount = coverageAmount;

    try {
        const policies = await Policy.find(query);
        res.json(policies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching policies' });
    }
});

// Auth Routes
// **Signup Route**
app.post('/api/auth/signup', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      // Generate a JWT token
      const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET || 'My-secret-key',
        { expiresIn: '1h' }
      );
  
      // Send response with token and user data
      res.status(201).json({
        message: 'User created successfully',
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


// Login route to authenticate user and set cookie
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'My-secret-key',
            { expiresIn: '1h' }
        );

        // Set cookie with user data (without password)
        res.cookie('user', JSON.stringify({ id: user._id, name: user.name, email: user.email }), { 
            httpOnly: true, 
            maxAge: 86400000 // 1 day
        });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Profile Route to get user details
app.get('/api/auth/user', async (req, res) => {
    const userCookie = req.cookies.user;

    if (!userCookie) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const userData = JSON.parse(userCookie);
        const user = await User.findById(userData.id).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error("Error parsing user cookie:", error); // Log the error
        res.status(400).json({ message: 'Invalid cookie' });
    }
});

// Update Profile Route to update user details
app.put('/api/auth/user', async (req, res) => {
    const userCookie = req.cookies.user;

    if (!userCookie) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const userData = JSON.parse(userCookie);
        const user = await User.findById(userData.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { name, email, address, phoneNumber, job, gender } = req.body;

        // Update user details
        user.name = name || user.name;
        user.email = email || user.email;
        user.address = address || user.address;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.job = job || user.job;
        user.gender = gender || user.gender;

        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error("Error updating profile:", error); // Log the error
        res.status(400).json({ message: 'Invalid cookie or server error' });
    }
});

// Update user profile
app.patch('/api/auth/user/update', authenticateToken, async (req, res) => {
    try {
        const { name, job, gender, phone, address } = req.body;
        const userId = req.user.userId;

        const updatedUser = await User.findByIdAndUpdate(userId, { name, job, gender, phone, address }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user: updatedUser });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/fitness-score', verifyUser, async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming `verifyUser` middleware attaches `userId` to `req.user`

        const fitnessData = await FitnessScore.findOne({ userId });
        
        if (!fitnessData) {
            console.log("No fitness data found for this user.");
            return res.status(404).json({ message: 'No fitness data found for this user' });
        }

        res.status(200).json(fitnessData);
    } catch (error) {
        console.error('Error fetching fitness data:', error);
        res.status(500).json({ message: 'Error fetching fitness data' });
    }
});


app.post('/api/fitness-score', verifyUser, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { age, weight, height, exerciseMinutes, heartRate, stepsPerDay } = req.body;

        // Calculate BMI and fitness score
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        let totalScore = 50;

        // Calculate fitness score based on provided data
        if (bmi >= 18.5 && bmi <= 24.9) totalScore += 12.5;
        else if (bmi >= 25 && bmi <= 29.9) totalScore += 7.5;
        else if (bmi >= 30) totalScore += 2.5;

        if (exerciseMinutes >= 150) totalScore += 12.5;
        else if (exerciseMinutes >= 75) totalScore += 7.5;
        else totalScore += 2.5;

        if (heartRate >= 60 && heartRate <= 100) totalScore += 12.5;
        else totalScore += 5;

        if (stepsPerDay >= 10000) totalScore += 12.5;
        else if (stepsPerDay >= 7500) totalScore += 7.5;
        else if (stepsPerDay >= 5000) totalScore += 5;

        // Check if fitness data exists for this user
        let fitnessData = await FitnessScore.findOne({ userId });

        if (fitnessData) {
            // Update existing record
            fitnessData.age = age;
            fitnessData.weight = weight;
            fitnessData.height = height;
            fitnessData.exerciseMinutes = exerciseMinutes;
            fitnessData.heartRate = heartRate;
            fitnessData.stepsPerDay = stepsPerDay;
            fitnessData.bmi = bmi;
            fitnessData.fitnessScore = totalScore;
        } else {
            // Create new record with userId
            fitnessData = new FitnessScore({
                userId, // Required userId field
                age,
                weight,
                height,
                exerciseMinutes,
                heartRate,
                stepsPerDay,
                bmi,
                fitnessScore: totalScore
            });
        }

        await fitnessData.save();
        res.status(200).json({ message: 'Fitness score saved successfully', fitnessData });
    } catch (error) {
        console.error("Error saving fitness data:", error);
        res.status(500).json({ message: 'Error saving fitness data' });
    }
});


// New Recommendation Route based on Fitness Score and Salary
app.get('/api/policies/recommendations', verifyUser, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Fetch user’s fitness score and salary
        const fitnessData = await FitnessScore.findOne({ userId });
        const user = await User.findById(userId).select('salary'); // Only select the salary field

        // Handle case where fitness or salary data is not found
        if (!fitnessData || !user) {
            return res.status(404).json({ message: 'User fitness score or salary data not found' });
        }

        const { fitnessScore } = fitnessData;
        const { salary } = user;

        // Define policy recommendation criteria based on fitness score and salary
        let recommendationCriteria = {};
        
        // Recommendation logic based on the fitness score and salary
        if (fitnessScore >= 80 && salary >= 50000) {
            recommendationCriteria = { premium: { $lt: 500 } };  // Less expensive premium
        } else if (fitnessScore >= 50 && fitnessScore < 80 && salary >= 30000) {
            recommendationCriteria = { premium: { $lt: 300 } };  // Medium premium
        } else {
            recommendationCriteria = { premium: { $lt: 200 } };  // Low premium
        }

        // Fetch policies that match the recommendation criteria (limit to 5 policies)
        const recommendedPolicies = await Policy.find(recommendationCriteria).limit(5);

        // Return the recommended policies as the response
        res.json(recommendedPolicies);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ message: 'Error fetching recommendations' });
    }
});

  // Update user details and mark profile as completed
  app.post('/api/user/update-data', authenticate, async (req, res) => {
    const {
      gender, age, height, weight, heartRate,
      diabetes, bloodPressureProblems, anyTransplants,
      anyChronicDiseases, knownAllergies,
      historyOfCancerInFamily, numberOfMajorSurgeries
    } = req.body;
  
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
      }
  
      const existingUser = await UserData.findOne({ userId });
  
      if (existingUser) {
        Object.assign(existingUser, {
          gender, age, height, weight, heartRate, diabetes,
          bloodPressureProblems, anyTransplants, anyChronicDiseases,
          knownAllergies, historyOfCancerInFamily,
          numberOfMajorSurgeries, profileCompleted: true,
        });
  
        await existingUser.save();
        res.json({ message: "User data updated successfully", user: existingUser });
      } else {
        const newUser = new UserData({
          userId, gender, age, height, weight, heartRate, diabetes,
          bloodPressureProblems, anyTransplants, anyChronicDiseases,
          knownAllergies, historyOfCancerInFamily,
          numberOfMajorSurgeries, profileCompleted: true,
        });
  
        await newUser.save();
        res.json({ message: "User data created successfully", user: newUser });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server error." });
    }
  });


  
  app.get('/api/check-form-status', authenticatedToken, async (req, res) => {
  const userId = req.userId; // Extract userId from the authenticated token middleware

  try {
    // Query the database for the user's data
    const user = await UserData.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user's profile is completed
    const formCompleted = user.profileCompleted || false; // Default to false if the field is undefined
    return res.json({ userFormCompleted: formCompleted });
  } catch (error) {
    console.error('Error checking form status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



  app.post("/api/ask", async (req, res) => {
    const { question } = req.body;
  
    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Invalid or missing question" });
    }
  
    try {
      // Replace this URL with the endpoint for Google's Generative AI API
      const response = await axios.post(
        "https://api.generativeai.google.com/v1beta2/chat:complete",
        {
          prompt: question,
          temperature: 0.7,
          maxTokens: 200,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_GOOGLE_API_KEY}`, // API key for authentication
          },
        }
      );
  
      res.json(response.data.choices[0].text); // Adjust based on API response structure
    } catch (error) {
      console.error("Error with AI API:", error.message || error);
      res.status(500).json({ error: "An error occurred while processing your request." });
    }
  });



// Server Listening
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
