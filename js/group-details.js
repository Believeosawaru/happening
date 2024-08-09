document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const groupId = urlParams.get("groupId");

    if (groupId) {
        try {
            const response = await fetch(`/group/${groupId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json();

            if (response.ok) {
                const groupDetailsCon = document.getElementById("group-details-container");
                
                groupDetailsCon.innerHTML = `
                    <h3>${result.group.name}</h3>
                    <p>&#x1F4CD; ${result.group.location}</p>
                    <p class="group-type">${result.group.groupType}</p>

                    <h3>Members: ${result.group.members.map((member) => {
                        member.firstName
                        member.email
                    }).join(" ")}</h3>
                `
            } else {
                document.getElementById("failed").style.display = "block"
                document.getElementById("failed").innerHTML = result.message;
                document.getElementById("failed").classList.add("failed");
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        window.location.href = "groups.html"
    }
})