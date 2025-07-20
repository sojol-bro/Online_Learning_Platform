document.addEventListener("DOMContentLoaded", () => {
  fetchCourses();
});

async function fetchCourses() {
  try {
    const response = await fetch("http://localhost:5000/api/courses");
    const courses = await response.json();
    displayCourses(courses);
  } catch (error) {
    console.error("Failed to load courses:", error);
  }
}

function displayCourses(courses) {
  const courseList = document.querySelector(".course-list");
  courseList.innerHTML = ""; // Clear any previous content

  courses.forEach((course) => {
    const card = document.createElement("div");
    card.className = "course-card";
    card.innerHTML = `
      <h3>${course.title}</h3>
      <p>Instructor: <span class="instructor-name">${course.instructor}</span></p>
      <p>Price: <span class="price">৳${course.price}</span></p>
      <p>Rating: ⭐ ${course.rating || "N/A"}</p>
      <a href="course-details.html?id=${course.id}" class="details-btn">View Details</a>
    `;
    courseList.appendChild(card);
  });
}
