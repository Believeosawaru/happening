const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("groupId");

if (groupId) {
    function proceed() {
        const proceed = document.getElementById("proceed");

        proceed.innerHTML = `<a href="invite-group.html?groupId=${groupId}">Proceed</a>`;
    }

    function skip() {
        const skipBtn = document.getElementById("delete-group-btn");

        skipBtn.innerHTML = `<a href="groups.html" id="black" onclick="skip();">Skip For Later</a>`
    }

    proceed();
    skip();
}