export function createData(
  name,
  email,
  department,
  region,
  trainingTitle,
  date
) {
  return { name, email, department, region, trainingTitle, date };
}

export function createTrainings(id, category, title, season) {
  return { id, category, title, season };
}

export const regions = [
  { value: "Tigray", label: "Tigray" },
  { value: "Afar", label: "Afar" },
  { value: "Amhara", label: "Amhara" },
  { value: "Oromia", label: "Oromia" },
  { value: "Somali", label: "Somali" },
  { value: "Benishangul-Gumuz", label: "Benishangul-Gumuz" },
  {
    value: "Southern Nations Nationalities and People Region (SNNPR)",
    label: "Southern Nations Nationalities and People Region (SNNPR)",
  },
  { value: "Gambella", label: "Gambella" },
  { value: "Harari", label: "Harari" },
];

export const seasons = [
  {
    value: "1st Quarter",
    label: "1st Quarter",
  },
  {
    value: "2nd Quarter",
    label: "2nd Quarter",
  },
  {
    value: "3rd Quarter",
    label: "3rd Quarter",
  },

  {
    value: "4th Quarter",
    label: "4th Quarter",
  },
];
