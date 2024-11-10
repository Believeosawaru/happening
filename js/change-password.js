const token = localStorage.getItem("authToken");

const button = document.getElementById("access-password-btn");
const buttonTwo = document.getElementById("change-password-btn");

function disableBtn() {
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black";
    button.innerHTML = "Submitting...."
}

function ableBtn() {
    button.disabled = false;
    button.style.backgroundColor = "#FF4500";
    button.style.color = "white";
    button.innerHTML = "Submit";
}

function disableBtnTwo() {
    buttonTwo.disabled = true;
    buttonTwo.style.backgroundColor = "#FFECB3";
    buttonTwo.style.color = "black";
    buttonTwo.innerHTML = "Changing Password...."
}

function ableBtnTwo() {
    buttonTwo.disabled = false;
    buttonTwo.style.backgroundColor = "#FF4500";
    buttonTwo.style.color = "white";
    buttonTwo.innerHTML = "Change Password";
}

document.getElementById("access-password").addEventListener("submit",async (e) => {
    e.preventDefault();

    disableBtn(); 

    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`http://5.161.186.15/api/v1/user/access-password-change`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                password
            })
        });

        const data = await response.json();

        if (data.message === "jwt malformed" || data.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "http://5.161.186.15/log-in"
            }, 350);
        }

        if (response.ok) {
            // document.getElementById("access-password").style.display = "none";
            // document.getElementById("change-password").style.display = "block";
            console.log(data)
        } else {
            ableBtn();
            console.log(data)
        }
    } catch (error) {
        console.log(error);
    }
});

document.getElementById("change-password").addEventListener("submit", async (e) => {
    e.preventDefault();

    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;

    try {
        disableBtnTwo();

        const response = await fetch(`http://5.161.186.15/api/v1/user/change-password`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                oldPassword,
                newPassword
            })
        });

        const data = await response.json();

        if (data.message === "jwt malformed" || data.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "http://5.161.186.15/log-in"
            }, 350);
        }

        if (response.ok) {
            document.getElementById("success-sign-up").style.display = "block";
            document.getElementById("success-sign-up").innerHTML = "Password Changed Successfully";
        } else {
            ableBtnTwo();
            document.getElementById("failed").style.display = "block";
            document.getElementById("failed").innerHTML = data;
            console.log(data)
        }
    } catch (error) {
        console.log(error);
    }
});