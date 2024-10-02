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
                if (result.message === "jwt malformed") {
                    setTimeout(() => {
                        window.location.href = "log-in.html"
                    }, 3500);
                }

                setTimeout(() => {
                    document.querySelector(".pre-loader").style.display = "none";
                }, 3500);

                const eventDetailsCon = document.getElementById("event");

                const eventDate = new Date(result.data.date);
                const formattedDate = eventDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });
                
                if (result.createdBy._id !== result.currentUserId) {
                    eventDetailsCon.innerHTML = `                <div id="group-details-container">
                    <h1 id="gd-h2 bttm-space">
                        ${result.data.name} <span id="h2-p">${result.data.type}</span>
                    </h1>
    
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
                    </div>
                </div>
    
                <div class="event-info">
                    <h3>About This Event</h3>
                    <p>
                        As the autumn leaves begin to fall, Sarah and Jake are excitedly preparing for their upcoming marriage. Surrounded by family and friends, they’ll exchange vows in a charming countryside venue, filled with vibrant flowers and soft, golden light. Their love story, blossomed over years of laughter and adventures, will culminate in a celebration of commitment and joy. With heartfelt music, delicious food, and personal touches that reflect their journey together, the day promises to be unforgettable. As they embark on this new chapter, they look forward to a future filled with love, growth, and shared dreams.
                    </p>   
                </div>`;
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