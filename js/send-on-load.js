async function getEmail() {
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch("https://happening-api.onrender.com/api/v1/auth/send-on-load", {
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