async function joinEvent() {
    const token = localStorage.getItem("authToken");
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("eventId");

    if (!token) {
        window.location.href = "log-in.html"
    }

    try {
        const response = await fetch(`https://happening-api.onrender.com/api/v1/user/join-event/${eventId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("success-sign-up").classList.add("success-sign-up");

            document.getElementById("success-sign-up").innerHTML = data.message;

            window.location.href = "events.html"
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

window.onload = joinEvent;