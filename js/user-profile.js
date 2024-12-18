const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");
const token = localStorage.getItem("authToken");

async function userProfile() {
    try {
        const response = await fetch(`https://happening.net/api/v1/user/user-profile/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const message = await response.json();

        if (message.message === "jwt malformed" || message.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "https://happening.net/log-in"
            }, 350);
        }

        if (response.ok) {
            setTimeout(() => {
                document.querySelector(".pre-loader").style.display = "none";
            }, 350);

            if (message.isFollowing) {
                const btnDiv = document.getElementById("fol-unfol-div");
                btnDiv.innerHTML = `<button id="yellow" onclick="unfollowUser();">Unfollow</div></button>`;
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
        document.querySelector("#follow-btn").style.background = "#FFECB3";
        document.querySelector("#follow-btn").style.color = "black";

        const response = await fetch(`https://happening.net/api/v1/user/follow-user/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const message = await response.json();

        if (message.message === "jwt malformed" || message.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "https://happening.net/log-in"
            }, 350);
        }

        if (response.ok) {
            const btnDiv = document.getElementById("fol-unfol-div");
            btnDiv.innerHTML = `<button id="yellow" onclick="unfollowUser();">Unfollow</button>`;
            
            document.getElementById("user-followers").innerHTML++;
        } else {
            document.querySelector("#follow-btn").style.background = "#FF4500";
            document.querySelector("#follow-btn").style.color = "white";
            document.getElementById("fol-unfol-div");
            btnDiv.innerHTML = `<button id="follow-btn" onclick="followUser();">Follow</button>`;
        }
    } catch (error) {
        console.log(error);
    }
}

async function unfollowUser() {
    try {
        document.querySelector("#yellow").style.background = "#FF4500";
        document.querySelector("#yellow").style.color = "white";

        const response = await fetch(`https://happening.net/api/v1/user/unfollow-user/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const message = await response.json();

        if (message.message === "jwt malformed" || message.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "log-in.html"
            }, 350);
        }

        if (response.ok) {
            const btnDiv = document.getElementById("fol-unfol-div");
            btnDiv.innerHTML = `<button id="follow-btn" onclick="followUser();">Follow <div id="loader" class="loader"></div></button>`;
            
            document.getElementById("user-followers").innerHTML--;
        } else {
            document.querySelector("#follow-btn").style.background = "#FFECB3";
            document.querySelector("#follow-btn").style.color = "black";
            document.getElementById("fol-unfol-div");
            btnDiv.innerHTML = `<button id="yellow" onclick="unFollowUser();">Unfollow</button>`;
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = userProfile;