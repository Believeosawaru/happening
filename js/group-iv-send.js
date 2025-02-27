const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("groupId");
const token = localStorage.getItem("authToken");

if (!token) {
    window.location.href = "https://happening.net/log-in";
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

const emails = [];

emailInput.addEventListener("keypress", (e) => {
    if (e.key === ",") {
        e.preventDefault();

        const email = emailInput.value.trim();

        if (isValidEmail(email)) {
            addEmailLabel(email);

            emails.push(email)

            emailInput.value = "";
        } else  {
            alert("Please Enter A Valid Email Address");
        }
    }
});

async function sendInvite() {
    try {
        const response = await fetch(`https://happening.net/api/v1/user/group/${groupId}/send-invite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ emails })
        });

        const result = await response.json();

        console.log(result)

        if (response.ok) {
        document.getElementById("success-sign-up").style.display = "block";

        document.getElementById("success-sign-up").innerHTML = result.message;

        document.getElementById("success-sign-up").classList.add("success-sign-up");
        }

        setTimeout(() => {
            document.getElementById("success-sign-up").style.display = "none";
        }, 2000)
    } catch (error) {
        console.log(error);
    }
}