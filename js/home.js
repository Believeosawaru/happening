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
        const response = await fetch("http://5.161.186.15/api/v1/user/home", {
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
            setTimeout(() => {
                document.querySelector(".pre-loader").style.display = "none";
            }, 3500);
            
            document.getElementById("welcome-msg").textContent = message.message;
            
            if (message.data > 0) {
                document.getElementById("alert").style.visibility = "visible";
            }
        } else {
            console.log("Bad Network")
        }
    } catch (error) {
        console.log(error);
    }
}

async function fetchEvent() {
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch("http://5.161.186.15/api/v1/user/home-events", {
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

        if (!response.ok) {
            console.log("Bad Network")
        }

        const message = await response.json();

        if (message.message === "jwt malformed" || message.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "log-in.html"
            }, 3500);
        }

        if (response.ok) {
            document.querySelector(".latest-events").innerHTML = `
             &#x1F4C5;
            <a class="del-group-a" href="events/event-details.html?eventId=${message.message._id}">${message.message.name}</a>
            `
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
        const response = await fetch("http://5.161.186.15/api/v1/user/home-groups", {
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
            setTimeout(() => {
                document.querySelector(".pre-loader").style.display = "none";
            }, 3500);
            
            document.querySelector(".latest-groups").innerHTML = `
            &#x1F465; 
            <a class="del-group-a" href="groups/group-details.html?groupId=${message.message._id}">${message.message.name}</a>
            `
        } else {
            console.log(message)
        }
    } catch (error) {
        console.log(error.message);
    }
}

function onLoad() {
    fetchMessage();
    fetchEvent();
    fetchGroup();
}

window.onload = onLoad;