const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("groupId");
const token = localStorage.getItem("authToken");

if (!token) {
    window.location.href = "/html/log-in.html";
}

async function searchUsers() {
    const query = document.getElementById("search-input").value;
    const searchResults = document.getElementById("search-results");

    try {
        const response = await fetch(`http://5.161.186.15/api/v1/user/group/search/email-users/${groupId}?query=${encodeURIComponent(query)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok) {
            searchResults.innerHTML = "";

            if (result.user.length < 1) {
                searchResults.innerHTML = "User Not Found"
            }

            result.user.forEach(user => {
                const p = document.createElement("p");

                p.classList.add("p-user-details");

                p.textContent = `${user.firstName} ${user.lastName}`;

                p.dataset.userId = user._id;

                p.addEventListener("click", () => addMemberToGroup(user._id));

                searchResults.appendChild(p);
            });
        } else {
            searchResults.innerHTML = `${result.message}`;
        }
    } catch (error) {
        console.log(error)
    }
}

async function addMemberToGroup(userId) {
    try {
        const response = await fetch(`http://5.161.186.15/api/v1/user/group/${groupId}/send-invite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ userId })
        });

        const result = await response.json();

        if (response.ok) {
        document.getElementById("search-input").value = "";

        document.getElementById("success-sign-up").style.display = "block";

        document.getElementById("success-sign-up").innerHTML = "Email Sent Successfully";

        const searchResults = document.getElementById("search-results").innerHTML = "";

        document.getElementById("success-sign-up").classList.add("success-sign-up");
        } else {
            console.log(response)
        }

        setTimeout(() => {
            document.getElementById("success-sign-up").style.display = "none";
        }, 2000)
    } catch (error) {
        console.log(error);
    }
}