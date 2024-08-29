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

    if (input.length >= 1) {
    searchLocations(input);
    } else {
    const selectElement = document.getElementById('location-select');

    selectElement.innerHTML = '<option value="">Select a location</option>';
    }
});

function searchLocations(input) {
      const apiKey = '0vwus3vv9iu2ylflfklyxa==y2bnzvxvlpz7wpqm'; 

      fetch(`https://api.api-ninjas.com/v1/city?name=${input}`, {
        method: 'GET',
        headers: {
          'x-api-key': apiKey
        }
      })
        .then(response => response.json())
        .then(data => {
          const resultsDiv = document.getElementById('results-div');

          resultsDiv.innerHTML = '';

          console.log(data)
          
        //   data.list.forEach(city => {
        //     const pElement = document.createElement('p');
        //     pElement.className = 'result';
        //     pElement.textContent = `${city.name}, ${city.country}`;
        //     resultsDiv.appendChild(pElement);
        //   });
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