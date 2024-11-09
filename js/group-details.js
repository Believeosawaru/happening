const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("groupId");

if (!token) {
    window.location.href = "http://5.161.186.15/log-in";
}

document.addEventListener("DOMContentLoaded", async () => {
    if (!token) {
        window.location.href = "http://5.161.186.15/log-in"
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
                }, 350);
                
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

               <div class="center">
                            <img src="../../images/group-image.jpg" id="group-img">
                            </div>

                             <div class="group-info">
                                <h3>About This Group</h3>
                                <p>
                                ${result.data.description.replace(/\n/g, "<br>")}
                                </p>
                             </div>

                <p class="dis-flex">
                    <span class="material-symbols-outlined">
                    person
                    </span>
                    <span>${result.createdBy.firstName} ${result.createdBy.lastName}
                        <span id="h2-p">Admin</span></span>
                </p>

                <button><a href="http://5.161.186.15/groups/leave-group?groupId=${result.data._id}">Leave Group</a></button>
                `;
                } else {
                    groupDetailsCon.innerHTML = `
                        <h1 id="gd-h2 bttm-space">
                        ${result.data.name} <span id="h2-p">public</span>
                    </h1>

                    <div id="group-loc-div">
                        <p class="dis-flex" id="group-loc">
                            <span class="material-symbols-outlined">
                                location_on
                                </span> 
                                <span>New York</span>
                        </p>
                    </div>

                    <div class="center">
                            <img src="../../images/group-image.jpg" id="group-img">
                            </div>

                             <div class="group-info">
                                <h3>About This Group</h3>
                                <p>
                                ${result.data.description.replace(/\n/g, "<br>")}
                                </p>

                                <button><a href="http://5.161.186.15/groups/group-iv-send?groupId=${groupId}">Send Email Invitation</a></button>

                                <span class="material-symbols-outlined" id="edit-group-pen">
                                <a href="http://5.161.186.15/groups/group-details-edit?groupId=${result.data._id}">
                                        edit
                                </a>
                                </span>
                             </div>

                    <p class="dis-flex">
                        <span class="material-symbols-outlined">
                        person
                        </span>
                        <span>${result.createdBy.firstName} ${result.createdBy.lastName}
                            <span id="h2-p">Admin</span></span>
                    </p>

                    <div class="dis-flex" id="two-btns">
                        <button onclick="copy('http://5.161.186.15/groups/join-group?name=${result.data.slug}')"><i class="fa fa-copy"></i> Group Link</button>

                        <button><a href="http://5.161.186.15/groups/add-members?groupId=${result.data._id}">+ Members</a></button>
                    </div>
                                `;
                }

                const accumTwo = ``;

                if (result.relatedGroups < 1) {
                    return document.getElementById("slides").innerHTML = `<h3 id="oswald">No Related Group</h3>`;
                 }

                result.relatedGroups.forEach(group => {
                    const html = `
                       <a href="http://5.161.186.15/groups/group-details?groupId=${group._id}">
                        <div>
                            <h4>${group.name}</h4>
                            <p>${result.data.description}</p>
                            <section class="small-details">
                                <p class="dis-flex">
                                    <span class="material-symbols-outlined">
                                        location_on
                                    </span> 
                                    <span>${group.location}</span>
                                </p>
                            </section>
                        </div>
                       </a>
                    `;

                    accumTwo += html;
                });

                document.getElementById("slides").innerHTML = accumTwo;

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
        window.location.href = "http://5.161.186.15/groups/groups"
    }
});

function copy(text) {
    // navigator.clipboard.writeText(text)
    //     .then(() => {
    //         document.querySelector(".copy-s").style.display = "block";

    //         setTimeout(() => {
    //             document.querySelector(".copy-s").style.display = "none";
    //         }, 1500)
    //     })
    //     .catch(err => {
    //         console.error('Failed to copy text: ', err);
    //     });

    const textarea = document.createElement("textarea");
    // textarea.style.display = "none";
    textarea.value = text;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length)

    try {
        const success = document.execCommand("copy");

        if (!success) {
            console.log("Copy Failed")
        } else {
            return;
        }
    } catch (error) {
        console.log(error)
    }

    document.querySelector(".copy-s").style.display = "block";

    setTimeout(() => {
        document.querySelector(".copy-s").style.display = "none";
    }, 1500)

    document.body.removeChild(textarea);
}

// <a href="${result.groupLink}">Copy Group Link</a>

// /* <button><a href="add-members.html?groupId=${groupId}">Add Members</a></button> */
