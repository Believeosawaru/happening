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

document.getElementById("bell").addEventListener("click", () => {
    window.location.href = "http://5.161.186.15/html/notifications.html"
})

const userToken = localStorage.getItem("authToken");

async function loadNotifications() {
    try {
        const response = await fetch(`http://5.161.186.15/api/v1/user/my-notifications`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        });

        const data = await response.json();

        if (data.message === "jwt malformed" || data.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "log-in.html"
            }, 3500);
        }

        if (response.ok) {
            if (data.data.length > 0) {
                document.querySelector(".alert").style.visibility = "visible";
            }
        } else {
            console.log("Error")
        }
    } catch (error) {
        console.log(error);
    }
}

loadNotifications();