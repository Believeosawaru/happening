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

document.querySelector("user-menu").innerHTML = `
            <p><a class="dis-flex" href="./home.html"><span class="material-symbols-outlined">
                home
                </span> <span>Home</span></a></p>
                
            <p><a class="dis-flex" href="./events/events.html"><span class="material-symbols-outlined">
                event_available
                </span> <span>Events</span></a></p>

            <p><a class="dis-flex" href="./groups/groups.html"><span class="material-symbols-outlined">
                groups
                </span> <span>Groups</span></a></p>

            <p><a class="dis-flex" href="./settings.html"><span class="material-symbols-outlined">
                settings
                </span> <span>Settings</span></a></p>

            <p><a class="dis-flex" href="./tos.html"><span class="material-symbols-outlined">
                description
                </span> <span>Terms Of Service</span></a></p>

            <p><a class="dis-flex" href="./my-profile.html"><span class="material-symbols-outlined">
                person
                </span> <span>My Profile</span></a></p>
            <button class="first-btn"><a href="log-out.html">Log Out</a></button>
            `

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