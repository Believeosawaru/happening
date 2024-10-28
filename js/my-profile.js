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
        const response = await fetch("http://5.161.186.15/api/v1/user/my-profile", {
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

document.getElementById('file-button').addEventListener('click', () => {
    document.getElementById('photo-select').click();
});

const form = document.getElementById('uploadForm');
const formBtn = document.getElementById('photo-select');

/* <script>
    const form = document.getElementById('uploadForm');
    const imageInput = document.getElementById('imageInput');

    // Listen for changes on the file input
    imageInput.addEventListener('change', async (e) => {
        const file = e.target.files[0]; // Get the selected file

        if (file) {
            const formData = new FormData(form);

            // Automatically call the upload function
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
$$
            const result = await response.json();
            console.log(result); // Log the result or handle it as needed
        }
    });
</script> */

formBtn.addEventListener("change", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    const formData = new FormData(event.target);

    try {
        const response = await fetch("http://5.161.186.15/api/v1/user/upload", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        const message = await response.json();

        if (message.message === "jwt malformed" || message.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "log-in.html"
            }, 3500);
        }

        if (response.ok) {
            console.log(message)
        }
    } catch (error) {
        console.log(error);
    }
});

window.onload = userProfile;