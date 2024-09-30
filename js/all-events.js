async function displayAllEvents() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "/html/log-in.html"
    }

    try {
        const response = await fetch("http://5.161.186.15/api/v1/user/all-events", {
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
            const eventContainer = 
            document.getElementById("hero")

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
               <div>
                       <h3>${event.name}</h3>
                       <p class="dis-flex">
                            <span class="material-symbols-outlined">
                            location_on
                            </span> 
                            <span>${event.location || "None Specified"}</span>
                        </p>

                       <p class="dis-flex">
                            <span class="material-symbols-outlined">
                            schedule
                            </span>
                            <span>${event.time} ${event.timeZone}</span>
                       </p>

                        <p class="dis-flex">
                            <span class="material-symbols-outlined">
                                calendar_month
                            </span>
                            <span>${formattedDate}</span>
                        </p>
                    </div>

                `
            });

            // <button><a href="https://happening-khaki.vercel.app/html/groups/join-group.html?groupId=${group._id}">Join Group</a></button>
            // <p class="group-type">${group.groupType}</p>

            eventContainer.innerHTML = texts;
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