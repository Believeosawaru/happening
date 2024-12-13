const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

const delEventUrl = `https://happening.net/api/v1/user/delete-post/${postId}`

if (!token) {
    window.location.href = "https://happening.net/log-in"
}

const button = document.getElementById("delete-event-btn");

function disableBtn() {
    button.disabled = true;
    button.innerHTML = "Deleting Post...."
}

document.getElementById("delete-blog-post").addEventListener("submit", async (e) => {
    e.preventDefault();

    disableBtn();

    try {
        const response = await fetch(delEventUrl, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

    const data = await response.json();

    if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "Post Deleted Successfully";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        setTimeout(() => {
            window.location.href = `https://happening.net/home`
        }, 1000)
    } else {
        const keys = Object.keys(data);

        keys.forEach(key => {
            const value = data[key]; 
            
            document.getElementById("failed").style.display = "block"
            document.getElementById("failed").innerHTML = value;
            document.getElementById("failed").classList.add("failed");

            setTimeout(() => {
                document.getElementById("failed").style.display = "none";

                button.disabled = false;
                button.innerHTML = "Delete Post"
            }, 3500);
          });
    }

    } catch (error) {
        document.getElementById("failed").style.display = "block"
        document.getElementById("failed").innerHTML = "There Was An Error, Please Reload The Page";
        document.getElementById("failed").classList.add("failed");
        console.log(error);
    }
})