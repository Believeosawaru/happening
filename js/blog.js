async function blog() {
    try {
        const response = await fetch("https://happening.net/api/v1/blog/public-feed", {
            method: "GET"
        });

        const message = await response.json();

        if (message.message === "jwt malformed" || message.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "https://happening.net/log-in"
            }, 350);
        }

        if (response.ok) {
            let accum = "";

            message.data.forEach(post => {
                const postDate = new Date(post.createdAt);
                const formatter = new Intl.DateTimeFormat("en-us", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Europe/Paris"
                });

                const formattedDate = formatter.format(postDate);

                    const html = `
                        <div>
                            <div id="user-details">
                                <img src="../../images/event.jpg" alt="User Image">
                                <section>
                                    <h3>${post.author.firstName} ${post.author.lastName}</h3>
                                    <span>${formattedDate}</span>
                                </section>
                            </div>
                            <p>${post.content}</p>
                            <div id="flexy">
                            ${
                                post.mediaType && post.mediaPath ? (post.mediaType && post.mediaType === "image" ? `<img src="https://happening.net/uploads/${post.mediaType}s/${post.mediaPath}" id="blog-img">` : 
                                `<video controls id="blog-video"> 
                                    <source src="https://happening.net/uploads/${post.mediaType}s/${post.mediaPath}">
                                    Your Browser Does Not Support The Video Tag
                                </video>`) : ""
                            }
                            </div>
                        </div>
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

window.onload = blog;