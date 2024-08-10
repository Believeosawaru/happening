async function displayGroups() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "log-in.html"
    }

    try {
        const response = await fetch("https://happening-api.onrender.com/api/v1/user/groups", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status == 401) {
            window.location.href = "log-in.html"
        }

        const data = await response.json();

        if (response.ok) {
            const groupContainer = document.getElementById("hero");

            texts = "";

            data.message.forEach((group) => {
                texts += `
                <a href="group-details.html?groupId="${group.name}">
                <div id="group-desc-div">
                    <h3>${group.name}</h3>
                    <p>&#x1F4CD; ${group.location}</p>
                    <p class="group-type">${group.groupType}</p>
                </div>
                </a>
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
                }, 3500)
              });
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = displayGroups;