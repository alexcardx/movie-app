export const initialMovieFilters = {
  sort_by: "vote_average.desc",
  "vote_count.gte": 1000,
  "with_runtime.gte": 80,
};

export const initialShowsFilters = {
  sort_by: "vote_average.desc",
  "vote_count.gte": 1000,
};

export const movieCategoryOptions = [
  { value: "vote_average.desc", label: "Top Rated" },
  { value: "popularity.desc", label: "Popular" },
  { value: "revenue.desc", label: "Box Office" },
];

export const showsCategoryOptions = [
  { value: "vote_average.desc", label: "Top Rated" },
  { value: "popularity.desc", label: "Popular" },
];

export const selectDropDownStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#000",
    borderColor: state.isFocused
      ? "rgba(255, 255, 255, 0.16)"
      : "rgba(255, 255, 255, 0.16)",
    color: "#fff",
    boxShadow: state.isFocused ? "0 0 0 1px #A0AEC0" : "none",
    borderRadius: "0.375rem",
    padding: "2px",
    minHeight: "40px",
    "&:hover": {
      borderColor: "#A0AEC0",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#E2E8F0",
  }),
  input: (base) => ({
    ...base,
    color: "#E2E8F0",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#737679",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#000",
    color: "#E2E8F0",
    borderRadius: "0.375rem",
    marginTop: 2,
    zIndex: 30,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#4A5568" : "transparent",
    color: "#E2E8F0",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#fff",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#A0AEC0",
    "&:hover": {
      color: "#E2E8F0",
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    cursor: "pointer",
    color: "#A0AEC0",
    "&:hover": {
      color: "#E2E8F0",
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#ffffff24",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "white",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "white",
    ":hover": {
      backgroundColor: "#e53e3e",
      color: "white",
    },
  }),
};
