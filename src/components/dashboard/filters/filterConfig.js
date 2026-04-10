export const rangeFilters = [
  {
    label: "Energy",
    color: "linear-gradient(90deg, #cb5656, #930303)",
    minKey: "energyMin",
    maxKey: "energyMax",
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    label: "Tempo",
    color: "linear-gradient(90deg, #9ee49e, #1b6901)",
    minKey: "tempoMin",
    maxKey: "tempoMax",
    min: 0,
    max: 200,
  },
  {
    label: "Danceability",
    color: "linear-gradient(90deg, #c079be, #7a066e)",
    minKey: "danceabilityMin",
    maxKey: "danceabilityMax",
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    label: "Popularity",
    color: "linear-gradient(90deg, #9be5de, #0c8e92)",
    minKey: "popularityMin",
    maxKey: "popularityMax",
    min: 0,
    max: 100,
  },
  {
    label: "Acousticness",
    color: "linear-gradient(90deg, #c9e3f9, #0c0090)",
    minKey: "acousticnessMin",
    maxKey: "acousticnessMax",
    min: 0,
    max: 1,
    step: 0.01,
  },
];

export const selectFilters = [
  {
    label: "Explicit",
    key: "explicit",
    options: [
      { value: "", label: "All" },
      { value: "true", label: "Explicit" },
      { value: "false", label: "Clean" },
    ],
  },
];

export const textFilters = [
  {
    label: "Genre",
    key: "genre",
  },
  {
    label: "Track name",
    key: "name",
  },
];