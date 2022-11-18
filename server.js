import express from "express";
import cors from "cors";
import premierLeague from './premierLeague.json';

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ responseMessage: 'Hello!' });
});

// Start defining your routes here
app.get('/seasons', (req, res) => {
  const uniqueSeason = new Set()
  for (let i = 0; i < premierLeague.length; i++) {
    uniqueSeason.add(premierLeague[i].playedSeason)
  }
  const uniqueSeasonArray = Array.from(uniqueSeason)
  return res.status(200).json({'seasons': uniqueSeasonArray});
});


app.get('/season/:id', (req, res) => {
  const singleSeason = premierLeague.filter((season) => {
    return season.playedSeason === req.params.id;
  });
  if (singleSeason) {
    return res.status(200).json({'uniqueseason': singleSeason});
  }
  return res.status(404).json({ error: 'Oops! No season found!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
