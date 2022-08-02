let title;
let type;
let year;
let storage = [];

$("#search-Btn").on("click", function (event) {
  event.preventDefault();
  title = $("#title").val().trim().toLowerCase();
  // type = $("#type").val().trim().toLowerCase();
  year = $("#year").val().trim().toLowerCase();

  getData(title, year);
  document.querySelector('.results-section-container').scrollIntoView({
    behavior: 'smooth', block: 'nearest', inline: "nearest"
});
  document.getElementById("myForm").reset();
  $("#movieCard").remove();
});

function getData(title,year) {
  axios
    .get(
      `http://www.omdbapi.com/?apikey=b00e7121&t=${title}&y=${year}&plot=full`
    )
    .then((response) => {
      if (response.data.Response === "False") {
        alert("Error! Please, try again. Check your spelling.");
      } else {
        renderCard(response.data);
        storage.unshift(response.data);
        localStorage.setItem("saved-movies-series", JSON.stringify(storage));
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function renderCard(data) {
  $("#movieCard-container").append(`
    <div id="movieCard">
         <img src="${data.Poster}" alt=${data.Title}/>
      <div class="movie-card-body">
        <h1>${data.Title}</h1>
        <p><b>Genre:</b> ${data.Genre}</p>
        <p><b>Actors:</b> ${data.Actors}</p>
        <p><b>Year:</b> ${data.Year}</p>
        <p><b>Rated:</b> ${data.Rated}</p>
        <p><b>Plot:</b> ${data.Plot}</p>
        <p><b>Director:</b> ${data.Director}</p>
        <p><b>Runtime:</b> ${data.Runtime}</p>
    </div>
  </div>
 `);
};

function createStorage (data) {
  storage.push(data);
  localStorage.setItem("saved-movies-series", JSON.stringify(storage));
  renderStorage();
};

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

if (localStorage.getItem("saved-movies-series") === null) {
  localStorage.setItem("saved-movies-series", JSON.stringify(storage));
};

$("#empty-storage-btn").on('click', (event) => {
  event.preventDefault();
  console.log("clear");
  localStorage.setItem("saved-movies-series", JSON.stringify([]));
  location.reload();
});

renderStorage();
