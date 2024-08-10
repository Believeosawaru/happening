document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const groupId = urlParams.get("groupId");
    const token = localStorage.getItem("authToken");

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
                
                groupDetailsCon.innerHTML = `
                <h2>${result.data.name}</h2>
                <p>${result.data.description}</p>
                <p class="group-type">${result.message.groupType}</p>
                <p>${result.data.location}</p>
                <p>${result.createdBy.firstName} ${result.createdBy.lastName}</p>
                `;

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