const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("groupId");

if (!token) {
    window.location.href = "/html/log-in.html";
}

document.addEventListener("DOMContentLoaded", async () => {
    if (!token) {
        window.location.href = "/html/log-in.html"
    }

    if (groupId) {
        try {
            const response = await fetch(`http://5.161.186.15/api/v1/user/group/${groupId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (response.ok) {
                const groupDetailsCon = document.getElementById("group-details-container");

                 setTimeout(() => {
                    document.querySelector(".pre-loader").style.display = "none";
                }, 3500);
                
                if (result.createdBy._id !== result.currentUserId) {
                    groupDetailsCon.innerHTML = `
                <h1 id="gd-h2 bttm-space">
                    ${result.data.name} <span id="h2-p">${result.data.groupType}</span>
                </h1>

                <p class="dis-flex" id="group-loc">
                    <span class="material-symbols-outlined">
                        location_on
                        </span> 
                        <span>${result.data.location}</span>
                </p>

                <p id="group-desc">
                    ${result.data.description}
                </p>

                <p class="dis-flex">
                    <span class="material-symbols-outlined">
                    person
                    </span>
                    <span>${result.createdBy.firstName} ${result.createdBy.lastName}
                        <span id="h2-p">Admin</span></span>
                </p>

                <button><a href="https://5.161.186.15/html/groups/leave-group.html?groupId=${result.data._id}">Leave Group</a></button>
                `;
                } else {
                    if (result.data.inviteLink) {
                        groupDetailsCon.innerHTML = `
                        <h1 id="gd-h2 bttm-space">
                        Rant HQ <span id="h2-p">public</span>
                    </h1>

                    <p class="dis-flex" id="group-loc">
                        <span class="material-symbols-outlined">
                            location_on
                            </span> 
                            <span>New York</span>
                    </p>

                    <p id="group-desc">
                        Welcome to RANT HQ! 🎤✨ This is your safe space to let loose and share your thoughts, frustrations, and rants about anything and everything. From everyday annoyances to the world’s biggest issues, no topic is too big or too small.

                        Here, we encourage passionate discussions and the cathartic release of your feelings. Share your rants, engage with fellow members, and find solidarity in your grievances. Just remember to keep it respectful—everyone has a right to express their opinions!

                        Join us to vent, connect, and maybe even find some humor in the chaos. Let’s turn those frustrations into fun! 🗣️💥
                    </p>

                    <p class="dis-flex">
                        <span class="material-symbols-outlined">
                        person
                        </span>
                        <span>Believe Osawaru
                            <span id="h2-p">Admin</span></span>
                    </p>

                    <div class="dis-flex" id="two-btns">
                        <button onclick="copy(${result.data.inviteLink})"><i class="fa fa-copy"></i> Group Link</button>

                        <button><a href="http://5.161.186.15/html/groups/add-members.html?groupId=${result.data._id}">Add Members</a></button>
                    </div>
                                `;
                            } else {
                                groupDetailsCon.innerHTML = `
                            <h1 id="gd-h2 bttm-space">
                                ${result.data.name} <span id="h2-p">${result.data.groupType}</span>
                            </h1>

                            <p class="dis-flex" id="group-loc">
                                <span class="material-symbols-outlined">
                                    location_on
                                    </span> 
                                    <span>${result.data.location}</span>
                            </p>

                            <p id="group-desc">${result.data.description}</p>

                            <p class="dis-flex">
                                <span class="material-symbols-outlined">
                                person
                                </span>
                                <span>${result.createdBy.firstName} ${result.createdBy.lastName}
                                    <span id="h2-p">Admin</span></span>
                            </p>

                            <div class="dis-flex" id="two-btns">
                                <button onclick="generateInviteLink();">Generate Link</button>

                                <button><a href="http://5.161.186.15/html/groups/add-members.html?groupId=${result.data._id}">Add Members</a></button>
                            </div>

                            <p id="group-link">
                                
                            </p>
                    `;
                    }
                }

            } else {
                document.getElementById("failed").style.display = "block"
                document.getElementById("failed").innerHTML = result.message;
                console.log(result.message)
                document.getElementById("failed").classList.add("failed");
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        window.location.href = "groups.html"
    }
})

const generateInviteLink = async () => {
    try {
        const response = await fetch(`http://5.161.186.15/api/v1/user/group/${groupId}/generate-link`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            document.querySelector(".group-link").innerHTML = `<p class="copy-i" onclick="copy('${data.data}')"><i class="fa fa-copy"></i> Copy Link</p>`
        }

    } catch (error) {
        console.log(error)
    }
}

function copy(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            document.querySelector(".copy-s").style.display = "block";

            setTimeout(() => {
                document.querySelector(".copy-s").style.display = "none";
            }, 1500)
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}

// <a href="${result.groupLink}">Copy Group Link</a>

// /* <button><a href="add-members.html?groupId=${groupId}">Add Members</a></button> */
