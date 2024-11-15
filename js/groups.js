async function displayGroups() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "https://happening.net/log-in"
    }

    try {
        const response = await fetch("https://happening.net/api/v1/user/groups", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status == 401) {
            window.location.href = "https://happening.net/log-in"
        }

        const data = await response.json();

        if (response.ok) {
            const groupContainer = document.getElementById("hero");

            texts = "";

            if (data.message.length < 1) {
                return;
            } else {
                data.message.forEach((group) => {
                    texts += `
                    <a href="https://happening.net/groups/group-details?groupId=${group._id}">
                    <div id="group-desc-div">
                        <h3>&#x1F465; ${group.name}</h3>
                        <p><i class="fa fa-map loc-i"></i> ${group.location || "None Specified"}</p>
                        <p class="group-type">${group.groupType}</p>
                    </div>
                    </a>
                    `
                });
    
                groupContainer.innerHTML = texts;
            }

        } else {
            const keys = Object.keys(data);
    
            keys.forEach(key => {
                const value = data[key]; 
                
                document.getElementById("failed").style.display = "block"
                document.getElementById("failed").innerHTML = value;
                document.getElementById("failed").classList.add("failed");
    
                setTimeout(() => {
                    document.getElementById("failed").style.display = "none"
                }, 3500)
              });
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = displayGroups;