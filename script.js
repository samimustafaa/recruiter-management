// script.js

// Simulated user data
const users = [
  { username: "user1", password: "password1", name: "John Doe" },
  { username: "user2", password: "password2", name: "Jane Smith" },
];

// State
let currentUser = null;
let recruiters = [];

// DOM Elements
const loginPage = document.getElementById("loginPage");
const appContent = document.getElementById("appContent");
const homePage = document.getElementById("homePage");
const recruitersPage = document.getElementById("recruitersPage");
const interviewedPage = document.getElementById("interviewedPage");
const addRecruiterBtn = document.getElementById("addRecruiterBtn");
const recruiterFormPopup = document.getElementById("recruiterFormPopup");
const recruiterForm = document.getElementById("recruiterForm");
const recruiterFirstName = document.getElementById("recruiterFirstName");
const recruiterLastName = document.getElementById("recruiterLastName");
const recruiterNumber = document.getElementById("recruiterNumber");
const recruiterRole = document.getElementById("recruiterRole");
const recruiterEmail = document.getElementById("recruiterEmail");
const recruiterList = document.getElementById("recruiterList");
const interviewedList = document.getElementById("interviewedList");
const cancelFormBtn = document.getElementById("cancelFormBtn");

const homeLink = document.getElementById("homeLink");
const recruitersLink = document.getElementById("recruitersLink");
const interviewedLink = document.getElementById("interviewedLink");
const userGreeting = document.getElementById("userGreeting");
const logoutBtn = document.getElementById("logoutBtn");

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Functions
function showPage(page) {
  homePage.style.display = "none";
  recruitersPage.style.display = "none";
  interviewedPage.style.display = "none";
  page.style.display = "block";
}

function login(event) {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;

  currentUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (currentUser) {
    userGreeting.textContent = currentUser.name;
    loginPage.style.display = "none";
    appContent.style.display = "flex";
    showPage(homePage);
  } else {
    alert("Invalid username or password");
  }
}

function logout() {
  currentUser = null;
  loginPage.style.display = "flex";
  appContent.style.display = "none";
}

function addRecruiter(event) {
  event.preventDefault();
  const recruiter = {
    firstName: recruiterFirstName.value,
    lastName: recruiterLastName.value,
    number: recruiterNumber.value,
    role: recruiterRole.value,
    email: recruiterEmail.value,
    interviewed: false,
  };

  recruiters.push(recruiter);
  recruiterForm.reset();
  recruiterFormPopup.style.display = "none";
  renderRecruiterList();
}

function renderRecruiterList() {
  recruiterList.innerHTML = "";
  recruiters.forEach((recruiter, index) => {
    if (!recruiter.interviewed) {
      const li = document.createElement("li");
      li.innerHTML = `<div class="status">
                <span class="status-icon"><i class="fa-regular fa-clock"></i></span>  Pending
            </div>
      <span>${recruiter.firstName} ${recruiter.lastName} (${recruiter.role})</span>
            `;

      const statusBtn = document.createElement("button");
      statusBtn.textContent = "Done";
      statusBtn.onclick = () => markAsInterviewed(index);

      li.appendChild(statusBtn);
      recruiterList.appendChild(li);
    }
  });

  interviewedList.innerHTML = "";
  recruiters.forEach((recruiter) => {
    if (recruiter.interviewed) {
      const li = document.createElement("li");
      li.textContent = `${recruiter.firstName} ${recruiter.lastName} (${recruiter.role}) - Interviewed`;
      interviewedList.appendChild(li);
    }
  });
}

function markAsInterviewed(index) {
  recruiters[index].interviewed = true;
  renderRecruiterList();
}

// Event Listeners
homeLink.addEventListener("click", () => showPage(homePage));
recruitersLink.addEventListener("click", () => showPage(recruitersPage));
interviewedLink.addEventListener("click", () => showPage(interviewedPage));

addRecruiterBtn.addEventListener(
  "click",
  () => (recruiterFormPopup.style.display = "flex")
);
cancelFormBtn.addEventListener(
  "click",
  () => (recruiterFormPopup.style.display = "none")
);
recruiterForm.addEventListener("submit", addRecruiter);
logoutBtn.addEventListener("click", logout);
loginForm.addEventListener("submit", login);

// Initialize
showPage(homePage);
