async function getEmail() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "log-in.html"
    }

    try {
        const response = await fetch("https://happening-api.onrender.com/send-on-load", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.log("Bad Network");
        }

        const message = await response.json();
    } catch (error) {
        console.log(error);
    }
}

window.onload = getEmail;