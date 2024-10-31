async function displayEvents() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "../log-in.html"
    }

    try {
        const response = await fetch("http://5.161.186.15/api/v1/user/events", {
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

            console.log("HMMM")

            setTimeout(() => {
                document.querySelector(".pre-loader").style.display = "none";
                console.log("HMMM")
            }, 3500);

            if (data.message.length < 1) {
                return;
            } else {
            data.message.forEach((event) => {
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });

                texts += `
               <a href="event-details.html?eventId=${event._id}">
                    <div id="event-desc-div">
                            <div class="flexo-text">
                                <h3>&#x1F4C5; ${event.name}</h3>
                                <p><span>Location:</span> ${event.location || "None Specified"}</p>
                                <p><span>Date:</span> ${formattedDate}</p>
                                <p><span>Time:</span> ${event.time} (${event.timeZone} UTC)</p>
                                <p><span>Type:</span> ${event.type}</p>
                            </div>
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
              console.log(data)
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = displayEvents;
