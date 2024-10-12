const menu = document.querySelector('.menu');
const userDashboard = document.querySelector('.user-dashboard');
const pcMenu = document.querySelector('.pc-menu');
const verifyDiv = document.querySelector('.not-verified');

function openMenu() {
    if (menu.classList.contains('close-menu')) {
        menu.classList.add('open-menu');

        menu.classList.remove('close-menu');
    } else {
        menu.classList.add('close-menu');
        
        menu.classList.remove('open-menu');
    }
}

async function userProfile() {
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch("http://5.161.186.15/api/v1/user/user-profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status == 403) {
            pcMenu.style.display = "none";
            userDashboard.style.display = "none";
            menu.style.display = "none";
            verifyDiv.style.display = "block";
        }

        const message = await response.json();

        if (message.message === "jwt malformed" || message.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "log-in.html"
            }, 3500);
        }

        if (response.ok) {
           console.log(message)
        } else {
            console.log(message)
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = userProfile;