
let students = [];

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const message = document.getElementById("message");
const search = document.getElementById("search");

function calculateGrade(marks) {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
}

function calculateAttendance(student) {
    return (student.attended / student.total) * 100;
}

function renderStudents(filter = "") {
    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(filter.toLowerCase()) ||
        String(s.roll).includes(filter)
    );

    if (filtered.length === 0) {
        table.innerHTML =
            `<tr><td colspan="6">No students found.</td></tr>`;
    } else {
        table.innerHTML = filtered.map(s => {
            const attendance = calculateAttendance(s);
            const shortage = attendance < 75;

            return `
                <tr>
                    <td>${s.roll}</td>
                    <td>${escapeHTML(s.name)}</td>
                    <td>${attendance.toFixed(1)}%</td>
                    <td>${s.marks}</td>
                    <td>${calculateGrade(s.marks)}</td>
                    <td>
                        <span class="${shortage ? "status-low" : "status-good"}">
                            ${shortage ? "Shortage" : "Good"}
                        </span>
                    </td>
                </tr>`;
        }).join("");
    }

    updateDashboard();
    renderRanking();
}

function updateDashboard() {
    const count = students.length;

    const avgAttendance = count
        ? students.reduce((sum, s) =>
            sum + calculateAttendance(s), 0) / count
        : 0;

    const shortage = students.filter(s =>
        calculateAttendance(s) < 75
    ).length;

    const avgMarks = count
        ? students.reduce((sum, s) => sum + s.marks, 0) / count
        : 0;

    document.getElementById("totalStudents").textContent = count;
    document.getElementById("averageAttendance").textContent =
        avgAttendance.toFixed(1) + "%";
    document.getElementById("shortageCount").textContent = shortage;
    document.getElementById("averageMarks").textContent =
        avgMarks.toFixed(1);
}

function renderRanking() {
    const rankingList = document.getElementById("rankingList");

    const ranked = [...students].sort(
        (a, b) => b.marks - a.marks
    );

    rankingList.innerHTML = ranked.length
        ? ranked.map(s =>
            `<li><strong>${escapeHTML(s.name)}</strong> —
            ${s.marks} marks (${calculateGrade(s.marks)})</li>`
          ).join("")
        : "<li>No rankings yet.</li>";
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[c]);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const student = {
        roll: Number(document.getElementById("roll").value),
        name: document.getElementById("name").value.trim(),
        total: Number(document.getElementById("total").value),
        attended: Number(document.getElementById("attended").value),
        marks: Number(document.getElementById("marks").value)
    };

    if (!student.name || student.total <= 0 ||
        student.attended < 0 ||
        student.attended > student.total ||
        student.marks < 0 || student.marks > 100) {

        message.textContent = "Please enter valid details.";
        message.style.color = "#c34c70";
        return;
    }

    if (students.some(s => s.roll === student.roll)) {
        message.textContent = "Roll number already exists!";
        message.style.color = "#c34c70";
        return;
    }

    students.push(student);
    form.reset();

    message.textContent = "Student added successfully! ✨";
    message.style.color = "#168553";

    renderStudents(search.value);
});

s
let students = [];

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const message = document.getElementById("message");
const search = document.getElementById("search");

function calculateGrade(marks) {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
}

function calculateAttendance(student) {
    return (student.attended / student.total) * 100;
}

function renderStudents(filter = "") {
    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(filter.toLowerCase()) ||
        String(s.roll).includes(filter)
    );

    if (filtered.length === 0) {
        table.innerHTML =
            `<tr><td colspan="6">No students found.</td></tr>`;
    } else {
        table.innerHTML = filtered.map(s => {
            const attendance = calculateAttendance(s);
            const shortage = attendance < 75;

            return `
                <tr>
                    <td>${s.roll}</td>
                    <td>${escapeHTML(s.name)}</td>
                    <td>${attendance.toFixed(1)}%</td>
                    <td>${s.marks}</td>
                    <td>${calculateGrade(s.marks)}</td>
                    <td>
                        <span class="${shortage ? "status-low" : "status-good"}">
                            ${shortage ? "Shortage" : "Good"}
                        </span>
                    </td>
                </tr>`;
        }).join("");
    }

    updateDashboard();
    renderRanking();
}

function updateDashboard() {
    const count = students.length;

    const avgAttendance = count
        ? students.reduce((sum, s) =>
            sum + calculateAttendance(s), 0) / count
        : 0;

    const shortage = students.filter(s =>
        calculateAttendance(s) < 75
    ).length;

    const avgMarks = count
        ? students.reduce((sum, s) => sum + s.marks, 0) / count
        : 0;

    document.getElementById("totalStudents").textContent = count;
    document.getElementById("averageAttendance").textContent =
        avgAttendance.toFixed(1) + "%";
    document.getElementById("shortageCount").textContent = shortage;
    document.getElementById("averageMarks").textContent =
        avgMarks.toFixed(1);
}

function renderRanking() {
    const rankingList = document.getElementById("rankingList");

    const ranked = [...students].sort(
        (a, b) => b.marks - a.marks
    );

    rankingList.innerHTML = ranked.length
        ? ranked.map(s =>
            `<li><strong>${escapeHTML(s.name)}</strong> —
            ${s.marks} marks (${calculateGrade(s.marks)})</li>`
          ).join("")
        : "<li>No rankings yet.</li>";
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[c]);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const student = {
        roll: Number(document.getElementById("roll").value),
        name: document.getElementById("name").value.trim(),
        total: Number(document.getElementById("total").value),
        attended: Number(document.getElementById("attended").value),
        marks: Number(document.getElementById("marks").value)
    };

    if (!student.name || student.total <= 0 ||
        student.attended < 0 ||
        student.attended > student.total ||
        student.marks < 0 || student.marks > 100) {

        message.textContent = "Please enter valid details.";
        message.style.color = "#c34c70";
        return;
    }

    if (students.some(s => s.roll === student.roll)) {
        message.textContent = "Roll number already exists!";
        message.style.color = "#c34c70";
        return;
    }

    students.push(student);
    form.reset();

    message.textContent = "Student added successfully! ✨";
    message.style.color = "#168553";

    renderStudents(search.value);
});

search.addEventListener("input", function() {
    renderStudents(search.value);
});

renderStudents();
) {
    renderStudents(search.value);
});

renderStudents();
