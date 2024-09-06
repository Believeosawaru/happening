const signUpUrl = "https://happening-api.onrender.com/api/v1/user/create-group";

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
})

function sanitizeDescInput() {
    const eventDesc = document.getElementById("group-desc");
    let sanitizedValue = eventDesc.value.replace(/<[^>]*>/g, '');
    sanitizedValue = sanitizedValue.replace(/(https?:\/\/|www\.)[^\s]+/g, '');
    eventDesc.value = sanitizedValue;
}

function sanitizeNameInput() {
    const eventDesc = document.getElementById("group-name");
    let sanitizedValue = eventDesc.value.replace(/<[^>]*>/g, '');
    sanitizedValue = sanitizedValue.replace(/(https?:\/\/|www\.)[^\s]+/g, '');
    eventDesc.value = sanitizedValue;
}