let title;
let type;
let year;
let storage = [];
let favorites = [];

$("#search-Btn").on("click", function (event) {
  event.preventDefault();
  title = $("#title").val().trim().toLowerCase();
  type = $("#type").val().trim().toLowerCase();
  year = $("#year").val().trim().toLowerCase();

  getData(title, type, year);

  document.getElementById("myForm").reset();
});

function getData(title, type, year) {
  axios
    .get(
      `http://www.omdbapi.com/?apikey=b00e7121&t=${title}&type=${type}&y=${year}`
    )
    .then((response) => {
      if (response.data.Response === "False") {
        alert("Error! Please, try again.");
      } else {
        // createStorage(response.data);
        storage.unshift(response.data);
        localStorage.setItem("saved-movies-series", JSON.stringify(storage));
        displayData(response.data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayData(data) {
  $("#movieCard").remove();
  const { Title, Year, Genre, Actors, Rated, Plot, Director, Runtime, Poster } =
    data;

  $("#movieCard-container").append(
    `
    <div id="movieCard" >
    <div id="star-btn"><i class="fa-solid fa-star"></i></div>
      <img src="${Poster}" alt=${Title}/>
        <div class="movie-card-body">
          <h1>${Title}</h1>
          <p><b>Genre:</b> ${Genre}</p>
          <p><b>Actors:</b> ${Actors}</p>
          <p><b>Year:</b> ${Year}</p>
          <p><b>Rated:</b> ${Rated}</p>
          <p><b>Plot:</b> ${Plot}</p>
          <p><b>Director:</b> ${Director}</p>
          <p><b>Runtime:</b> ${Runtime}</p>
        </div>
    </div>
    `
    
  );
  saveFarovite(data);
}

function renderStorage() {
  storage = JSON.parse(localStorage.getItem("saved-movies-series"));
  for (var i = 0; i < storage.length; i++) {
    $("#storage-container").append(`
    <div id="movieCard">
        <img src="${storage[i].Poster}" alt=${storage[i].Title}/>
        <div class="movie-card-body">
       <h1>${storage[i].Title}</h1>
       <p><b>Genre:</b> ${storage[i].Genre}</p>
       <p><b>Actors:</b> ${storage[i].Actors}</p>
       <p><b>Year:</b> ${storage[i].Year}</p>
       <p><b>Rated:</b> ${storage[i].Rated}</p>
       <p><b>Plot:</b> ${storage[i].Plot}</p>
       <p><b>Director:</b> ${storage[i].Director}</p>
       <p><b>Runtime:</b> ${storage[i].Runtime}</p>
   </div>
 </div>
 `);
  };
};

function renderFavorites() {
  favorites = JSON.parse(localStorage.getItem("favorite-movies-series"));
  for (var i = 0; i < favorites.length; i++) {
    $("#favorites-container").append(`
    <div id="movieCard">
        <img src="${favorites[i].Poster}" alt=${favorites[i].Title}/>
        <div class="movie-card-body">
       <h1>${favorites[i].Title}</h1>
       <p><b>Genre:</b> ${favorites[i].Genre}</p>
       <p><b>Actors:</b> ${favorites[i].Actors}</p>
       <p><b>Year:</b> ${favorites[i].Year}</p>
       <p><b>Rated:</b> ${favorites[i].Rated}</p>
       <p><b>Plot:</b> ${favorites[i].Plot}</p>
       <p><b>Director:</b> ${favorites[i].Director}</p>
       <p><b>Runtime:</b> ${favorites[i].Runtime}</p>
   </div>
 </div>
 `);
  };
};


function saveFarovite(data){
$("#star-btn").on("click", function (event) {
  event.preventDefault();
  favorites.unshift(data);
  localStorage.setItem("favorite-movies-series", JSON.stringify(favorites));
  console.log(favorites);
  renderFavorites();
});
}


if (localStorage.getItem("saved-movies-series") === null) {
  localStorage.setItem("saved-movies-series", JSON.stringify(storage));
}
if (localStorage.getItem("favorite-movies-series") === null) {
  localStorage.setItem("favorite-movies-series", JSON.stringify(favorites));
}
renderStorage();
renderFavorites();
