const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("eventId");

if (!token) {
    window.location.href = "/html/log-in.html";
}

document.addEventListener("DOMContentLoaded", async () => {
    if (eventId) {
        try {
            const response = await fetch(`http://5.161.186.15/api/v1/user/event/${eventId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (response.ok) {
                if (data.message === "jwt malformed") {
                    setTimeout(() => {
                        window.location.href = "log-in.html"
                    }, 3500);
                }
            
                setTimeout(() => {
                    document.querySelector(".pre-loader").style.display = "none";
                }, 3500);

                const eventDetailsCon = document.getElementById("group-details-container");

                const eventDate = new Date(result.data.date);
                const formattedDate = eventDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });
                
                if (result.createdBy._id !== result.currentUserId) {
                    eventDetailsCon.innerHTML = `
                <h2 id="gd-h2">${result.data.name}</h2>

                <p>
                <span>Event Description:</span> ${result.data.description}
                </p>

                <p>
                <span>Event Type:</span> ${result.data.type} event
                </p>

                 <p>
                <span>Event Date:</span> ${formattedDate}
                </p>

                <p>
                <span>Event Time:</span> ${result.data.time} (${result.data.timeZone} UTC)
                </p>

                <p>
                <span>Location:</span> ${result.data.location}
                </p>

                <p>
                <span>Created By:</span> ${result.createdBy.firstName} ${result.createdBy.lastName}
                </p>
                `;
                } else {
                    eventDetailsCon.innerHTML = `

                    <h2 id="gd-h2 bttm-space">${result.data.name} <span id="h2-p">${result.data.type}</span></h2>

                    <p class="event-date">
                         &#x1F4C5; ${formattedDate}
                    </p>
    
                    <div id="desc">
                        <p><span>Event Description:</span> ${result.data.description}</p>
    
                        <p><span>Location:</span> ${result.data.location}</p>
    
                        <p><span>Time:</span> &#x23F0; ${result.data.time}</p>
    
                        <button><a href="event-iv-send.html?eventId=${eventId}">Send Invitation</a></button>
                    </div>
    
                     
                    <span class="edit-button"><a href="event-details-edit.html?eventId=${eventId}"><i class="fa fa-pencil"></i></a></span>    
                `;
                }

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
});