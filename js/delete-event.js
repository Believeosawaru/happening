const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("eventId");

const delEventUrl = `https://happening.net/api/v1/user/delete-event/${eventId}`

if (!token) {
    window.location.href = "https://happening.net/log-in"
}

const button = document.getElementById("delete-event-btn");

function disableBtn() {
    button.disabled = true;
    button.style.color = "#000";
    button.innerHTML = "Deleting Event...."
}

document.getElementById("delete-event").addEventListener("submit", async (e) => {
    e.preventDefault();

    disableBtn();

    try {
        const response = await fetch(delEventUrl, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

    const data = await response.json();

    if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "Event Deleted Successfully";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        setTimeout(() => {
            window.location.href = `https://happening.net/events`
        }, 1000)
    } else {
        const keys = Object.keys(data);

        keys.forEach(key => {
            const value = data[key]; 
            
            document.getElementById("failed").style.display = "block"
            document.getElementById("failed").innerHTML = value;
            document.getElementById("failed").classList.add("failed");

            setTimeout(() => {
                document.getElementById("failed").style.display = "none";

                button.disabled = false;
                button.style.color = "#FFECB3";
                button.innerHTML = "Delete Event"
            }, 3500);
          });
    }

    } catch (error) {
        document.getElementById("failed").style.display = "block"
        document.getElementById("failed").innerHTML = "There Was An Error, Please Reload The Page";
        document.getElementById("failed").classList.add("failed");
        console.log(error);
    }
})