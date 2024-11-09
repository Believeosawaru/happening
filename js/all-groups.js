async function displayAllGroups() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "http://5.161.186.15/log-in"
    }

    try {
        const response = await fetch("http://5.161.186.15/api/v1/user/all-groups", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status == 401) {
            window.location.href = "http://5.161.186.15/log-in"
        }

        const data = await response.json();

        if (response.ok) {
            const groupContainer = document.getElementById("hero");

            texts = "";

            if (data.message.length < 1) {
                return;
            }

            data.message.forEach((group) => {
                texts += `
                <div id="group-desc-div">
                    <h3 class="space-bttm
                    ">&#x1F465; ${group.name}</h3>
                    <p><span>Description:</span> ${group.description || "None Specified"}</p>
                    <p><i class="fa fa-map loc-i"></i> ${group.location || "None Specified"}</p>
                    <button class="join-group-btn"><a href="http://5.161.186.15/groups/join-group?groupId=${group._id}">Join Group</a></button>
                </div>
                `
            });

            groupContainer.innerHTML = texts;
        } else {
            const keys = Object.keys(data);
    
            keys.forEach(key => {
                const value = data[key]; 
                
                document.getElementById("failed").style.display = "block"
                document.getElementById("failed").innerHTML = value;
                document.getElementById("failed").classList.add("failed");
    
                setTimeout(() => {
                    document.getElementById("failed").style.display = "none"
                }, 350)
              });
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = displayAllGroups;