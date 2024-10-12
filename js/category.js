const publicCatButton = document.getElementById("right");
const onlineCatButton = document.querySelector(".right-2");
const categories = [
    "Music",
    "Business",
    "Sports",
    "Arts",
    "Food",
    "Education",
    "Kids",
    "Technology",
    "Health",
    "Fashion",
    "Film",
    "Nightlife",
    "Literature",
    "Travel",
    "Nature",
    "Charity",
    "Wellness",
    "Culture"
];

publicCatButton.addEventListener("click", () => {
    document.querySelector(".choose-category").classList.add("cate-transition");
    document.querySelector(".choose-category").classList.remove("close-cate");
});

document.getElementById("close").addEventListener("click", () => {
    document.querySelector(".choose-category").classList.add("close-cate");
    document.querySelector(".choose-category").classList.remove("cate-transition");
});

const select = document.getElementById("category");

categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.text = category;

    select.appendChild(option);
});