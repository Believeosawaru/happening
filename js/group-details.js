const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("groupId");

if (!token) {
    window.location.href = "/html/log-in.html";
}

document.addEventListener("DOMContentLoaded", async () => {
    if (!token) {
        window.location.href = "/html/log-in.html"
    }

    if (groupId) {
        try {
            const response = await fetch(`https://happening-api.onrender.com/api/v1/user/group/${groupId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (response.ok) {
                const groupDetailsCon = document.getElementById("group-details-container");
                
                if (result.createdBy._id !== result.currentUserId) {
                    groupDetailsCon.innerHTML = `
                <h2 id="gd-h2">${result.data.name}</h2>

                <p>
                Group Description: ${result.data.description}
                </p>

                <p>
                Group Type: ${result.data.groupType} group
                </p>

                <p>
                Location: ${result.data.location}
                </p>

                <p>
                Created By: ${result.createdBy.firstName} ${result.createdBy.lastName}
                </p>
                `;
                } else {
                    groupDetailsCon.innerHTML = `
                <h2 id="gd-h2">${result.data.name}</h2>

                <p>
                Group Description: ${result.data.description}
                </p>

                <p>
                Group Type: ${result.data.groupType} group
                </p>

                <p>
                Location: ${result.data.location}
                </p>

                <p>
                Created By: ${result.createdBy.firstName} ${result.createdBy.lastName}
                </p>

                <button><a href="add-members.html?groupId=${groupId}">Add Members</a></button>
                
                <button onclick="generateInviteLink()">LInk</button>

                <span class="edit-button"><a href="group-details-edit.html?groupId=${groupId}"><i class="fa fa-pencil"></i></a></span>
                `;
                }

            } else {
                document.getElementById("failed").style.display = "block"
                document.getElementById("failed").innerHTML = result.message;
                console.log(result.message)
                document.getElementById("failed").classList.add("failed");
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        window.location.href = "groups.html"
    }
})

const generateInviteLink = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const groupId = urlParams.get("groupId");
        
        const response = await fetch(`https://happening-api.onrender.com/api/v1/user/group/${groupId}/generate-link`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            document.querySelector(".group-link").innerHTML = `${data.inviteLink}`
        }

    } catch (error) {
        console.log(error)
    }
}

// <a href="${result.groupLink}">Copy Group Link</a>

// /* <button><a href="add-members.html?groupId=${groupId}">Add Members</a></button> */
