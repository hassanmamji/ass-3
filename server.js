const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/result", (req, res) => {
    const { name, marks } = req.body;

    if (!name || !marks || !Array.isArray(marks)) {
        return res.status(400).json({ error: "Please provide a name and marks array" });
    }

    const totalMarks = marks.reduce((sum, mark) => sum + mark, 0);
    const maxMarks = marks.length * 100;
    const percentage = (totalMarks / maxMarks) * 100;

    let grade = "";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 50) grade = "D";
    else grade = "F";

    res.json({
        name,
        totalMarks,
        maxMarks,
        percentage: percentage.toFixed(2),
        grade
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
