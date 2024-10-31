async function displayPublicEvents() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "/html/log-in.html"
    }

    try {
        const response = await fetch("http://5.161.186.15/api/v1/user/all-events", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data.message === "jwt malformed" || data.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "log-in.html"
            }, 3500);
        }

        if (response.ok) {
            const eventContainer = 
            document.getElementById("events-list")

            texts = "";

            if (data.message.length < 1) {
                return;
            }

            data.message.forEach((event) => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });

                texts += `
               <div>
                       <h2>${event.name}</h2>
                       <p class="dis-flex">
                            <span class="material-symbols-outlined">
                            location_on
                            </span> 
                            <span>${event.location || "None Specified"}</span>
                        </p>

                       <p class="dis-flex">
                            <span class="material-symbols-outlined">
                            schedule
                            </span>
                            <span>${event.time} ${event.timeZone}</span>
                       </p>

                        <p class="dis-flex">
                            <span class="material-symbols-outlined">
                                calendar_month
                            </span>
                            <span>${formattedDate}</span>
                        </p>
                    </div>

                `
            });

            setTimeout(() => {
                document.querySelector(".pre-loader").style.display = "none";
            }, 3500);

            // <button><a href="https://happening-khaki.vercel.app/html/groups/join-group.html?groupId=${group._id}">Join Group</a></button>
            // <p class="group-type">${group.groupType}</p>

            eventContainer.innerHTML = texts;
        } else {
            const keys = Object.keys(data);
    
            keys.forEach(key => {
                const value = data[key]; 
                
                document.getElementById("failed").style.display = "block"
                document.getElementById("failed").innerHTML = value;
                document.getElementById("failed").classList.add("failed");
    
                setTimeout(() => {
                    document.getElementById("failed").style.display = "none"
                }, 3500)
              });
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("filter-events").addEventListener("submit", async (e) => {
    e.preventDefault();

    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const location = document.getElementById("location").value;
    const keyword = document.getElementById("keywords").value;
    let category = document.getElementById("category").value;

    const params = new URLSearchParams();
    if (date) params.append("date", date);
    if (time) params.append("time", time);
    if (location) params.append("location", location);
    if (keyword) params.append("keyword", keyword);
    if (category === "Select A Category") {
        category = "";
    } else {
         params.append("category", category);
    }

    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "/html/log-in.html"
    }
    
    try {
        const response = await fetch(`http://5.161.186.15/api/v1/user/filter-events?${params.toString()}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

    const data = await response.json();

    if (response.ok) {
        if (data.data.length > 0) {
            document.getElementById("no-results").style.visibility = "hidden";

            const eventsList = document.getElementById("events-list");

            let accum = "";
            
            data.data.forEach((event) => {
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });
    
                accum += `
                    <a href="event-details.html?eventId=${event._id}">
                        <div>
                            <h3>${event.name}</h3>
                            <p>${event.description}</p>
                            <section class="small-details">
                                <p class="dis-flex">
                                    <span class="material-symbols-outlined">
                                        calendar_month
                                     </span>
                                   <span>${formattedDate}</span>
                                </p>
    
                                <p class="dis-flex">
                                    <span class="material-symbols-outlined">
                                    schedule
                                    </span>
                                    <span>${event.time}</span>
                                </p>
    
                                <p class="dis-flex">
                                    <span class="material-symbols-outlined">
                                        location_on
                                    </span> 
                                    <span>${event.location}</span>
                                </p>
                            </section>
                        </div>
                        </a>`

                //     accum += `
                //    <div>
                //            <h2>${event.name}</h2>
                //            <p class="dis-flex">
                //                 <span class="material-symbols-outlined">
                //                 location_on
                //                 </span> 
                //                 <span>${event.location || "None Specified"}</span>
                //             </p>
    
                //            <p class="dis-flex">
                //                 <span class="material-symbols-outlined">
                //                 schedule
                //                 </span>
                //                 <span>${event.time} ${event.timeZone}</span>
                //            </p>
    
                //             <p class="dis-flex">
                //                 <span class="material-symbols-outlined">
                //                     calendar_month
                //                 </span>
                //                 <span>${formattedDate}</span>
                //             </p>
                //         </div>
    
                //     `;
            });

            eventsList.innerHTML = accum;

            document.querySelector(".choose-category").classList.add("close-cate");

            document.querySelector(".choose-category").classList.remove("cate-transition");
        } else {
            document.getElementById("no-results").style.visibility = "visible";
        }
    } else {
        console.log("Error")
    }
    } catch (error) {
        document.getElementById("failed").style.display = "block"
        document.getElementById("failed").innerHTML = "There Was An Error, Please Reload The Page";
        document.getElementById("failed").classList.add("failed");
        console.log(error);
    }
});


window.onload = displayPublicEvents;