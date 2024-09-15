const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("eventId");
const token = localStorage.getItem("authToken");

if (!token) {
    window.location.href = "/html/log-in.html"
}

const timeZones = [
    {
        offset: "-12:00",
        name: "UTC-12:00"
    },
    {
        offset: "-12:00",
        name: "UTC-12:00"
    },
    {
        offset: "-11:00",
        name: "UTC-11:00"
    },
    {
        offset: "-10:00",
        name: "UTC-10:00"
    },
    {
        offset: "-09:00",
        name: "UTC-09:00"
    },
    {
        offset: "-08:00",
        name: "UTC-08:00"
    },
    {
        offset: "-07:00",
        name: "UTC-07:00"
    },
    {
        offset: "-06:00",
        name: "UTC-06:00"
    },
    {
        offset: "-05:00",
        name: "UTC-05:00"
    },
    {
        offset: "-04:00",
        name: "UTC-04:00"
    },
    {
        offset: "-03:00",
        name: "UTC-03:00"
    },
    {
        offset: "-03:30",
        name: "UTC-03:30"
    },
    {
        offset: "-02:00",
        name: "UTC-02:00"
    },
    {
        offset: "-01:00",
        name: "UTC-01:00"
    },
    {
        offset: "+00:00",
        name: "UTC+00:00 (GMT)"
    },
    {
        offset: "+01:00",
        name: "UTC+01:00"
    },
    {
        offset: "+02:00",
        name: "UTC+02:00"
    },
    {
        offset: "+03:00",
        name: "UTC+03:00"
    },
    {
        offset: "+03:30",
        name: "UTC+03:30"
    },
    {
        offset: "+04:00",
        name: "UTC+04:00"
    },
    {
        offset: "+04:30",
        name: "UTC+04:30"
    },
    {
        offset: "+05:00",
        name: "UTC+05:00"
    },
    {
        offset: "+05:30",
        name: "UTC+05:30"
    },
    {
        offset: "+05:45",
        name: "UTC+05:45"
    },
    {
        offset: "+06:00",
        name: "UTC+06:30"
    },
    {
        offset: "+07:00",
        name: "UTC+07:00"
    },
    {
        offset: "+08:00",
        name: "UTC+08:00"
    },
    {
        offset: "+08:45",
        name: "UTC+08:45"
    },
    {
        offset: "+09:00",
        name: "UTC+09:00"
    },
    {
        offset: "+09:30",
        name: "UTC+09:30"
    },
    {
        offset: "+10:00",
        name: "UTC+10:00"
    },
    {
        offset: "+10:30",
        name: "UTC+10:30"
    },
    {
        offset: "+11:00",
        name: "UTC+11:00"
    },
    {
        offset: "+12:00",
        name: "UTC+12:00"
    },
    {
        offset: "+12:45",
        name: "UTC+12:45"
    },
    {
        offset: "+13:00",
        name: "UTC+13:00"
    },
    {
        offset: "+14:00",
        name: "UTC+14:00"
    },
]

const select = document.getElementById("timezone");

timeZones.forEach((zone) => {
    const option = document.createElement("option");
    option.value = zone.offset;
    option.text = `${zone.name} (${zone.offset})`;

    select.appendChild(option);
});

const selectElement = document.getElementById("event-location");

selectElement.addEventListener("change", () => {
    if (selectElement.value === "in-person") {
        document.querySelector(".on-p-div").style.display = "block"
    } else {
        document.querySelector(".on-p-div").style.display = "none"
    }
});
    
document.getElementById('search-input').addEventListener('input', () => {
    const input = document.getElementById('search-input').value;

    if (input.length >= 1) {
    searchLocations(input);
    }
    else {
        return;
    }
});

function searchLocations(input) {
      fetch(`https://api.thecompaniesapi.com/v1/locations/cities?search=${input}`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          const resultsDiv = document.getElementById('results-div');

          resultsDiv.style.display = "block";
          resultsDiv.innerHTML = '';

          if (data.cities.length < 1) {
            resultsDiv.innerHTML = "<p>No City Found</p>";
          } else {
            data.cities.forEach(city => {
                const pElement = document.createElement("p");

                pElement.className = "result";

                pElement.textContent = `${city.name}, ${city.country.name}`;

                pElement.addEventListener("click", () => {
                    const optionElement = document.createElement("option");

                    optionElement.textContent = pElement.textContent;

                    selectElement.appendChild(optionElement);

                    selectElement.value = optionElement.textContent;

                    document.querySelector(".on-p-div").style.display = "none"
                })

                resultsDiv.appendChild(pElement);
              });
          }
        })
        .catch(error => console.error('Error fetching locations:', error));
}

const retreiveInfo = async () => {
    const info = await fetch(`http://5.161.186.15/api/v1/user/event-details/${eventId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    const event = await info.json();

    if (info.ok) {
    const eventDate = new Date(event.data.date);
    const year = eventDate.getUTCFullYear();
    const month = (eventDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = (eventDate.getUTCDate()).toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`

    let name = document.getElementById("event-name");
    let description = document.getElementById("event-desc");
    let location = document.getElementById("event-location");
    let date = document.getElementById("event-date");
    let time = document.getElementById("event-time");
    let timezone = document.getElementById("timezone");
    let type = document.getElementById("event-type");

    const option = document.createElement("option");
    option.value = event.data.location;
    option.text = event.data.location;

    name.value = event.data.name;
    description.value = event.data.description;

    if (event.data.location !== "online") {
        location.appendChild(option);
        location.value = event.data.location;
    }

    date.value = formattedDate;
    time.value = event.data.time;
    timezone.value = event.data.timeZone;
    type.value = event.data.type;
    } else {
        console.log("Could'nt Fetch");
    }
} 

const editEventUrl = `http://5.161.186.15/api/v1/user/edit-event-info/${eventId}`;

const delBtn = document.getElementById("event-del-link");

delBtn.innerHTML = `<a href="delete-event.html?eventId=${eventId}" class="del-group-a">Delete Event</a>`;

function disableBtn() {
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black"
}

const button = document.getElementById("edit-event-btn");

if (eventId) {
    document.getElementById("edit-event").addEventListener("submit", async (e) => {
        e.preventDefault();
    
        disableBtn();

        const name = document.getElementById("event-name").value;
        const description = document.getElementById("event-desc").value;
        const date = document.getElementById("event-date").value;
        const time = document.getElementById("event-time").value;
        const timeZone = document.getElementById("timezone").value;
        const location = document.getElementById("event-location").value;
        const type = document.getElementById("event-type").value;
    
        try {
            const response = await fetch(editEventUrl, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    description,
                    date,
                    time,
                    timeZone,
                    location,
                    type
                })
            });
    
        const data = await response.json();
    
        if (response.ok) {
            document.getElementById("success-sign-up").innerHTML = "Event Edited Successfully";
            document.getElementById("success-sign-up").classList.add("success-sign-up");
    
            button.style.cursor = "wait";
    
            setTimeout(() => {
                window.location.href = `events.html`
            }, 1000)
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
    
                button.disabled = false;
              });
    
            button.style.backgroundColor = "#FF4500";
            button.style.color = "white"
        }
    
        } catch (error) {
            document.getElementById("failed").style.display = "block"
            document.getElementById("failed").innerHTML = "There Was An Error, Please Reload The Page";
            document.getElementById("failed").classList.add("failed");
            console.log(error);
        }
    })
}

function sanitizeDescInput() {
    const eventDesc = document.getElementById("event-desc");
    let sanitizedValue = eventDesc.value.replace(/<[^>]*>/g, '');
    sanitizedValue = sanitizedValue.replace(/(https?:\/\/|www\.)[^\s]+/g, '');
    eventDesc.value = sanitizedValue;
}

function sanitizeNameInput() {
    const eventDesc = document.getElementById("event-name");
    let sanitizedValue = eventDesc.value.replace(/<[^>]*>/g, '');
    sanitizedValue = sanitizedValue.replace(/(https?:\/\/|www\.)[^\s]+/g, '');
    eventDesc.value = sanitizedValue;
}

window.onload = retreiveInfo;