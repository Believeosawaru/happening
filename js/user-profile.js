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

async function userProfile() {
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch("http://5.161.186.15/api/v1/user/user-profile", {
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

            document.getElementById("user-name").innerHTML = `${message.data.firstName} ${message.data.lastName}`;

            const events = message.data.events;
            const groups = message.data.groups;

            let accum  = ``;

            events.forEach(event => {
                const html = `  
                        <h3>${event.name}</h3>

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
                            <span>${event.date}</span>
                        </p>
                `;

                accum += html;
            });

            document.getElementById("user-event").innerHTML = accum;
        } else {
            console.log(message)
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = userProfile;