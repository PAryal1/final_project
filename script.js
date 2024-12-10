function showLoadingIndicator(show) {
  const loadingIndicator = document.getElementById("loading");
  loadingIndicator.style.display = show ? "block" : "none";
}

document.getElementById("fetch-dog").addEventListener("click", function () {
  const imageElement = document.getElementById("dog-image");
  const nameElement = document.getElementById("dog-name");

  showLoadingIndicator(true);

  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((data) => {
      const breed = data.message.split("/")[4];
      const formattedBreed = breed.replace("-", " ").toUpperCase();

      imageElement.src = data.message;
      imageElement.hidden = false;
      nameElement.textContent = formattedBreed;
      showLoadingIndicator(false);
    })
    .catch((error) => {
      console.error("Error fetching the dog image:", error);
      showLoadingIndicator(false);
    });
});

const breedList = document.getElementById("dog-breeds");
fetch("https://dog.ceo/api/breeds/list/all")
  .then((response) => response.json())
  .then((data) => {
    const breeds = Object.keys(data.message);
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed;
      breedList.appendChild(option);
    });
  })
  .catch((error) => console.error("Error fetching the breed list:", error));

document.getElementById("search-button").addEventListener("click", function () {
  const breed = document.getElementById("dog-search").value;
  const imageElement = document.getElementById("dog-image");
  const nameElement = document.getElementById("dog-name");

  if (breed) {
    showLoadingIndicator(true);

    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then((response) => response.json())
      .then((data) => {
        imageElement.src = data.message;
        imageElement.hidden = false;
        nameElement.textContent = breed.toUpperCase();
        showLoadingIndicator(false);
      })
      .catch((error) => {
        console.error("Error fetching the dog image:", error);
        showLoadingIndicator(false);
      });
  } else {
    alert("Please select a valid breed.");
  }
});
