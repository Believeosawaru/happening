const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("eventId");
const token = localStorage.getItem("authToken");

if (!token) {
    window.location.href = "/html/log-in.html"
}


const retreiveInfo = async () => {
    const info = await fetch(`https://happening-api.onrender.com/api/v1/user/event-details/${eventId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    const event = await info.json();

    if (info.ok) {
    const eventTime = new Date(info.data.time);
    const formattedDate = eventTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    let name = document.getElementById("event-name");
    let description = document.getElementById("event-desc");
    let location = document.getElementById("location");
    let date = document.getElementById("event-time");

    name.value = event.data.name;
    description.value = event.data.description;
    location.value = event.data.location;
    date.value = formattedDate;
    } else {
        console.log("Could'nt Fetch")
    }
} 

const editEventUrl = `https://happening-api.onrender.com/api/v1/user/edit-event-info/${eventId}`;

const delBtn = document.getElementById("event-del-link");

delBtn.innerHTML = `<a href="delete-event.html?eventId=${eventId}" class="del-group-a">Delete Event</a>`;

function disableBtn() {
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black"
}

const button = document.getElementById("edit-event-btn");

if (eventId) {
    document.getElementById("edit-event").addEventListener("submit", async (e) => {
        e.preventDefault();
    
        disableBtn();

        const name = document.getElementById("event-name").value;
        const description = document.getElementById("event-desc").value;
        const time = document.getElementById("event-time").value;
        const location = document.getElementById("location").value;
        const type = document.getElementById("event-type").value;
    
        try {
            const response = await fetch(editGroupUrl, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    description,
                    time,
                    location,
                    type
                })
            });
    
        const data = await response.json();
    
        if (response.ok) {
            document.getElementById("success-sign-up").innerHTML = "Event Edited Successfully";
            document.getElementById("success-sign-up").classList.add("success-sign-up");
    
            button.style.cursor = "wait";
    
            setTimeout(() => {
                window.location.href = `events.html`
            }, 1000)
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
    
                button.disabled = false;
              });
    
            button.style.backgroundColor = "#FF4500";
            button.style.color = "white"
        }
    
        } catch (error) {
            document.getElementById("failed").style.display = "block"
            document.getElementById("failed").innerHTML = "There Was An Error, Please Reload The Page";
            document.getElementById("failed").classList.add("failed");
            console.log(error);
        }
    })
}

window.onload = retreiveInfo;