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

            console.log(result);

            if (result.message === "jwt malformed" || result.message === "jwt expired") {
                setTimeout(() => {
                    window.location.href = "log-in.html"
                }, 3500);
            }

            if (response.ok) {
                const eventDetailsCon = document.getElementById("event");

                setTimeout(() => {
                    document.querySelector(".pre-loader").style.display = "none";
                }, 3500);

                const eventDate = new Date(result.data.date);
                const formattedDate = eventDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });
                
                if (result.createdBy._id !== result.currentUserId) {
                    eventDetailsCon.innerHTML = `
                    <div id="group-details-container">

                    <h1 id="gd-h2 bttm-space">
                        ${result.data.name} <span id="h2-p">${result.data.type}</span>
                    </h1>

                     <div class="center">
                        <img src="../../images/default-event-img.jpg" id="event-img">
                    </div>
    
                    <div id="desc">
                    <p class="dis-flex event-date">
                     <span class="material-symbols-outlined">
                        calendar_month
                     </span>
                     <span>${formattedDate}</span>
                    </p>

                    <p class="dis-flex">
                        <span class="material-symbols-outlined">
                            schedule
                        </span>
        
                        <span>
                            ${result.data.time} (${result.data.timeZone} UTC)
                        </span>
                    </p>
            
                    <p class="dis-flex">
                        <span class="material-symbols-outlined">
                        location_on
                        </span> 
                        <span>${result.data.location || "None Specified"}</span>
                    </p>

                     <p class="dis-flex">
                        <span class="material-symbols-outlined">
                        person  
                        </span>
                        <span><a href="../user-profile.html?userId=${result.createdBy._id}">${result.createdBy.firstName} ${result.createdBy.lastName} </a><span id="h2-p">Organizer</span></span>
                     </p>
                    </div>
                </div>
    
                <div class="event-info">
                    <h3>About This Event</h3>
                    <p>
                        ${result.description}
                    </p>   
                </div>

                <h3 class="tags-h3">Event Category</h3>
                <div class="tags">
                    <span>${result.category}</span>
                </div>       
                
                `;
                } else {
                    eventDetailsCon.innerHTML = `
                    <div id="group-details-container">

                    <h1 id="gd-h2 bttm-space">
                        ${result.data.name} <span id="h2-p">${result.data.type}</span>
                    </h1>

                     <div class="center">
                        <img src="../../images/default-event-img.jpg" id="event-img">
                    </div>
    
                    <div id="desc">
                    <p class="dis-flex event-date">
                     <span class="material-symbols-outlined">
                        calendar_month
                     </span>
                     <span>${formattedDate}</span>
                    </p>

                    <p class="dis-flex">
                        <span class="material-symbols-outlined">
                            schedule
                        </span>
        
                        <span>
                            ${result.data.time} (${result.data.timeZone} UTC)
                        </span>
                    </p>
            
                    <p class="dis-flex">
                        <span class="material-symbols-outlined">
                        location_on
                        </span> 
                        <span>${result.data.location || "None Specified"}</span>
                    </p>

                     <p class="dis-flex">
                        <span class="material-symbols-outlined">
                        person
                        </span>
                        <span>${result.createdBy.firstName} ${result.createdBy.lastName} <span id="h2-p">Organizer</span></span>
                     </p>

                     <span class="material-symbols-outlined" id="edit-event">
                        edit
                     </span>
                    </div>
                </div>
    
                <div class="event-info">
                    <h3>About This Event</h3>
                    <p>
                        ${result.description}
                    </p>   
                    <button><a href="event-iv-send.html?eventId=${eventId}">Send Email Invitation</a></button>
                </div>

                <h3 class="tags-h3">Event Category</h3>
                <div class="tags">
                    <span>${result.category}</span>
                </div>           
                `;
                }

                // result.relatedEvents.forEach(event => {
                    
                // });
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
        window.location.href = "events.html"
    }
});