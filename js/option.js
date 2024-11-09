const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("groupId");

if (groupId) {
    function proceed() {
        const proceed = document.getElementById("proceed");

        proceed.innerHTML = `<a href="http://5.161.186.15/invite-group?groupId=${groupId}">Proceed</a>`;
    }

    function skip() {
        const skipBtn = document.getElementById("delete-group-btn");

        skipBtn.innerHTML = `<a href="http://5.161.186.15/groups" id="black" onclick="skip();">Skip For Later</a>`
    }

    proceed();
    skip();
}