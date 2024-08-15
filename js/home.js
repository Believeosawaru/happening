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

async function fetchMessage() {
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch("https://happening-api.onrender.com/api/v1/user/home", {
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

        if (response.status == 404) {
            window.location.href = "log-in.html"
        }

        if (response.status == 401) {
            window.location.href = "log-in.html"
        }

        if (!response.ok) {
            console.log("Bad Network")
        }

        const message = await response.json();

        if (response.ok) {
            document.getElementById("welcome-msg").textContent = message.message;
        } else {
            console.log("Bad Network")
        }
    } catch (error) {
        console.log(error);
    }
}

async function fetchGroup() {
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch("https://happening-api.onrender.com/api/v1/user/home-groups", {
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

        if (response.status == 404) {
            window.location.href = "log-in.html"
        }

        if (response.status == 401) {
            window.location.href = "log-in.html"
        }

        if (!response.ok) {
            console.log("Bad Network")
        }

        const message = await response.json();

        if (response.ok) {
            document.querySelector(".latest-groups").innerHTML = `
            <a class="del-group-a" href="groups/group-details.html?groupId=${message.message._id}">${message.message.name}</a>
            `
        } else {
            console.log("Bad Network")
        }
    } catch (error) {
        console.log(error);
    }
}

function onLoad() {
    fetchMessage();
    fetchGroup();
}

window.onload = onLoad;