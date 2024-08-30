const signUpUrl = "https://happening-api.onrender.com/api/v1/user/create-event";

const button = document.getElementById("create-event-btn");

function disableBtn() {
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black";
    button.innerHTML = "Creating Event...."
}
 
const token = localStorage.getItem("authToken");

const selectElement = document.getElementById("event-location");

selectElement.addEventListener("change", () => {
    if (selectElement.value === "in-person") {
        document.querySelector(".on-p-div").style.display = "block"
    } else {
        document.querySelector(".on-p-div").style.display = "none"
    }
})
    
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

document.getElementById("create-event").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("event-name").value;
    const description = document.getElementById("event-desc").value;
    const date = document.getElementById("event-date").value;
    const time = document.getElementById("event-time").value;
    const timeZone = document.getElementById("timezone").value;
    const location = document.getElementById("event-location").value;
    const type = document.getElementById("event-type").value;

    disableBtn();

    const loc = document.getElementById("event-location");

    if (loc.value === "in-person") {
        return console.log("Pick A Location");
    }

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
                date,
                time,
                timeZone,
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