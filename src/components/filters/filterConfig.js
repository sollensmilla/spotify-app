export const rangeFilters = [
  {
    label: "Energy",
    minKey: "energyMin",
    maxKey: "energyMax",
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    label: "Tempo",
    minKey: "tempoMin",
    maxKey: "tempoMax",
    min: 0,
    max: 200,
  },
  {
    label: "Danceability",
    minKey: "danceabilityMin",
    maxKey: "danceabilityMax",
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    label: "Popularity",
    minKey: "popularityMin",
    maxKey: "popularityMax",
    min: 0,
    max: 100,
  },
  {
    label: "Acousticness",
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