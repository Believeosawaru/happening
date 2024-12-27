const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

async function blog() {
    try {
const response = await fetch(`https://happening.net/api/v1/blog/blog-post/${postId}`, {
            method: "GET"
        });

        const post = await response.json();

        if (post.message === "jwt malformed" || post.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "https://happening.net/log-in"
            }, 350);
        }

        if (response.ok) {
            const postDate = new Date(post.date);
                const formattedDate = postDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });

            document.getElementById("my-feed").innerHTML = `
            <div id="post-card">
                <div id="user-details">
                    <img src="../../images/event.jpg" alt="User Image">
                    <section>
                        <h3>${post.author.firstName} ${post.author.lastName}</h3>
                        <span>${formattedDate}</span>
                    </section>
                </div>
                     <p>${post.content}</p>
                    ${
                        post.mediaPath && post.mediaType ? `<div id="flexy">
                        ${mediaHTML}
                    </div>` : ""
                    }
            </div>`
         } else {
            console.log(message)
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = blog;