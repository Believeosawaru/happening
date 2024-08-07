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
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 403) {
            return response.json().then(data => {
                if (data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                }
            });
        }

        if (!response.ok) {
            console.log("Bad Network")
        }

        const message = await response.json();

        document.getElementById("welcome-msg").textContent = message.message;
    } catch (error) {
        console.log(error);
    }
}

window.onload = fetchMessage;