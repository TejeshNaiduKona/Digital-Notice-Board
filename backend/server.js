require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Define a Mongoose Schema for Users
const UserSchema = new mongoose.Schema({
    name: String,
    regNumber: String,
    email: String,
    password: String,
    department: String,
});

const User = mongoose.model("User", UserSchema);

// Signup Route with Password Hashing
app.post("/signup", async (req, res) => {
    try {
        const { name, regNumber, email, password, department } = req.body;
        console.log("Signup request received:", req.body);

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, regNumber, email, password: hashedPassword, department });
        await newUser.save();
        res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Login Route with Password Comparison
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login request received:", req.body);

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Return user details (excluding password)
        res.status(200).json({
            message: "Login successful",
            user: {
                name: user.name,
                regNumber: user.regNumber,
                email: user.email,
                department: user.department,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: error.message });
    }
});


// Define a Mongoose Schema for Notices
// Define a Mongoose Schema for Notices
// Define a Mongoose Schema for Notices
const NoticeSchema = new mongoose.Schema({
    eventTitle: { type: String, required: true },
    description: { type: String, required: true },
    timings: { type: String, required: true },
    otherInfo: { type: String, required: true },
    registrationLink: { type: String, required: true },
    department: { type: String, required: true },  // ✅ Explicitly added
    createdAt: { type: Date, default: Date.now },
});

const Notice = mongoose.model("Notice", NoticeSchema);


// API Route to Post Notices
app.post("/post-notice", async (req, res) => {
    try {
        console.log("Received Notice Data:", req.body); // Debugging log

        const { eventTitle, description, timings, otherInfo, registrationLink, department } = req.body;

        if (!eventTitle || !description || !timings || !otherInfo || !registrationLink || !department) {
            console.error("Validation failed: Missing fields");
            return res.status(400).json({ error: "All fields are required" });
        }

        const newNotice = new Notice({ eventTitle, description, timings, otherInfo, registrationLink, department });

        console.log("Before Saving to DB:", newNotice); // Debugging log

        await newNotice.save();

        console.log("Notice successfully saved:", newNotice); // Debugging log

        res.status(201).json({ message: "Notice posted successfully", notice: newNotice });
    } catch (error) {
        console.error("Error posting notice:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/notices", async (req, res) => {
    try {
        const notices = await Notice.find().sort({ createdAt: -1 }); // Get all notices, sorted by latest first
        res.status(200).json(notices);
    } catch (error) {
        console.error("Error fetching notices:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/notices/:id", async (req, res) => {
    try {
        const noticeId = req.params.id;
        console.log("Delete request received for:", noticeId);

        const deletedNotice = await Notice.findByIdAndDelete(noticeId);

        if (!deletedNotice) {
            console.error("Notice not found for ID:", noticeId);
            return res.status(404).json({ error: "Notice not found" });
        }

        console.log("Notice deleted:", deletedNotice);
        res.status(200).json({ message: "Notice deleted successfully" });
    } catch (error) {
        console.error("Error deleting notice:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
