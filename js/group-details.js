document.addEventListener("DOMContentLoaded", async () => {
    const groupContainer = document.getElementById("hero");

    groupContainer.addEventListener("click", (e) => {
        const groupElement = e.target.closest(".groups");

        if (groupElement) {
            const groupId = groupElement.dataset.groupId;

            window.location.href = `/group-details.html?groupId=${groupId}`
        }
    })
})