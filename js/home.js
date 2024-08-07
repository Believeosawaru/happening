const menu = document.querySelector('.menu');
const btnOne = document.querySelector('.btn-1');
const btnTwo = document.querySelector('.btn-2');
const verifyDiv = document.querySelector('.not-verified');

function openMenu() {
    if (menu.classList.contains('close-menu')) {
        menu.classList.add('open-menu');

        menu.classList.remove('close-menu');
    } else {
        menu.classList.add('close-menu');
        
        menu.classList.remove('open-menu');
    }
}

async function fetchMessage() {
    const token = localStorage.getItem("authToken");
    console.log(token)

    if (!token) {
        window.location.href = "log-in.html"
    }

    try {
        const response = await fetch("https://happening-api.onrender.com/user/v1/home", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        console.log(response.status)

        if (response.status == 403) {
            btnOne.disabled = true;
            btnTwo.disabled = true;
            menu.disabled = true;
            verifyDiv.style.display = "block";
            verifyDiv.style.backgroundColor = "green";
        }

        if (!response.ok) {
            console.log("Bad Network")
        }

        const message = await response.json();

        document.getElementById("welcome-msg").textContent = message.message;
    } catch (error) {
        console.log(error);
    }
}

window.onload = fetchMessage;