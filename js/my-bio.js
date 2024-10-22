const token = localStorage.getItem("authToken");

async function myBio() {
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
            // setTimeout(() => {
            //     document.querySelector(".pre-loader").style.display = "none";
            // }, 3500);

            document.getElementById("bio").value = `${message.data.bio}`;
            console.log(`done: ${message.data.bio}`)
            
        } else {
            console.log(message)
        }
    } catch (error) {
        console.log(error);
    }
}

function disableBtn() {
    const button = document.getElementById("bio");
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black";
    button.innerHTML = "Submitting...."
}

const bioUrl = "http://5.161.186.15/api/v1/user/my-bio";

document.getElementById("update-bio").addEventListener("submit", async (e) => {
    e.preventDefault();

    const bio = document.getElementById("bio").value;

    disableBtn();

    try {
        const response = await fetch(bioUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               bio
            })
        });

    const data = await response.json();

    if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "Bio Updated Successfully";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        button.style.cursor = "wait";

        setTimeout(() => {
            window.location.href = "my-profile.html"
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
        button.innerHTML = "Submit";
    }

    } catch (error) {
        document.getElementById("failed").style.display = "block"
        document.getElementById("failed").innerHTML = "There Was An Error, Please Reload The Page";
        document.getElementById("failed").classList.add("failed");
        console.log(error);
    }
});

window.onload = myBio;