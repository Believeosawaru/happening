const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
const button = document.getElementById("bio-btn");

function disableBtn() {
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black";
    button.innerHTML = "Submitting...."
}

const postUrl = `https://happening.net/api/v1/blog/edit-post/${postId}`;
const getPostUrl = `https://happening.net/api/v1/blog/load-current-post/${postId}`;

const retrievePost = async () => {
    try {
        const response = await fetch(getPostUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

    const data = await response.json();

    if (response.ok) {
        document.getElementById("post").value = data.data.content;
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
}

document.getElementById("edit-post").addEventListener("submit", async (e) => {
    e.preventDefault();

    const post = document.getElementById("post").value;

    disableBtn();

    try {
        const response = await fetch(postUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               content: post
            })
        });

    const data = await response.json();

    if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "Update Posted Successfully";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        button.style.cursor = "wait";

        setTimeout(() => {
            window.location.href = "https://happening.net/home"
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

window.onload = retrievePost;