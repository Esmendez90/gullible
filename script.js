let title;
let type;
let year;
let acc = []

function getData(title, year) {
  axios
    .get(
      `http://www.omdbapi.com/?apikey=b00e7121&t=${title}&y=${year}&plot=full`
    )
    .then((response) => {
      if (response.data.Response === "False") {
        alert("Error! Please, try again. Check your spelling.");
      } else {
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
}

function renderStorage() {
  $("#storage-container").empty();
  let storage = JSON.parse(localStorage.getItem("saved-movies-series"));
  for (let i = 0; i < storage.length; i++) {
    $("#storage-container").append(`
    <div id="movieCard">
  
       
        <img src="${storage[i].Poster}" alt=${storage[i].Title}/>
        
       <button class="accordion">Expand</button>
        <div class="movie-card-body panel" >
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
  acc = document.getElementsByClassName("accordion");
  createBtn();
 console.log(acc);
  }
}

$("#search-Btn").on("click", function (event) {
  event.preventDefault();
  title = $("#title").val().trim().toLowerCase();
  year = $("#year").val().trim().toLowerCase();

  getData(title, year);
  document.querySelector("#movieCard-container").scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start",
  });
  document.getElementById("myForm").reset();
  $("#movieCard").remove();
});

if (localStorage.getItem("saved-movies-series") === null) {
  localStorage.setItem("saved-movies-series", JSON.stringify([]));
}

$("#empty-storage-btn").on("click", (event) => {
  event.preventDefault();
  console.log("clear");
  localStorage.setItem("saved-movies-series", JSON.stringify([]));
  location.reload();
});

// let acc = document.getElementsByClassName("accordion");

// console.log(acc);
function createBtn () {
if (acc.length > 1 ){
  console.log(acc);
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    console.log(panel);
    if (panel.style.height === 0) {
      panel.style.height = 100 + "%";
    } else {
      panel.style.height = 0;
    }
  });
}
} else {
  acc = [];
}

}
renderStorage();
