const token = localStorage.getItem("authToken");

async function loadNotifications() {
    try {
        const response = await fetch(`https://happening.net/api/v1/user/my-notifications`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data.message === "jwt malformed" || data.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "https://happening.net/log-in"
            }, 3500);
        }

        if (response.ok) {
            setTimeout(() => {
                document.querySelector(".pre-loader").style.display = "none";
            }, 350);

            let accum = "";

            data.data.reverse();

            data.data.forEach(notis => {
                const eventDate = new Date(notis.timestamp);
                const date = eventDate.toLocaleDateString();
                const time = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const html = `
                <div>
                    <h4>${notis.message}</h4>
                    <div id="time-date-stamp">
                        <p class="dis-flex"> 
                            <span class="material-symbols-outlined">
                            calendar_month
                            </span>
                            <span>${date}</span>
                        </p>
                        <p class="dis-flex"> 
                            <span class="material-symbols-outlined">
                            schedule
                            </span>
                            <span>${time}</span>
                        </p>
                    </div>
                </div>
            `;

            accum += html
            });

            document.getElementById("my-notifications").innerHTML = accum;
        } else {
            console.log("Error")
        }
    } catch (error) {
        console.log(error);
    }
}

loadNotifications();