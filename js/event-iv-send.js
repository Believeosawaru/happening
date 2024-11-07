const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("eventId");
const token = localStorage.getItem("authToken");

if (!token) {
    window.location.href = "/html/log-in.html";
}

const emailInput = document.getElementById("email-input");
const emailContainer = document.getElementById("labels");

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
}

function addEmailLabel(email) {
    const label = document.createElement("span");
    label.className = "email-label";
    label.textContent = email;

    emailContainer.appendChild(label);
}

emailInput.addEventListener("keypress", (e) => {
    if (e.key === ",") {
        e.preventDefault();

        const email = emailInput.value.trim();

        if (isValidEmail(email)) {
            addEmailLabel(email);

            emailInput.value = "";
        } else  {
            alert("Please Enter A Valid Email Address");
        }
    }
})

// async function searchUsers() {
//     const query = document.getElementById("search-input").value;
//     const searchResults = document.getElementById("search-results");

//     try {
//         const response = await fetch(`http://5.161.186.15/api/v1/user/event/search-users/${eventId}?query=${encodeURIComponent(query)}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             }
//         });

//         const result = await response.json();

//         if (response.ok) {
//             searchResults.innerHTML = "";

//             if (result.users.length < 1) {
//                 searchResults.innerHTML = "User Not Found"
//             }

//             result.users.forEach(user => {
//                 const p = document.createElement("p");

//                 p.classList.add("p-user-details");

//                 p.textContent = `${user.firstName} ${user.lastName}`;

//                 p.dataset.userId = user._id;

//                 p.addEventListener("click", () => addMemberToGroup(user._id));

//                 searchResults.appendChild(p);
//             });
//         } else {
//             searchResults.innerHTML = `${result.message}`;
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// async function addMemberToGroup(userId) {
//     try {
//         const response = await fetch(`http://5.161.186.15/api/v1/user/event/${eventId}/send-invite`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify({ userId })
//         });

//         const result = await response.json();

//         console.log(result)

//         if (response.ok) {
//         document.getElementById("search-input").value = "";

//         document.getElementById("success-sign-up").style.display = "block";

//         document.getElementById("success-sign-up").innerHTML = result.message;

//         document.getElementById("search-results").innerHTML = "";

//         document.getElementById("success-sign-up").classList.add("success-sign-up");
//         }

//         setTimeout(() => {
//             document.getElementById("success-sign-up").style.display = "none";
//         }, 2000)
//     } catch (error) {
//         console.log(error);
//     }
// }