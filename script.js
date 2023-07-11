let title;
let type;
let year;
let movieCardEl = document.getElementById("imgBtn");

function getData(title, year) {
  $("#movieCard").remove();
  document.querySelector("#movieCard-container").scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start",
  });
  axios
    .get(
      `http://www.omdbapi.com/?apikey=b00e7121&t=${title}&y=${year}&plot=full`
    )
    .then((response) => {
      console.log(response)
      if (response.data.Response === "False") {
        alert("Error! Please, try again. Check your spelling.");
      } else {
        // console.log(response.data);
        let storage = JSON.parse(localStorage.getItem("saved-movies-series"));
        storage.unshift(response.data);
        localStorage.setItem("saved-movies-series", JSON.stringify(storage));
        renderCard(response.data);
        renderStorage();
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function renderCard(data) {
 $(".movie-title")[0].innerHTML = `<h1>${data.Title.toUpperCase()}</h1`;
  //  console.log(y);
  $("#movieCard-container").append(`
    <div id="movieCard">
         <img src="${data.Poster}" alt=${data.Title}/>
      <div class="movie-card-body">
        <p><b>Country:</b> ${data.Country}</p>
        <p><b>Genre:</b> ${data.Genre}</p>
        <p><b>Actors:</b> ${data.Actors}</p>
        <p><b>Awards:</b> ${data.Awards}</p>
        <p><b>Year:</b> ${data.Year}</p>
        <p><b>Rated:</b> ${data.Rated}</p>
        <p><b>Plot:</b> ${data.Plot}</p>
        <p><b>Writer:</b> ${data.Writer}</p>
        <p><b>Director:</b> ${data.Director}</p>
        <p><b>Language:</b> ${data.Language}</p>
        <p><b>Runtime:</b> ${data.Runtime}</p>
    </div>
  </div>
 `);
}

function renderStorage() {
  $("#storage-container").empty();
  let storage = JSON.parse(localStorage.getItem("saved-movies-series"));
  for (let i = 0; i < storage.length; i++) {
    $("#storage-container").append(`
    <div id="movieCard" onclick="myf(event)">
  
       
      <img src="${storage[i].Poster}" alt="${storage[i].Title}" id="${storage[i].Title}" />
        
   
    </div>
 `);
  }
}

$("#search-Btn").on("click", function (event) {
  event.preventDefault();
  title = $("#title").val().trim().toLowerCase();
  year = $("#year").val().trim().toLowerCase();

  getData(title, year);
  // document.querySelector("#movieCard-container").scrollIntoView({
  //   behavior: "smooth",
  //   block: "start",
  //   inline: "start",
  // });
  document.getElementById("myForm").reset();
  // $("#movieCard").remove();
});

$("#empty-storage-btn").on("click", (event) => {
  event.preventDefault();
  console.log("clear");
  localStorage.setItem("saved-movies-series", JSON.stringify([]));
  location.reload();
});

myf = (event) => {
  event.preventDefault();
  let el = event.target;
  el = el.id;

  // console.log(el)
  getData(el);
};

if (localStorage.getItem("saved-movies-series") === null) {
  localStorage.setItem("saved-movies-series", JSON.stringify([]));
}

renderStorage();
