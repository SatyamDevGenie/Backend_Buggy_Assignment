const express = require("express");
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// ================= SAMPLE DATA =================

const users = [
    { id: 1, name: "Amit", email: "amit@test.com" },
    { id: 2, name: "Riya", email: "riya@test.com" }
];

const notes = [
    { id: 1, title: "Note 1", content: "Content 1", userId: 1 },
    { id: 2, title: "Note 2", content: "Content 2", userId: 2 }
];

// ================= UTILITY FUNCTIONS =================

// FIX:
// Earlier function was not returning anything.
// Added return statement.
function getUserById(id) {
    return users.find(user => user.id === id);
}

// FIX:
// Earlier Math.random() returned decimal values.
// Using Math.floor() to generate integer IDs.
function generateNoteId() {
    return Math.floor(Math.random() * 100000);
}

// FIX:
// Earlier fetchExternalData() was undefined.
// Added dummy implementation.
async function fetchExternalData() {
    return {
        success: true,
        message: "External data fetched successfully"
    };
}

// ================= USERS =================

// Get all users
app.get("/users", (req, res) => {

    // FIX:
    // Earlier code used undefined variable userList.
    // Returning users array directly.

    res.status(200).json(users);
});

// Get single user by ID
app.get("/users/:id", (req, res) => {

    // FIX:
    // req.params.id is string.
    // Converted to Number for strict comparison.

    const id = Number(req.params.id);

    const user = getUserById(id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json(user);
});

// Update user name
app.put("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    const user = getUserById(id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // FIX:
    // Added validation for empty name.

    if (!name) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    // FIX:
    // Earlier code used undefined variable username.
    // Correct variable is name.

    user.name = name;

    res.status(200).json(user);
});

// ================= NOTES =================

// Get notes count
app.get("/notes/count", (req, res) => {

    // FIX:
    // Earlier used notes.lenght
    // Correct property is notes.length

    res.status(200).json({
        total: notes.length
    });
});

// Get all notes
app.get("/notes", (req, res) => {

    // FIX:
    // Earlier code used:
    // if(notes = [])
    // which was assignment instead of comparison.

    if (notes.length === 0) {
        return res.status(404).json({
            message: "No notes found"
        });
    }

    res.status(200).json(notes);
});

// Create note
app.post("/notes", (req, res) => {
    const { title, content, userId } = req.body;

    // FIX:
    // Added input validation.

    if (!title || !content || !userId) {
        return res.status(400).json({
            message: "Title, content and userId are required"
        });
    }

    // FIX:
    // Check whether user exists before creating note.

    const user = getUserById(Number(userId));

    if (!user) {
        return res.status(404).json({
            message: "User does not exist"
        });
    }

    const newNote = {

        // FIX:
        // Earlier code stored function reference.
        // Now function is called properly.

        id: generateNoteId(),

        title,
        content,
        userId: Number(userId)
    };

    notes.push(newNote);

    res.status(201).json(newNote);
});

// Delete note
app.delete("/notes/:id", (req, res) => {

    // FIX:
    // Convert route parameter to number.

    const id = Number(req.params.id);

    const noteIndex = notes.findIndex(
        note => note.id === id
    );

    // FIX:
    // Earlier splice(-1,1) could delete last note.
    // Added existence check.

    if (noteIndex === -1) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    notes.splice(noteIndex, 1);

    res.status(200).json({
        message: "Note deleted successfully"
    });
});

// Get notes by user
app.get("/user-notes/:userId", (req, res) => {

    const userId = Number(req.params.userId);

    // FIX:
    // Earlier code used assignment operator (=)
    // inside filter.
    // Replaced with strict comparison (===)

    const userNotes = notes.filter(
        note => note.userId === userId
    );

    res.status(200).json(userNotes);
});

// ================= AUTH =================

// Login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // FIX:
    // Earlier OR (||) allowed login
    // if either email OR password matched.
    // Changed to AND (&&).

    if (
        email === "admin@test.com" &&
        password === "123456"
    ) {
        return res.status(200).json({
            success: true,
            message: "Login successful"
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid credentials"
    });
});

// ================= PROFILE =================

// Get profile by ID
app.get("/profile/:id", (req, res) => {
    const id = Number(req.params.id);

    // FIX:
    // Earlier used filter() which returns array.
    // Using find() to get single user object.

    const user = getUserById(id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        name: user.name
    });
});

// ================= EXTERNAL DATA =================

// Async route example
app.get("/external-data", async (req, res) => {
    try {

        // FIX:
        // Added await because function returns Promise.

        const data = await fetchExternalData();

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch external data"
        });
    }
});

// ================= SUM =================

// Add two numbers
app.post("/sum", (req, res) => {
    const { a, b } = req.body;

    // FIX:
    // Convert strings to numbers.
    // "10" + "20" = "1020"
    // Number("10") + Number("20") = 30

    const total = Number(a) + Number(b);

    if (isNaN(total)) {
        return res.status(400).json({
            message: "a and b must be numbers"
        });
    }

    res.status(200).json({
        total
    });
});

// ================= SERVER =================

const PORT = 3000;

// FIX:
// Earlier app.listen(3000)
// but console showed port 5000.
// Both are now consistent.

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});