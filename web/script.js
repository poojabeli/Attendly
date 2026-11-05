
let students = [];

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const message = document.getElementById("message");
const search = document.getElementById("search");

// Sidebar navigation
const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

navButtons.forEach(button => {
    button.addEventListener("click", function () {
        navButtons.forEach(btn => btn.classList.remove("active"));
        pages.forEach(page => page.classList.remove("active"));

        button.classList.add("active");
        document.getElementById(button.dataset.target).classList.add("active");
    });
});

// Grade calculation
function calculateGrade(marks) {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
}

// Overall attendance
function calculateAttendance(student) {
    const total = student.total.reduce((a, b) => a + b, 0);
    const attended = student.attended.reduce((a, b) => a + b, 0);

    return total > 0 ? attended * 100 / total : 0;
}

// Average marks
function averageMarks(student) {
    return student.marks.reduce((a, b) => a + b, 0) / 5;
}

// Safe text display
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);
}

// Display student records
function renderStudents(filter = "") {
    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(filter.toLowerCase()) ||
        String(s.roll).includes(filter)
    );

    table.innerHTML = filtered.length
        ? filtered.map(s => {
            const attendance = calculateAttendance(s);
            const marks = averageMarks(s);

            const shortage = s.total.some((total, i) =>
                s.attended[i] * 100 / total < 75
            );

            return `
                <tr>
                    <td>${s.roll}</td>
                    <td>${escapeHTML(s.name)}</td>
                    <td>${attendance.toFixed(1)}%</td>
                    <td>${marks.toFixed(1)}</td>
                    <td>${calculateGrade(marks)}</td>
                    <td>${shortage ? "Shortage" : "Good"}</td>
                </tr>
            `;
        }).join("")
        : `<tr><td colspan="6">No students found.</td></tr>`;

    updateDashboard();
    renderRanking();
}

// Dashboard statistics
function updateDashboard() {
    const count = students.length;

    const avgAttendance = count
        ? students.reduce((sum, s) =>
            sum + calculateAttendance(s), 0) / count
        : 0;

    const shortage = students.filter(s =>
        s.total.some((total, i) =>
            s.attended[i] * 100 / total < 75
        )
    ).length;

    const avgMarks = count
        ? students.reduce((sum, s) =>
            sum + averageMarks(s), 0) / count
        : 0;

    document.getElementById("totalStudents").textContent = count;
    document.getElementById("averageAttendance").textContent =
        avgAttendance.toFixed(1) + "%";
    document.getElementById("shortageCount").textContent = shortage;
    document.getElementById("averageMarks").textContent =
        avgMarks.toFixed(1);
}

// Performance rankings
function renderRanking() {
    const rankingList = document.getElementById("rankingList");

    const ranked = [...students].sort((a, b) =>
        averageMarks(b) - averageMarks(a)
    );

    rankingList.innerHTML = ranked.length
        ? ranked.map((s, i) => `
            <li>
                <strong>${escapeHTML(s.name)}</strong>
                — ${averageMarks(s).toFixed(1)} average marks
                (${calculateGrade(averageMarks(s))})
            </li>
        `).join("")
        : "<li>No rankings yet.</li>";
}

// Add student
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const student = {
        roll: Number(document.getElementById("roll").value),
        name: document.getElementById("name").value.trim(),
        total: [],
        attended: [],
        marks: []
    };

    for (let i = 0; i < 5; i++) {
        student.total.push(Number(document.getElementById("total" + i).value));
        student.attended.push(Number(document.getElementById("attended" + i).value));
        student.marks.push(Number(document.getElementById("marks" + i).value));
    }

    const invalid = student.roll <= 0 ||
        !student.name ||
        student.total.some((t, i) =>
            t <= 0 ||
            student.attended[i] < 0 ||
            student.attended[i] > t ||
            student.marks[i] < 0 ||
            student.marks[i] > 100
        );

    if (invalid) {
        message.textContent = "Please enter valid details.";
        return;
    }

    if (students.some(s => s.roll === student.roll)) {
        message.textContent = "Roll number already exists!";
        return;
    }

    const values = [
        student.roll,
        student.name,
        ...student.total,
        ...student.attended,
        ...student.marks
    ];

    try {
        const response = await fetch("/addStudent", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: values.join(",")
        });

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        students.push(student);
        form.reset();
        message.textContent = "Student added successfully!";
        renderStudents(search.value);

    } catch (error) {
        message.textContent =
            "Could not connect to server. Please try again.";
        console.error(error);
    }
});

// Search
search.addEventListener("input", () =>
    renderStudents(search.value)
);

renderStudents();
