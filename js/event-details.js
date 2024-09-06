const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("eventId");

// if (!token) {
//     window.location.href = "/html/log-in.html";
// }

document.addEventListener("DOMContentLoaded", async () => {
    // if (!token) {
    //     window.location.href = "/html/log-in.html"
    // }

    if (eventId) {
        try {
            const response = await fetch(`https://happening-api.onrender.com/api/v1/user/event/${eventId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (response.ok) {
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

                    <h2 id="gd-h2 bttm-space">Bacon Party <span id="h2-p">Private</span></h2>

                    <p class="event-date">
                         &#x1F4C5; September 2, 2024
                    </p>
    
                    <div id="desc">
                        <p><span>Event Description:</span> This is an event for bacon lovers, and a time for friends and family to catch up.</p>
    
                        <p><span>Location:</span> Benin, Nigeria</p>
    
                        <p><span>Time:</span> &#x23F0; 21:48 (+02:00 UTC)</p>
    
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
})

// const generateInviteLink = async () => {
//     try {
//         const urlParams = new URLSearchParams(window.location.search);
//         const groupId = urlParams.get("groupId");
        
//         const response = await fetch(`https://happening-api.onrender.com/api/v1/user/group/${groupId}/generate-link`, {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         });

//         const data = await response.json();

//         if (response.ok) {
//             document.querySelector(".group-link").innerHTML = `<p class="copy-i" onclick="copy('${data.data}')"><i class="fa fa-copy"></i> Copy Link</p>`
//         }

//     } catch (error) {
//         console.log(error)
//     }
// }

// function copy(text) {
//     navigator.clipboard.writeText(text)
//         .then(() => {
//             document.querySelector(".copy-s").style.display = "block";

//             setTimeout(() => {
//                 document.querySelector(".copy-s").style.display = "none";
//             }, 1500)
//         })
//         .catch(err => {
//             console.error('Failed to copy text: ', err);
//         });
// }

// <a href="${result.groupLink}">Copy Group Link</a>

// /* <button><a href="add-members.html?groupId=${groupId}">Add Members</a></button> */
