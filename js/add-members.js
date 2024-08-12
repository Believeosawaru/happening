const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("groupId");
const token = localStorage.getItem("authToken");

if (!token) {
    window.location.href = "/html/log-in.html"
}

async function searchUsers() {
    const query = document.getElementById("search-input").value;
    const searchResults = document.getElementById("search-results");

    if (query.length < 3) {
        searchResults.innerHTML = "";
        return;
    }

    try {
        const response = await fetch(`https://happening-api.onrender.com/api/v1/user/search-users?query=${encodeURIComponent(query)}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok) {
            searchResults.innerHTML = "";

            result.users.forEach(user => {
                const li = document.createElement("li");

                li.textContent = `${user.firstName} ${user.lastName} (${user.email})`;

                li.dataset.userId = user._id;

                li.addEventListener("click", () => addMemberToGroup(user._id));

                searchResults.appendChild(li);
            });
        } else {
            searchResults.innerHTML = `<li>${result.message}</li>`;
        }
    } catch (error) {
        console.log(error)
    }
}

async function addMemberToGroup(userId) {
    try {
        const response = await fetch(`https://happening-api.onrender.com/api/v1/user/group/${groupId}/add-member`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId })
        });

        const result = await response.json();

        if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "Member Added Successfully";

        document.getElementById("success-sign-up").classList.add("success-sign-up");
        }
    } catch (error) {
        
    }
}