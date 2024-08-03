async function fetchMessage() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "log-in.html"
    }

    try {
        const response = await fetch("https://happening-api.onrender.com/user/v1/home", {
            method: "GET",
            headers: {
                "auth": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            res.send("Bad Network")
        }

        const message = await response.text();

        document.getElementById("welcome-msg").textContent = message;
    } catch (error) {
        console.log(error.message);
    }
}

window.onload = fetchMessage;