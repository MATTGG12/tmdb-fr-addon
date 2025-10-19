const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/manifest.json", (req, res) => {
  res.sendFile(__dirname + "/manifest.json");
});

app.get("/meta/:type/:id", async (req, res) => {
  const { id } = req.params;
  const apiKey = "TA_CLE_TMDB"; // Remplace par ta clé TMDB
  try {
    const response = await fetch(`https://api.themoviedb.org/3/find/${id}?api_key=${apiKey}&language=fr-FR&external_source=imdb_id`);
    const data = await response.json();
    const movie = data.movie_results[0] || {};
    res.json({
      id: id,
      type: "movie",
      name: movie.title || "Titre français",
      overview: movie.overview || "Résumé français",
      poster: movie.poster_path ? "https://image.tmdb.org/t/p/w500" + movie.poster_path : ""
    });
  } catch (e) {
    res.json({
      id: id,
      type: "movie",
      name: "Titre français",
      overview: "Résumé français",
      poster: ""
    });
  }
});

app.listen(PORT, () => console.log(`Addon running on port ${PORT}`));
