async function displayAllEvents() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "/html/log-in.html"
    }

    try {
        const response = await fetch("https://happening-api.onrender.com/api/v1/user/all-events", {
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
            const groupContainer = document.getElementById("hero");

            texts = "";

            data.message.forEach((event) => {
            const eventTime = new Date(event.time);
            const formattedDate = eventTime.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });

                texts += `
                <div id="event-desc-div">
                        <img src="../../images/calender.svg">
                    
                        <div>
                            <p><span>Description:</span> ${event.description}</p>
                            <p><span>Location:</span> ${event.location}</p>
                            <p><span>Date:</span> ${formattedDate}</p>
                            <p><span>Type:</span> ${event.type}</p>
                        </div>
                </div>
                `
            });

            // <button><a href="https://happening-khaki.vercel.app/html/groups/join-group.html?groupId=${group._id}">Join Group</a></button>
            // <p class="group-type">${group.groupType}</p>

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

window.onload = displayAllEvents;