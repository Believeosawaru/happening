const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("groupId");
const token = localStorage.getItem("authToken");

if (!token) {
    window.location.href = "/html/log-in.html"
}

async function searchUsers() {
    const query = document.getElementById("search-input").value;
    const searchResults = document.getElementById("search-results");

    // if (query.length < 3) {
    //     searchResults.innerHTML = "";
    //     return;
    // }

    try {
        const response = await fetch(`https://happening-api.onrender.com/api/v1/user/search-users/${groupId}?query=${encodeURIComponent(query)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok) {
            searchResults.innerHTML = "";

            result.users.forEach(user => {
                const p = document.createElement("p");

                p.classList.add("p-user-details");

                
                if (result.users.length === 0) {
                    p.textContent = "User Not Found";
                }

                p.textContent = `${user.firstName} ${user.lastName}`;

                p.dataset.userId = user._id;

                p.addEventListener("click", () => addMemberToGroup(user._id));

                searchResults.appendChild(p);
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
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ userId })
        });

        const result = await response.json();

        if (response.ok) {
        document.querySelector(".p-user-details").style.backgroundColor = "#FFECB3";

        document.querySelector(".p-user-details").disabled = true;

        document.getElementById("success-sign-up").style.display = "block"

        document.getElementById("success-sign-up").innerHTML = "Member Added Successfully";

        document.getElementById("success-sign-up").classList.add("success-sign-up");
        }

        setTimeout(() => {
            document.getElementById("success-sign-up").style.display = "none";

            window.location.href = "groups.html"
        }, 2000)
    } catch (error) {
        
    }
}