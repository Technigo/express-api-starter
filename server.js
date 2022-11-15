import express from 'express';
import cors from 'cors';
import disneyMovies from './disneyMovies.json';
// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middleware to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.json({ responseMessage: 'Hello Technigo' });
});

app.get('/movies', (req, res) => {
  console.log(req.query);
  const { title, year } = req.query;
  let filteredMovies = disneyMovies;

  if (title) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())
    );
  }
  if (year) {
    filteredMovies = filteredMovies.filter((movie) => {
      console.log(movie);
      if (movie['Release date (datetime)'] === null) {
        return false;
      }
      return movie['Release date (datetime)']
        .toLocaleLowerCase()
        .includes(year.toLocaleLowerCase());
    });
  }
  res.status(200).json(filteredMovies);
});

app.get('/movies/:id', (req, res) => {
  const singleMovie = disneyMovies.find((movie) => {
    return movie.imdb_id === req.params.id;
  });
  if (singleMovie) {
    return res.status(200).json(singleMovie);
  }
  return res.status(404).json({ error: 'Oh no there is no movie :(' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
