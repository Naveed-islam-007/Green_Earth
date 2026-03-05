const categoriesContainer=document.getElementById("catcontainer");
const treesContainer=document.getElementById("treeContainer");
const allTreesBtn = document.getElementById("alltrees");
const treeDetailsModal = document.getElementById("tree-details-modal");
let cart = [];

allTreesBtn.onclick = () => selectCategory(null, allTreesBtn);

async function loadcategories() {
    const url = `https://openapi.programming-hero.com/api/categories`;

    const res = await fetch(url);
    const data = await res.json();

    data.categories.forEach(element => {

        const button = document.createElement("button");

        button.classList = "btn btn-outline w-full";

        button.textContent = element.category_name;

        button.onclick = () => selectCategory(element.id, button);

        categoriesContainer.appendChild(button);
    });
}

async function selectCategory(categoryId, button) {

    const allButtons = document.querySelectorAll("#catcontainer button, #alltrees");

    allButtons.forEach((button) => {
        button.classList.remove("btn-primary");
        button.classList.add("btn-outline");
    });

    button.classList.remove("btn-outline");
    button.classList.add("btn-primary");

    if (categoryId === null) {
        loadTrees();
        return;
    }

    const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${categoryId}`
  );
  const data = await res.json();
  displayTrees(data.plants);

}

async function loadTrees() {
      treesContainer.innerHTML = ""; 
    const res=await fetch(`https://openapi.programming-hero.com/api/plants`);
    const data= await res.json();
    displayTrees(data.plants);
}

function displayTrees(trees) {
    treesContainer.innerHTML = "";
    trees.forEach((tree)=> {
        const card=document.createElement("div");
        card.className="card  bg-white shadow-sm";
        card.innerHTML=`
         <figure>
    <img
      src="${tree.image}"
      alt="${tree.name}"
      title="${tree.name}"
      class="w-full h-48 object-cover"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title" onclick="opentreemodal(${tree.id})">${tree.name}</h2>
    <p class="line-clamp-2"> ${tree.description} </p>
    <div class="badge badge-success bg-white text-green-500">${tree.category}</div>
    <div class="card-actions  justify-between">
        <h2 class="text-xl font-bold text-green-500">$${tree.price}</h2>
      <button class="btn btn-primary bg-green-500" onclick="addToCart(${tree.id},${tree.price}, '${tree.name}')">Add to Cart</button>
    </div>
  </div>       
        `
        treesContainer.appendChild(card);
    })
}

async function opentreemodal(treeId) {
    const res = await fetch(
    `https://openapi.programming-hero.com/api/plant/${treeId}`,
  );
  const data = await res.json();
  const plantDetails = data.plants;
  modalTitle.textContent = plantDetails.name;
  modalImage.src = plantDetails.image;
  modalCategory.textContent = plantDetails.category;
  modalDescription.textContent = plantDetails.description;
  modalPrice.textContent = plantDetails.price;
    treeDetailsModal.showModal();
}



loadcategories();
loadTrees();