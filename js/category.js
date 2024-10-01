const publicCatButton = document.getElementById("right");
const onlineCatButton = document.querySelector(".right-2");

publicCatButton.addEventListener("click", () => {
    document.querySelector(".choose-category").classList.add("cate-transition");
    document.querySelector(".choose-category").classList.remove("close-cate");
});

onlineCatButton.addEventListener("click", () => {
    document.querySelector("#choose-online").classList.add("cate-transition");
    document.querySelector("#choose-online").classList.remove("close-cate");
});

document.getElementById("close").addEventListener("click", () => {
    document.querySelector(".choose-category").classList.add("close-cate");
    document.querySelector(".choose-category").classList.remove("cate-transition");
});