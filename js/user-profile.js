// const menu = document.querySelector('.menu');
// const userDashboard = document.querySelector('.user-dashboard');
// const pcMenu = document.querySelector('.pc-menu');
// const verifyDiv = document.querySelector('.not-verified');

// function openMenu() {
//     if (menu.classList.contains('close-menu')) {
//         menu.classList.add('open-menu');

//         menu.classList.remove('close-menu');
//     } else {
//         menu.classList.add('close-menu');
        
//         menu.classList.remove('open-menu');
//     }
// }
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");
const token = localStorage.getItem("authToken");
const loader = document.getElementById("loader");

async function userProfile() {
    try {
        const response = await fetch(`http://5.161.186.15/api/v1/user/user-profile/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

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

            if (message.isFollowing) {
                const btnDiv = document.getElementById("fol-unfol-div");
                btnDiv.innerHTML = `<button id="yellow" onclick="unfollowUser();">Unfollow <div id="loader" class="loader" style="visibility: hidden;"></div></button>`;
            }

            document.getElementById("user-followers").innerHTML = `${message.data.followers}`;
            document.getElementById("user-following").innerHTML = `${message.data.following}`;
            
            document.getElementById("user-name").innerHTML = `${message.data.firstName} ${message.data.lastName}`;

            document.getElementById("user-bio").innerHTML = `${message.data.bio}`;

            const events = message.data.events;
            const groups = message.data.groups;

            let eventsAccum  = ``;
            let groupsAccum  = ``;

            events.forEach(event => {
                const eventDate = new Date(event.date);
                
                const formattedDate = eventDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });

                const html = `
                    <div>
                        <h2>${event.name}</h2>

                        <p class="dis-flex">
                            <span class="material-symbols-outlined">
                            location_on
                            </span> 
                            <span>${event.location}</span>
                        </p>

                        <p class="dis-flex">
                            <span class="material-symbols-outlined">
                            schedule
                            </span>
                            <span>${event.time} (${event.timeZone})</span>
                        </p>

                        <p class="dis-flex">
                            <span class="material-symbols-outlined">
                                calendar_month
                            </span>
                            <span>${formattedDate}</span>
                        </p>
                    </div>
                `;

                eventsAccum += html;
            });

            groups.forEach((group) => {
                const html = `
                        <div>
                           <h2>${group.name}</h2>

                        <p>
                            ${group.description}
                        </p>
                        
                        <p class="dis-flex">
                            <span class="material-symbols-outlined">
                            location_on
                            </span> 
                            <span>${group.location}</span>
                        </p>
                        </div>
                `;

                groupsAccum += html;
            });

            document.getElementById("user-event").innerHTML = eventsAccum;

            document.getElementById("user-group").innerHTML = groupsAccum;
        } else {
            console.log(message)
        }
    } catch (error) {
        console.log(error);
    }
}

async function followUser() {
    try {
        loader.style.visibility = "visible";

        const response = await fetch(`http://5.161.186.15/api/v1/user/follow-user/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const message = await response.json();

        if (message.message === "jwt malformed" || message.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "log-in.html"
            }, 3500);
        }

        if (response.ok) {
            const btnDiv = document.getElementById("fol-unfol-div");
            btnDiv.innerHTML = `<button id="yellow" onclick="unfollowUser();">Unfollow <div id="loader" class="loader" style="visibility: hidden;"></div></button>`;
            
            document.getElementById("user-followers").innerHTML++;
        } else {
            console.log("Error")
        }
    } catch (error) {
        console.log(error);
    }
}

async function unfollowUser() {
    try {
        loader.style.visibility = "visible";

        const response = await fetch(`http://5.161.186.15/api/v1/user/unfollow-user/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const message = await response.json();

        if (message.message === "jwt malformed" || message.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "log-in.html"
            }, 3500);
        }

        if (response.ok) {
            const btnDiv = document.getElementById("fol-unfol-div");
            btnDiv.innerHTML = `<button id="follow-btn" onclick="followUser();">Follow <div id="loader" class="loader" style="visibility: hidden;"></div>`;
            
            document.getElementById("user-followers").innerHTML--;
        } else {
            console.log(message)
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = userProfile;