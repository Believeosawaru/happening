const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("eventId");
const token = localStorage.getItem("authToken");

if (!token) {
    window.location.href = "https://happening.net/log-in";
}

document.getElementById("create-category").addEventListener("submit", async () => {
    try {
        const category = document.getElementById("category");
        
        const response = await fetch(`https://happening.net/api/v1/blog/create-category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ category })
        });

        const result = await response.json();

        console.log(result)

        if (response.ok) {
        document.getElementById("success-sign-up").style.display = "block";

        document.getElementById("success-sign-up").innerHTML = result.message;

        document.getElementById("success-sign-up").classList.add("success-sign-up");
        }

        setTimeout(() => {
            document.getElementById("success-sign-up").style.display = "none";
        }, 2000)
    } catch (error) {
        console.log(error);
    }
})