const signUpUrl = "http://5.161.186.15/api/v1/user/create-group";

const button = document.getElementById("create-group-btn");

function disableBtn() {
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black";
    button.innerHTML = "Creating Group...."
}
 
const token = localStorage.getItem("authToken");

document.getElementById("create-group").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("group-name").value;
    const description = document.getElementById("group-desc").value;
    const location = document.getElementById("location").value;
    const groupType = document.getElementById("group-type").value;

    disableBtn();

    try {
        const response = await fetch(signUpUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                description,
                location,
                groupType
            })
        });

    const data = await response.json();

    if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "Group Created Successfully";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        button.style.cursor = "wait";

        setTimeout(() => {
            window.location.href = `option.html?groupId=${data.data}`
        }, 2000)
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
        button.style.color = "white";
        button.innerHTML = "Create Group"
    }

    } catch (error) {
        document.getElementById("failed").style.display = "block"
        document.getElementById("failed").innerHTML = "There Was An Error, Please Reload The Page";
        document.getElementById("failed").classList.add("failed");
        console.log(error);
    }
});

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

    const loc = document.getElementById("event-location");

    if (loc.value === "in-person") {
        button.style.backgroundColor = "#FFECB3";
        button.disabled = true;
        button.style.color = "black"
    } else {
        button.style.backgroundColor = "#FF4500";
        button.disabled = false;
        button.style.color = "white"
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

let map;
let marker;
function initMap(location) {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: location,
    });

    marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable: true,
    });

    // Event listener for marker drag end
    marker.addListener('dragend', function(event) {
        console.log("New location: ", event.latLng.lat(), event.latLng.lng());
    });
}

initMap();

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
                    document.getElementById("map").style.display = "block";
                    const optionElement = document.createElement("option");

                    optionElement.textContent = pElement.textContent;

                    selectElement.appendChild(optionElement);

                    selectElement.value = optionElement.textContent;

                    document.querySelector(".on-p-div").style.display = "none";

                    button.style.backgroundColor = "#FF4500";
                    button.disabled = false;
                    button.style.color = "white";

                   
                    const locationInput = pElement.textContent;
            
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ address: locationInput }, (results, status) => {
                        if (status === "OK") {
                            const newLocation = results[0].geometry.location;
            
                            initMap(newLocation);
            
                            // Show the map
                            document.getElementById("map").style.display = "block";
                            
                        } else {
                            alert("Location not found: " + status);
                        }
                    });
                });
                resultsDiv.appendChild(pElement);
              });
          }
        })
        .catch(error => console.error('Error fetching locations:', error));
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