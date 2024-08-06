const menu = document.querySelector('.menu');

function openMenu() {
    if (menu.classList.contains('close-menu')) {
        menu.classList.add('open-menu');

        menu.classList.remove('close-menu');
    } else {
        menu.classList.add('close-menu');
        
        menu.classList.remove('open-menu');
    }
}

async function fetchMessage() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "log-in.html"
    }

    try {
        const response = await fetch("https://happening-api.onrender.com/user/v1/home", {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.log("Bad Network")
        }

        const message = await response.text();

        // document.getElementById("welcome-msg").textContent = message;
        console.log(message)
    } catch (error) {
        console.log(error);
    }
}

window.onload = fetchMessage;