export const keyOptions = [
    { value: -1, label: "Unknown" },
    { value: 0, label: "C" },
    { value: 1, label: "C#/Db" },
    { value: 2, label: "D" },
    { value: 3, label: "D#/Eb" },
    { value: 4, label: "E" },
    { value: 5, label: "F" },
    { value: 6, label: "F#/Gb" },
    { value: 7, label: "G" },
    { value: 8, label: "G#/Ab" },
    { value: 9, label: "A" },
    { value: 10, label: "A#/Bb" },
    { value: 11, label: "B" },
];

export const handleRangeChange = (setFilters, minKey, maxKey, value) => {
    setFilters((prev) => ({
        ...prev,
        [minKey]: value[0],
        [maxKey]: value[1],
    }));
};