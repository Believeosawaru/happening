const token = localStorage.getItem("authToken");
// const urlParams = new URLSearchParams(window.location.search);
// const groupId = urlParams.get("groupId");

async function myFeed() {
    try {
        const response = await fetch("https://happening.net/api/v1/blog/load-posts", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const message = await response.json();

        if (message.message === "jwt malformed" || message.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "https://happening.net/log-in"
            }, 350);
        }

        if (response.ok) {
            console.log(message)

            let accum = "";

            message.data.forEach(post => {
                const postDate = new Date(post.createdAt);
                const formatter = new Intl.DateTimeFormat("en-us", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "UTC"
                });

                const formattedDate = formatter.format(postDate);

                const html = `
                     <a href="https://happening.net/blogs/blog-options?id=${post._id}">
                        <div>
                            <div id="user-details">
                                <img src="../../images/event.jpg" alt="User Image">
                                <section>
                                    <h3>${post.author.firstName} ${post.author.lastName}</h3>
                                    <span>${formattedDate}, 19:08</span>
                                </section>
                            </div>
                            <p>${post.content}</p>
                        </div>
                    </a>
                `

                accum += html;
            });
            document.getElementById("my-feed").innerHTML = accum; 
        } else {
            console.log(message)
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = myFeed;