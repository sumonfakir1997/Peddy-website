const categoryBtnApi = async () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayAllCategorybtn(data.categories))
    .catch((error) => console.log(error));
};

categoryBtnApi();

const displayAllCategorybtn = (btnDetails) => {
  const categoryBtnContainer = document.getElementById("categoryBtn");
  categoryBtnContainer.innerHTML = "";

  btnDetails.forEach((item) => {
    const button = document.createElement("button");
    button.className =
      "btn py-10 px-5 gap-5 bg-white rounded-xl w-full sm:w-auto md:w-[321px] flex items-center justify-center";

    // optional icon
    if (item?.category_icon) {
      const img = document.createElement("img");
      img.src = item.category_icon;
      img.alt = item.category;
      button.appendChild(img);
    }

    const text = document.createElement("span");
    text.innerText = item.category;
    button.appendChild(text);

    // click: reset all -> then set clicked to active
    button.addEventListener("click", () => {
      console.log(`Category clicked: ${item.category}`);

      // Reset all buttons to default look
      const allbtn = categoryBtnContainer.querySelectorAll("button");
      allbtn.forEach((btn) => {
        btn.classList.remove("bg-[#E7F2F2]", "rounded-4xl");
        btn.classList.add("bg-white", "rounded-xl");
      });

      // Apply active look to the clicked button only
      button.classList.remove("bg-white", "rounded-xl");
      button.classList.add("bg-[#E7F2F2]", "rounded-4xl");
    });

    categoryBtnContainer.appendChild(button);
  });
};

