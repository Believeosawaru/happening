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
        const response = await fetch("https://happening.net/api/v1/user/my-profile", {
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

            if (message.data.profilePicture) {
                const profileImage = document.getElementById("user-image");

                profileImage.src = `https://happening.net/uploads/${message.data.profilePicture}`;
            }

            document.getElementById("user-name").innerHTML = `${message.data.firstName} ${message.data.lastName}`;

            document.getElementById("my-followers").innerHTML = `${message.data.followers}`;
            document.getElementById("my-following").innerHTML = `${message.data.following}`;

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

document.getElementById("user-image").addEventListener("click", () => {
    document.querySelector(".user-upload").classList.add("u-u-add");
});

document.querySelector("#close").addEventListener("click", () => {
    document.querySelector(".user-upload").classList.remove("u-u-add");
})

document.getElementById('file-button').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('photo-select').click();
});

const form = document.getElementById('uploadForm');
const formInput = document.getElementById('photo-select');

formInput.addEventListener("change", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    const formData = new FormData(form);
    const file = formInput.files[0];

    formData.append("profilePicture", file)

    try {
        const response = await fetch("https://happening.net/api/v1/user/upload", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        // console.log(formData)

        const message = await response.json();

        if (message.message === "jwt malformed" || message.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "https://happening.net/log-in"
            }, 350);
        }

        if (response.ok) {
            // console.log(message)

            const imageUrl = message.data;

            const profileImage = document.getElementById("user-image");

            profileImage.src = `https://happening.net/uploads/${imageUrl}`;
        }
    } catch (error) {
        console.log(error);
    }
});

window.onload = userProfile;