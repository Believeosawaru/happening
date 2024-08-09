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

        const result = await response.json();

        if (response.ok) {
            const groupContainer = document.getElementById("groups");

            result.message.forEach((group) => {
                groupContainer.innerHTML `
                <h3>${group.name}</h3>
                <p>${group.description}</p>
                <p>${group.location}</p>
                <p>${group.groupType}</p>
                `
            })

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

        document.getElementById("welcome-msg").textContent = message.message;
    } catch (error) {
        console.log(error);
    }
}

window.onload = displayGroups;