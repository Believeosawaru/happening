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

            function formatPostDate(dateString) {
                const postDate = new Date(dateString);
                const formatter = new Intl.DateTimeFormat("en-us", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Europe/Paris"
                });
                return formatter.format(postDate);
            }

            function truncateContent(post, wordLimit = 30) {
                const div = document.createElement('div');
                div.textContent = post.content;
                const content = div.textContent;
            
                const words = content.split(" ");
                if (words.length > wordLimit) {
                    const truncated = words.slice(0, wordLimit).join(" ");
                    return `${truncated}... <br><button><a href="https://happening.net/blog/${post.slug}">Read more</a></button>`;
                }
                return content;
            }

            function generatePostHTML(post, formattedDate) {
                const mediaHTML = post.mediaType && post.mediaPath ? 
                    (post.mediaType === "image" ? 
                        `<img src="https://happening.net/uploads/${post.mediaType}s/${post.mediaPath}" id="blog-img">` : 
                        `<video controls id="blog-video"> 
                            <source src="https://happening.net/uploads/${post.mediaType}s/${post.mediaPath}">
                            Your Browser Does Not Support The Video Tag
                        </video>`) : "";

                const truncatedContent = truncateContent(post);

                return `
                    <div id="post-card">
                        <div id="user-details">
                            ${
                                post.mediaPath && post.mediaType ? `${mediaHTML}` : ""
                            }
                    
                            <section>
                                <a href="https://happening.net/blogs/blog-post/${post.slug}">
                                    <h3>${post.title}</h3>
                                    <p>${truncatedContent}</p> 
                                    <span>${formattedDate}</span>      
                                </a>
                            </section>
                        </div>
                    </div>
                `;
            }

            message.data.forEach(post => {
                const formattedDate = formatPostDate(post.createdAt);
                const html = generatePostHTML(post, formattedDate);
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