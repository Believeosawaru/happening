const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

document.getElementById("blog-options").innerHTML =`
        <div class="center">
            <button><a href="https://happening.net/blogs/edit-blog-post?id=${postId}">Edit Post</a></button>
        </div>
        <button id="delete-event-btn"><a href="https://happpening.net/blogs/delete-blog-post?id=${postId}">Delete Post</a></button>`;

