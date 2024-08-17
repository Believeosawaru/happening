async function displayEvents() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "log-in.html"
    }

    try {
        const response = await fetch("https://happening-api.onrender.com/api/v1/user/events", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status == 401) {
            window.location.href = "log-in.html"
        }

        const data = await response.json();

        if (response.ok) {
            const eventContainer = document.getElementById("hero");

            texts = "";

            if (data.message.length < 1) {
                return;
            } else {
            data.message.forEach((event) => {
                const eventTime = new Date(event.time);
                const formattedDate = eventTime.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });

                texts += `
                <a href="event-details.html?eventId=${event._id}">
                <div id="group-desc-div">
                    <h3>${event.name}</h3>
                    <p><i class="fa fa-map loc-i"></i> ${event.location}</p>
                    <p>Date: ${formattedDate}</p>
                    <p class="group-type">${event.type}</p>
                </div>
                </a>
                `
            });

            eventContainer.innerHTML = texts;
        }            

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

window.onload = displayEvents;