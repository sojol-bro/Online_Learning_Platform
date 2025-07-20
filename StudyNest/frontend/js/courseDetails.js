document.addEventListener("DOMContentLoaded", () => {
  const courseId = getCourseIdFromURL();
  fetchCourseDetails(courseId);
  fetchReviews(courseId);
});

function getCourseIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function fetchCourseDetails(courseId) {
  try {
    const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
    const course = await response.json();

    document.getElementById("course-title").textContent = course.title;
    document.getElementById("course-instructor").textContent = course.instructor;
    document.getElementById("course-price").textContent = `৳${course.price}`;
    document.getElementById("course-description").textContent = course.description;
    document.getElementById("course-rating").textContent = course.rating || "No rating yet";
  } catch (error) {
    console.error("Error fetching course details:", error);
  }
}

async function fetchReviews(courseId) {
  try {
    const res = await fetch(`http://localhost:5000/api/reviews/${courseId}`);
    const reviews = await res.json();

    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";

    if (reviews.length === 0) {
      reviewList.innerHTML = "<p>No reviews yet.</p>";
      return;
    }

    reviews.forEach((r) => {
      const div = document.createElement("div");
      div.className = "review";
      div.innerHTML = `<p><strong>Rating:</strong> ${r.rating} ⭐</p><p>${r.comment}</p>`;
      reviewList.appendChild(div);
    });
  } catch (err) {
    console.error("Failed to fetch reviews:", err);
  }
}

function enrollCourse() {
  alert("Enrollment logic can be implemented here (e.g., with payment verification).");
}
