// 📄 File: frontend/js/dashboard.js

// Assume user is logged in and user_id is stored in localStorage
const userId = localStorage.getItem("user_id");

if (!userId) {
  window.location.href = "/login.html"; // redirect to login if not logged in
}

document.addEventListener("DOMContentLoaded", () => {
  fetchDashboardData();
});

async function fetchDashboardData() {
  try {
    const res = await fetch(`http://localhost:5000/api/users/${userId}/dashboard`);
    const data = await res.json();

    // Populate courses
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = "";
    if (data.courses.length === 0) {
      courseList.innerHTML = "<p>No enrolled courses.</p>";
    } else {
      data.courses.forEach((course) => {
        const div = document.createElement("div");
        div.className = "course-item";
        div.innerHTML = `<strong>${course.title}</strong> - <a href="${course.drive_link}" target="_blank">Access Course</a>`;
        courseList.appendChild(div);
      });
    }

    // Promo code and referral
    document.getElementById("promo-code").textContent = data.promocode;
    document.getElementById("referral-earnings").textContent = `৳${data.balance}`;

  } catch (err) {
    console.error("Failed to fetch dashboard data:",err);
    alert("Error fetching dashboard data.");
  }
}

document.getElementById("redeem-btn").addEventListener("click", async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/users/${userId}/redeem`, {
      method: "POST"
    });
    const data = await res.json();
    alert(data.message || "Redeem successful!");
    fetchDashboardData();
  } catch (err) {
    console.error("Redeem error:", err);
    alert("Failed to redeem.");
  }
});
