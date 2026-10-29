const movies = [
  {
    id: 1,
    title: "Мальчик в полосатой пижаме",
    year: 2008,
    genre: "Драма",
    poster: "https://image.tmdb.org/t/p/w500/2C8QC6eJw9i4v8qj6s7m.jpg",
    description: "История дружбы двух мальчиков во время Второй мировой войны.",
    link: "https://www.kinopoisk.ru/film/281251/"
  },
  {
    id: 2,
    title: "Батальонъ",
    year: 2015,
    genre: "Драма",
    poster: "https://placehold.co/500x750/302238/ffffff?text=Батальонъ",
    description: "Военная драма о женском батальоне времён Первой мировой войны.",
    link: "https://www.google.com/search?q=Батальонъ+2015+фильм"
  },
  {
    id: 3,
    title: "Шоу Трумана",
    year: 1998,
    genre: "Комедия",
    poster: "https://image.tmdb.org/t/p/w500/vuza0WqY239yBXOadKlGwJsZJFE.jpg",
    description: "Мужчина начинает сомневаться в реальности своего привычного мира.",
    link: "https://www.paramount.com/movies/the-truman-show"
  },
  {
    id: 4,
    title: "Субстанция",
    year: 2024,
    genre: "Триллер",
    poster: "https://image.tmdb.org/t/p/w500/evKz85EKouVbIr51zy5fOtpNRPg.jpg",
    description: "Фантастический триллер о славе, внешности и цене совершенства.",
    link: "https://www.google.com/search?q=Субстанция+2024+фильм"
  },
  {
    id: 5,
    title: "Менталист",
    year: 2008,
    genre: "Сериал",
    poster: "https://placehold.co/500x750/29213e/ffffff?text=Менталист",
    description: "Криминальный сериал о консультанте, помогающем раскрывать преступления.",
    link: "https://www.google.com/search?q=Менталист+сериал"
  },
  {
    id: 6,
    title: "Ты тот, кого я люблю",
    year: 2026,
    genre: "Сериал",
    poster: "https://placehold.co/500x750/43283f/ffffff?text=Ты+тот+кого+я+люблю",
    description: "Романтическая история о любви и сложном выборе.",
    link: "https://www.google.com/search?q=Ты+тот+кого+я+люблю+сериал"
  }
];

const movieList = document.getElementById("movieList");
const search = document.getElementById("search");
const emptyMessage = document.getElementById("emptyMessage");
const dialog = document.getElementById("movieDialog");
const movieDetails = document.getElementById("movieDetails");

let activeGenre = "Все";
let selectedSeats = [];
const occupiedSeats = [3, 7, 12, 18, 25, 31, 42, 50];

function renderMovies() {
  const query = search.value.trim().toLowerCase();

  const filtered = movies.filter(movie =>
    movie.title.toLowerCase().includes(query) &&
    (activeGenre === "Все" || movie.genre === activeGenre)
  );

  movieList.innerHTML = filtered.map(movie => `
    <article class="movie-card">
      <img
        class="movie-poster"
        src="${movie.poster}"
        alt="${movie.title}"
        loading="lazy"
        onerror="this.onerror=null;this.src='https://placehold.co/500x750/24203a/ffffff?text=KINOTIME';"
      >

      <div class="movie-info">
        <h3>${movie.title}</h3>
        <div class="movie-meta">${movie.year} · ${movie.genre}</div>
        <p class="movie-description">${movie.description}</p>

        <div class="card-actions">
          <button class="details-btn" onclick="openMovie(${movie.id})">
            Подробнее
          </button>
          <button class="book-btn" onclick="bookMovie(${movie.id})">
            Выбрать билет
          </button>
        </div>
      </div>
    </article>
  `).join("");

  emptyMessage.classList.toggle("hidden", filtered.length > 0);
}

function openMovie(id) {
  const movie = movies.find(item => item.id === id);

  movieDetails.innerHTML = `
    <img class="detail-poster"
      src="${movie.poster}"
      alt="${movie.title}"
      onerror="this.onerror=null;this.src='https://placehold.co/500x750/24203a/ffffff?text=KINOTIME';">

    <h2>${movie.title}</h2>
    <p>${movie.year} · ${movie.genre}</p>
    <p>${movie.description}</p>

    <a class="external-link"
      href="${movie.link}"
      target="_blank"
      rel="noopener noreferrer">
      Страница фильма ↗
    </a>

    <button class="main-btn wide"
      style="margin-top:20px"
      onclick="bookMovie(${movie.id})">
      Выбрать билет
    </button>
  `;

  dialog.showModal();
}

document.getElementById("closeDialog").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

function bookMovie(id) {
  const movie = movies.find(item => item.id === id);
  dialog.close();

  document.querySelector(".booking h2").textContent =
    `🎟 Билеты: ${movie.title}`;

  document.getElementById("booking").scrollIntoView({
    behavior: "smooth"
  });

  document.getElementById("ticket").classList.add("hidden");
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item =>
      item.classList.remove("active")
    );

    button.classList.add("active");
    activeGenre = button.dataset.genre;
    renderMovies();
  });
});

search.addEventListener("input", renderMovies);

const seatsContainer = document.getElementById("seats");

for (let i = 1; i <= 64; i++) {
  const seat = document.createElement("button");
  seat.className = "seat";
  seat.textContent = i;
  seat.type = "button";

  if (occupiedSeats.includes(i)) {
    seat.classList.add("occupied");
    seat.disabled = true;
  }

  seat.addEventListener("click", () => {
    if (selectedSeats.includes(i)) {
      selectedSeats = selectedSeats.filter(n => n !== i);
      seat.classList.remove("selected");
    } else {
      selectedSeats.push(i);
      seat.classList.add("selected");
    }

    updateTotal();
  });

  seatsContainer.appendChild(seat);
}

function updateTotal() {
  document.getElementById("seatCount").textContent = selectedSeats.length;
  document.getElementById("totalPrice").textContent =
    selectedSeats.length * 160;
}

document.getElementById("buyButton").addEventListener("click", () => {
  if (selectedSeats.length === 0) {
    alert("Сначала выбери свободное место!");
    return;
  }

  const cinema = document.getElementById("cinema").value;
  const session = document.getElementById("session").value;
  const title = document.querySelector(".booking h2").textContent
    .replace("🎟 Билеты: ", "");

  const ticket = document.getElementById("ticket");

  ticket.innerHTML = `
    <h3>🎫 ТВОЙ ЭЛЕКТРОННЫЙ БИЛЕТ</h3>
    <p><b>Фильм:</b> ${title}</p>
    <p><b>Кинотеатр:</b> ${cinema}</p>
    <p><b>Время:</b> ${session}</p>
    <p><b>Места:</b> ${selectedSeats.join(", ")}</p>
    <p><b>Стоимость:</b> ${selectedSeats.length * 160} сом</p>
    <p>Демонстрационный билет — оплата не производится.</p>
  `;

  ticket.classList.remove("hidden");
});

renderMovies();