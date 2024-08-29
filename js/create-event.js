const signUpUrl = "https://happening-api.onrender.com/api/v1/user/create-event";

const button = document.getElementById("create-event-btn");

function disableBtn() {
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black";
    button.innerHTML = "Creating Event...."
}
 
const token = localStorage.getItem("authToken");
    
const apiUsername = 'believe_007';

const selectElement = document.getElementById("event-location");
    
document.getElementById('search-input').addEventListener('input', () => {
    const input = document.getElementById('search-input').value;

    if (input.length >= 3) {
    searchLocations(input);
    } else {
    const selectElement = document.getElementById('location-select');

    selectElement.innerHTML = '<option value="">Select a location</option>';
    }
});

function searchLocations(query) {
      // Fetch location data from GeoNames API based on the query
      fetch(`http://api.geonames.org/searchJSON?q=${query}&maxRows=10&username=${apiUsername}`)
        .then(response => response.json())
        .then(data => {
          const selectElement = document.getElementById('location-select');
          // Clear previous results
          selectElement.innerHTML = '<option value="">Select a location</option>';
          
          // Populate the select field with new search results
          data.geonames.forEach(location => {
            const option = document.createElement('option');
            option.value = location.geonameId;
            option.textContent = `${location.name}, ${location.countryName}`;
            selectElement.appendChild(option);
          });
        })
        .catch(error => console.error('Error fetching locations:', error));
    }

document.getElementById("create-event").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("event-name").value;
    const description = document.getElementById("event-desc").value;
    const time = document.getElementById("event-date").value;
    const location = document.getElementById("event-loc").value;
    const type = document.getElementById("event-type").value;

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
                time,
                location,
                type
            })
        });

    const data = await response.json();

    if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "Event Created Successfully";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        button.style.cursor = "wait";

        setTimeout(() => {
            window.location.href = "events.html"
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
        button.innerHTML = "Create Event";
    }

    } catch (error) {
        document.getElementById("failed").style.display = "block"
        document.getElementById("failed").innerHTML = "There Was An Error, Please Reload The Page";
        document.getElementById("failed").classList.add("failed");
        console.log(error);
    }
});

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