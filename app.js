// Import the functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5FV2pZQpUa5DgkEISG6N15wvd1UEQqOw",
  authDomain: "realtime-database-d0558.firebaseapp.com",
  databaseURL: "https://realtime-database-d0558-default-rtdb.firebaseio.com",
  projectId: "realtime-database-d0558",
  storageBucket: "realtime-database-d0558.firebasestorage.app",
  messagingSenderId: "109851855109",
  appId: "1:109851855109:web:3c2e4cf4da3349dff34f6c",
  measurementId: "G-GSK6QKMFYY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Rating selection functionality
let selectedRating = null;

document.querySelectorAll(".rating-option").forEach((option) => {
  option.addEventListener("click", function () {
    // Remove active class from all options
    document.querySelectorAll(".rating-option").forEach((opt) => {
      opt.classList.remove("active");
    });

    // Add active class to clicked option
    this.classList.add("active");

    // Store the selected rating
    selectedRating = this.getAttribute("data-value");

    // Update the hidden select element
    document.getElementById("rating").value = selectedRating;

    console.log("Selected Rating:", selectedRating);
  });
});

// Getting form div
const feedbackForm = document.getElementById("feedbackForm");

// Function on submit form
feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Getting all elements
  const name = document.getElementById("name").value;
  const fname = document.getElementById("fname").value;
  const gender = document.getElementById("gender").value;
  const date = document.getElementById("date").value;
  const rating = document.getElementById("rating").value;
  const message = document.getElementById("message").value;

  // Data send in Firebase
  push(ref(db, "feedback"), {
    name,
    fname,
    gender,
    date,
    rating,
    message,
  })
    .then(() => {
      if (!name || !message || !gender) {
        alert("Please Fill All Fields");
        return;
      }
      alert("Thank you for your feedback");
      feedbackForm.reset();
    })
    .catch((error) => {
      alert("Error", error.message);
    });
});

// Show Feedbacks on Screen
const feedbackContainer = document.getElementById("feedbackContainer")

// Listen for new feedbacks
onChildAdded(ref(db , "feedback") , (snapshot) => {
  const data = snapshot.val()
  displayFeedback(data)
})

function displayFeedback(data){
  const box = document.createElement("div")
  box.classList.add("feedback-box")
  box.innerHTML = `
  <h4>${data.name}</h4>
  <p><strong>Rating:</strong> ${data.rating}</p>
  <p>${data.date}</p>
  <p>${data.message}</p>
  `
  feedbackContainer.appendChild(box)
}