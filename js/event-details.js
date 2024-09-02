const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("eventId");

if (!token) {
    window.location.href = "/html/log-in.html";
}

document.addEventListener("DOMContentLoaded", async () => {
    if (!token) {
        window.location.href = "/html/log-in.html"
    }

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
                <span>Event Time:</span> ${formattedDate} (${result.data.timeZone} UTC)
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
                <h2 id="gd-h2">${result.data.name}</h2>

                <p>
                Event Description: ${result.data.description}
                </p>

                <p>
                Event Type: ${result.data.type} event
                </p>

                <p>
                Event Date: ${formattedDate}
                </p>

                <p>
                Event Time: ${result.data.time} (${result.data.timeZone} UTC)
                </p>

                <p>
                Location: ${result.data.location}
                </p>

                <p>
                Created By: ${result.createdBy.firstName} ${result.createdBy.lastName}
                </p>

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
