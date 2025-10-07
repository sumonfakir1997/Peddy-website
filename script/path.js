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
      categoryWiseDataFetchApi(item.category);
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

const singlePet = {
  petId: 1,
  breed: "Golden Retriever",
  category: "Dog",
  date_of_birth: "2023-01-15",
  price: 1200,
  image: "https://i.ibb.co.com/p0w744T/pet-1.jpg",
  gender: "Male",
  pet_details:
    "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
  vaccinated_status: "Fully",
  pet_name: "Sunny",
};

const alldatafetchApi = async () => {
  const url = "https://openapi.programming-hero.com/api/peddy/pets";
  fetch(url)
    .then((res) => res.json())
    .then((data) => getDisplayAllPets(data.pets))
    .catch((error) => console.log(error));
};

alldatafetchApi();

const categoryWiseDataFetchApi = async (category) => {
  console.log("categoryWiseDataFetchApi", category);

  // Show loader immediately
  showLoader();

  const url = `https://openapi.programming-hero.com/api/peddy/category/${category}`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    // Small delay so loader is visible (optional)
    setTimeout(() => {
      getDisplayAllPets(data?.data);
    }, 3000);
  } catch (error) {
    console.log(error);
    const petContainer = document.getElementById("petContainer");
    petContainer.className = "flex justify-center items-center w-full h-[500px]";
    petContainer.innerHTML = `<p class="text-red-500">Something went wrong. Please try again.</p>`;
  }
};


const showLoader = () => {
  const petContainer = document.getElementById("petContainer");
  petContainer.className = "flex justify-center items-center w-full h-[500px]";
  petContainer.innerHTML = `
    <span class="loading loading-bars loading-2xl"></span>
  `;
};
// Global variable to store current pets data
let currentPetsData = [];

const getDisplayAllPets = (petDetails) => {
  const petContainer = document.getElementById("petContainer");
  petContainer.innerHTML = "";

  currentPetsData = petDetails || [];

  // Case 1: No pets
  if (currentPetsData.length === 0) {
    petContainer.className =
      "w-full max-w-4xl mx-auto flex justify-center items-center h-[500px]";
    petContainer.innerHTML = `
      <div class='flex justify-center items-center h-[500px] w-full flex-col gap-4'>
        <img src="/images/error.webp" alt="no data found"/>
        <h2 class='text-2xl font-bold text-center'>No content in this category</h2>
      </div>`;
    return;
  }

  // Case 2: Pets exist
  petContainer.className =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";

  currentPetsData.forEach((item) => {
    const isSelected = selectedImages.includes(item.image);
    const text = isSelected ? "Remove" : "Adopt";
    const textColor = isSelected ? "text-red-500" : "text-[#0E7A81]";

    const card = document.createElement("div");
    card.className =
      "card bg-base-100 sm:w-auto md:max-w-[400px] shadow-sm p-5";
    card.innerHTML = `
    <figure>
      <img
        src="${
          item.image ||
          "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        }"
        alt="${item.pet_name || "Pet"}"
        class="rounded-lg w-full h-48 object-cover"
      />
    </figure>
    <div class="card-body p-0">
      <h2 class="card-title mt-4">${item.pet_name || "Unknown Pet"}</h2>
      <div class="card-actions flex-col justify-between gap-2">
        <p>Breed: <span>${item.breed || "Unknown"}</span></p>
        <p>Date of Birth: <span>${
          item?.date_of_birth || "Not Available"
        }</span></p>
        <p>Gender: <span>${item.gender || "Unknown"}</span></p>
        <p>Price: <span>$${item?.price || " Not Given"}</span></p>
      </div>
      <div class="card-actions justify-between border-t border-gray-200 pt-4">
        <div class="badge badge-outline cursor-pointer">
         <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5.5275 8.54163C6.19917 8.54163 6.805 8.16996 7.22 7.64163C7.86688 6.81631 8.67893 6.13511 9.60417 5.64163C10.2067 5.32163 10.7292 4.84496 10.9817 4.21246C11.159 3.76933 11.2501 3.29642 11.25 2.81913V2.29163C11.25 2.12587 11.3159 1.96689 11.4331 1.84968C11.5503 1.73247 11.7092 1.66663 11.875 1.66663C12.3723 1.66663 12.8492 1.86417 13.2008 2.2158C13.5525 2.56743 13.75 3.04435 13.75 3.54163C13.75 4.50163 13.5333 5.41079 13.1475 6.22329C12.9258 6.68829 13.2367 7.29163 13.7517 7.29163M13.7517 7.29163H16.3567C17.2117 7.29163 17.9775 7.86996 18.0683 8.72079C18.1058 9.07246 18.125 9.42913 18.125 9.79163C18.1284 12.0719 17.3492 14.2843 15.9175 16.0591C15.5942 16.4608 15.095 16.6666 14.58 16.6666H11.2333C10.8308 16.6666 10.43 16.6016 10.0475 16.475L7.4525 15.6083C7.07009 15.4811 6.66968 15.4164 6.26667 15.4166H4.92M13.7517 7.29163H11.875M4.92 15.4166C4.98917 15.5875 5.06417 15.7541 5.145 15.9183C5.30917 16.2516 5.08 16.6666 4.70917 16.6666H3.9525C3.21167 16.6666 2.525 16.235 2.30917 15.5266C2.02054 14.5793 1.87422 13.5944 1.875 12.6041C1.875 11.31 2.12084 10.0741 2.5675 8.93913C2.8225 8.29413 3.4725 7.91663 4.16667 7.91663H5.04417C5.4375 7.91663 5.665 8.37996 5.46084 8.71663C4.74908 9.88825 4.37369 11.2332 4.37584 12.6041C4.37584 13.5991 4.56917 14.5483 4.92084 15.4166H4.92Z" stroke="#131313" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="badge badge-outline ${textColor} cursor-pointer" 
          onclick="toggleAdopt(this, '${item.image}')">
          ${text}
        </div>
        <div class="badge badge-outline text-[#0E7A81] cursor-pointer" 
          onclick="showPetDetails(${JSON.stringify(item).replace(
            /"/g,
            "&quot;"
          )})">
          Details
        </div>
      </div>
    </div>
  `;
    petContainer.appendChild(card);
  });
};

// Sort function - uses your original display logic
const sortPetsByPrice = () => {
  const petContainer = document.getElementById("petContainer");

  if (currentPetsData.length === 0) {
    petContainer.classList.remove("grid");
    petContainer.classList.add("w-full", "max-w-4xl", "mx-auto");
    petContainer.innerHTML = `
       <div class='flex justify-center items-center h-[500px] w-full flex-col gap-4'>
        <img src="/images/error.webp" alt="no data found"/>
        <h2 class='text-2xl font-bold text-center'>No contain here in this category</h2>
        </div> `;
    return;
  }

  // Sort by price (ascending order - low to high)
  const sortedPets = [...currentPetsData].sort((a, b) => {
    const priceA = parseInt(a.price) || 0;
    const priceB = parseInt(b.price) || 0;
    return priceA - priceB; //low to high price
    // return priceB - priceA; // high to low price
  });

  // sorted data pass to getDisplayAllPets function
  getDisplayAllPets(sortedPets);
};

// Add event listener for sort button
document.addEventListener("DOMContentLoaded", function () {
  const sortButton = document.querySelector(".sortByPrice");
  if (sortButton) {
    sortButton.addEventListener("click", sortPetsByPrice);
  }
});

const showPetDetails = (pet) => {
  console.log("Pet details:", pet);
  // Remove existing modal if any
  const existingModal = document.getElementById("dynamicPetModal");
  if (existingModal) {
    existingModal.remove();
  }

  // Create modal dynamically
  const modal = document.createElement("dialog");
  modal.id = "dynamicPetModal";
  modal.className = "modal modal-bottom sm:modal-middle";
  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-content">
        <figure>
          <img
            src="${
              pet.image ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }"
            alt="${pet.pet_name || "Pet"}"
            class="rounded-xl w-full h-64 object-cover"
          />
        </figure>

        <h2 class="mt-5 pb-3 text-2xl font-bold">${
          pet.pet_name || "Unknown Pet"
        }</h2>

        <div class="flex justify-between items-start pb-4">
          <div class="space-y-2">
            <div class="flex gap-2 items-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_2081_39)">
                  <path d="M3.33334 3.33337H8.33334V8.33337H3.33334V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11.6667 3.33337H16.6667V8.33337H11.6667V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3.33334 11.6666H8.33334V16.6666H3.33334V11.6666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11.6667 14.1666C11.6667 14.8297 11.9301 15.4656 12.3989 15.9344C12.8677 16.4032 13.5036 16.6666 14.1667 16.6666C14.8297 16.6666 15.4656 16.4032 15.9344 15.9344C16.4033 15.4656 16.6667 14.8297 16.6667 14.1666C16.6667 13.5036 16.4033 12.8677 15.9344 12.3989C15.4656 11.93 14.8297 11.6666 14.1667 11.6666C13.5036 11.6666 12.8677 11.93 12.3989 12.3989C11.9301 12.8677 11.6667 13.5036 11.6667 14.1666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_2081_39">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p>Breed: <span class="font-medium">${
                pet.breed || "Unknown"
              }</span></p>
            </div>
            <div class="flex gap-2 items-center">
             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.625 2.5V4.375M14.375 2.5V4.375M2.5 15.625V6.25C2.5 5.75272 2.69754 5.27581 3.04917 4.92417C3.40081 4.57254 3.87772 4.375 4.375 4.375H15.625C16.1223 4.375 16.5992 4.57254 16.9508 4.92417C17.3025 5.27581 17.5 5.75272 17.5 6.25V15.625M2.5 15.625C2.5 16.1223 2.69754 16.5992 3.04917 16.9508C3.40081 17.3025 3.87772 17.5 4.375 17.5H15.625C16.1223 17.5 16.5992 17.3025 16.9508 16.9508C17.3025 16.5992 17.5 16.1223 17.5 15.625M2.5 15.625V9.375C2.5 8.87772 2.69754 8.40081 3.04917 8.04917C3.40081 7.69754 3.87772 7.5 4.375 7.5H15.625C16.1223 7.5 16.5992 7.69754 16.9508 8.04917C17.3025 8.40081 17.5 8.87772 17.5 9.375V15.625" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              <p>Date of Birth: <span class="font-medium">${
                pet.date_of_birth || "Unknown"
              }</span></p>
            </div>
            <div class="flex gap-2 items-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.7" clip-path="url(#clip0_2081_95)">
                  <path d="M10 11.6666V17.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.5 15H12.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9.99999 5C10.884 5 11.7319 5.35119 12.357 5.97631C12.9821 6.60143 13.3333 7.44928 13.3333 8.33333C13.3333 9.21739 12.9821 10.0652 12.357 10.6904C11.7319 11.3155 10.884 11.6667 9.99999 11.6667C9.11593 11.6667 8.26809 11.3155 7.64297 10.6904C7.01785 10.0652 6.66666 9.21739 6.66666 8.33333C6.66666 7.44928 7.01785 6.60143 7.64297 5.97631C8.26809 5.35119 9.11593 5 9.99999 5Z" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.5 2.5C12.5 3.16304 12.2366 3.79893 11.7678 4.26777C11.2989 4.73661 10.663 5 10 5C9.33696 5 8.70107 4.73661 8.23223 4.26777C7.76339 3.79893 7.5 3.16304 7.5 2.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_2081_95">
                  <rect width="20" height="20" fill="white"/>
                  </clipPath>
                  </defs>
             </svg>

              <p>Gender: <span class="font-medium">${
                pet.gender || "Unknown"
              }</span></p>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex gap-2 items-center">
             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2081_103)">
                <path d="M13.9167 6.66667C13.7508 6.19603 13.4479 5.7858 13.0469 5.48878C12.6459 5.19176 12.1652 5.02153 11.6667 5H8.33334C7.6703 5 7.03442 5.26339 6.56558 5.73223C6.09674 6.20107 5.83334 6.83696 5.83334 7.5C5.83334 8.16304 6.09674 8.79893 6.56558 9.26777C7.03442 9.73661 7.6703 10 8.33334 10H11.6667C12.3297 10 12.9656 10.2634 13.4344 10.7322C13.9033 11.2011 14.1667 11.837 14.1667 12.5C14.1667 13.163 13.9033 13.7989 13.4344 14.2678C12.9656 14.7366 12.3297 15 11.6667 15H8.33334C7.8348 14.9785 7.3541 14.8082 6.95312 14.5112C6.55214 14.2142 6.24922 13.804 6.08334 13.3333" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 2.5V5M10 15V17.5" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_2081_103">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
                </defs>
                </svg>

              <p >Price: <span class="font-medium">$${
                pet.price || "0"
              }</span></p>
            </div>
            <div class="flex gap-2 items-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_2081_39)">
                  <path d="M3.33334 3.33337H8.33334V8.33337H3.33334V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11.6667 3.33337H16.6667V8.33337H11.6667V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3.33334 11.6666H8.33334V16.6666H3.33334V11.6666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11.6667 14.1666C11.6667 14.8297 11.9301 15.4656 12.3989 15.9344C12.8677 16.4032 13.5036 16.6666 14.1667 16.6666C14.8297 16.6666 15.4656 16.4032 15.9344 15.9344C16.4033 15.4656 16.6667 14.8297 16.6667 14.1666C16.6667 13.5036 16.4033 12.8677 15.9344 12.3989C15.4656 11.93 14.8297 11.6666 14.1667 11.6666C13.5036 11.6666 12.8677 11.93 12.3989 12.3989C11.9301 12.8677 11.6667 13.5036 11.6667 14.1666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_2081_39">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p>Vaccinated: <span class="font-medium">${
                pet.vaccinated_status || "Unknown"
              }</span></p>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <h3 class="font-bold text-lg mb-2">Details Information</h3>
          <p class="text-gray-600">
            ${
              pet.pet_details || "No additional details available for this pet."
            }
          </p>
         
        </div>
      </div>

      <div class="modal-action">
        <form method="dialog" class="w-full">
          <button class="btn bg-[#E7F2F2] text-[#0E7A81] w-full">
            Close
          </button>
        </form>
      </div>
    </div>
  `;

  // Add modal to body and show it
  document.body.appendChild(modal);
  modal.showModal();
};

const navbarMenu = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/" },
  { name: "Contact", path: "/" },
];

// Function to generate menu items
function generateMenu() {
  const menuContainer = document.getElementById("navbarMenu");

  navbarMenu.forEach((item) => {
    const menuItem = document.createElement("p");
    menuItem.className =
      "cursor-pointer hover:text-orange-600 transition-colors";
    menuItem.textContent = item?.name;

    //   menuItem.onclick = () => {
    //     window.location.href = item.path;
    //   };

    menuContainer.appendChild(menuItem);
  });
}

let selectedImages = []; // store adopted pets' images

function toggleAdopt(button, imageUrl) {
  const gallery = document.getElementById("gallery");

  // check if image already selected
  if (selectedImages.includes(imageUrl)) {
    // remove image
    selectedImages = selectedImages.filter((img) => img !== imageUrl);
    button.textContent = "Adopt";
    button.classList.remove("text-red-500", "border-red-500");
    button.classList.add("text-[#0E7A81]", "border-[#0E7A81]");
  } else {
    // add image
    selectedImages.push(imageUrl);
    button.textContent = "Remove";
    button.classList.remove("text-[#0E7A81]", "border-[#0E7A81]");
    button.classList.add("text-red-500", "border-red-500");
  }

  // update gallery view
  updateGallery();

  // toggle gallery visibility
  if (selectedImages.length > 0) {
    gallery.classList.remove("hidden");
  } else {
    gallery.classList.add("hidden");
  }
}

function updateGallery() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = ""; // clear old images

  selectedImages.forEach((imgUrl) => {
    const figure = document.createElement("figure");
    figure.className = "h-[100px]";
    figure.innerHTML = `
      <img src="${imgUrl}" alt="Pet" class="rounded-lg w-full h-[100px] object-cover" />
    `;
    gallery.appendChild(figure);
  });
}

// Function to dynamically show current year in footer

function dynamicallyShowYear() {
  const yearElement = document.getElementById("dynamically-year");
  const date = new Date();
  const year = date.getFullYear();
  yearElement.textContent = `© ${year} Peddy Website - All rights reserved`;
}

dynamicallyShowYear();

generateMenu();
// Generate menu when page loads
// document.addEventListener("DOMContentLoaded", generateMenu);
