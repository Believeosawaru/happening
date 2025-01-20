tinymce.init({
    selector: "#post",
    plugins: "advlist autolink lists link image charmap preview anchor",
    toolbar: "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat"
});

// tinymce.init({
//     selector: "#title",
//     menubar: false,
//     plugins: "wordcount link",
//     toolbar: "undo redo | bold italic underline | alignleft aligncenter alignright | wordcount"
// });

const token = localStorage.getItem("authToken");

const button = document.getElementById("bio-btn");

function disableBtn() {
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black";
    button.innerHTML = "Submitting...."
}

async function displayCategories() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "https://happening.net/log-in"
    }

    try {
        const response = await fetch("https://happening.net/api/v1/blog/load-categories", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status == 401) {
            window.location.href = "https://happening.net/log-in"
        }

        const data = await response.json();

        if (response.ok) {
            const eventContainer = document.getElementById("hero");

            texts = "";

            // setTimeout(() => {
            //     document.querySelector(".pre-loader").style.display = "none";
            // }, 350);

            if (data.data.length < 1) {
                return;
            } else {
            data.data.forEach((cat) => {
                const select = document.getElementById("category");

                const option = document.createElement("option");
                option.value = cat.title;
                option.text = cat.title;

                select.appendChild(option);
            });
        }            

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
              });
        }
    } catch (error) {
        console.log(error);
    }
}

const select = document.getElementById("category");

categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.text = category;

    select.appendChild(option);
});

const postUrl = "https://happening.net/api/v1/blog/create-post";

document.getElementById("create-post").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById("media");
    const title = document.getElementById("title").value;
    const post = tinymce.get("post").getContent();
    
    formData.append("title", title);
    formData.append("content", post);

    if (fileInput.files[0]) {
        formData.append("media", fileInput.files[0]);
    }

    disableBtn();

    try {
        const response = await fetch(postUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
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
        console.log(data)
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

window.onload = displayCategories;