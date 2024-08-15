async function displayAllGroups() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "/html/log-in.html"
    }

    try {
        const response = await fetch("https://happening-api.onrender.com/api/v1/user/all-groups", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status == 401) {
            window.location.href = "/html/log-in.html"
        }

        const data = await response.json();

        if (response.ok) {
            console.log(data)
            const groupContainer = document.getElementById("all-groups");

            texts = "";

            https://happening-khaki.vercel.app/html/groups/join-link.html?groupToken=6be8d1bb9777d1c3619badfdfa4b77d6/

            https://happening-khaki.vercel.app/html/groups/join-link.html?groupToken=076d3b45e102549f74bec1b94a4a260a/

            data.message.forEach((group) => {
                texts += `
                <div id="group-desc-div">
                    <h3>${group.name}</h3>
                    <p><span>Description:</span> ${group.description}</p>
                    <p><i class="fa fa-map loc-i"></i> ${group.location}</p>
                    <button>Join Group</button>
                    <p class="group-type">${group.groupType}</p>
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
                }, 3500)
              });
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = displayAllGroups;