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

            if (data.message.length < 1) {
                return;
            }

            data.message.forEach((event) => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });

                texts += `
                <div id="event-desc-div">
                            <div class="flexo-text">
                                <h3>&#x1F4C5; ${event.name}</h3>
                                <p><span>Location:</span> ${event.location || "None Specified"}</p>
                                <p><span>Date:</span> ${formattedDate}</p>
                                <p><span>Time:</span> ${event.time} (${event.timeZone} UTC)</p>
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