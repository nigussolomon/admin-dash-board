function createData(name, email, department, region, trainingTitle, date) {
  return { name, email, department, region, trainingTitle, date };
}

export const samples = [
  [
    createData(
      "Nigus Solomon",
      "nigus.solomon@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management",
      "2023-04-23"
    ),
    createData(
      "Hemen Solomon",
      "hemen.solomon@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management",
      "2023-04-23"
    ),
    createData(
      "Hawani Hashim",
      "hawani.hashim@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management",
      "2023-04-23"
    ),
    createData(
      "Eyosias Mekbib",
      "eyosias.mekbib@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management",
      "2023-04-23"
    ),
    createData(
      "Kaleab Anteneh",
      "kaleab.anteneh@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management",
      "2023-04-23"
    ),
    createData(
      "Yeabsera Seyoum",
      "yeabsera.seyoum@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management",
      "2023-04-23"
    ),
    createData(
      "Aklog Sirak",
      "aklog.sirak@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management",
      "2023-04-23"
    ),
  ],

  [
    createData(
      "Nigus Solomon",
      "nigus.solomon@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management",
      "2023-04-23"
    ),
    createData(
      "Hemen Solomon",
      "hemen.solomon@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management",
      "2023-04-23"
    ),
    createData(
      "Hawani Hashim",
      "hawani.hashim@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management",
      "2023-04-23"
    ),
  ],

  [
    createData(
      "Nigus Solomon",
      "nigus.solomon@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management",
      "2023-04-23"
    ),
    createData(
      "Hemen Solomon",
      "hemen.solomon@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management",
      "2023-04-23"
    ),
    createData(
      "Hawani Hashim",
      "hawani.hashim@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management",
      "2023-04-23"
    ),
    createData(
      "Yeabsera Seyoum",
      "yeabsera.seyoum@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management",
      "2023-04-23"
    ),
  ],
];

export const currencies = [
  {
    value: "DEPARTMENT",
    label: "DEPARTMENT",
  },
  {
    value: "REGION",
    label: "REGION",
  },
  {
    value: "TRAINING TITLE",
    label: "TRAINING TITLE",
  },

  {
    value: "TRAINING CATEGORY",
    label: "TRAINING CATEGORY",
  },
];

export const trainings = {
	"TRAINING CATEGORY": [
		{
			value: "Information Management",
			label: "Information Management",
		},
		{
			value: "Software Engineering",
			label: "Software Engineering",
		},
	],

	"REGION": [
		{
			value: "Information Security",
			label: "Information Security",
		},
		{
			value: "Software Requirements Engineering",
			label: "Software Requirements Engineering",
		},
	],

	"TRAINING TITLE":[
		{
			value:  "Data Analytics",
			label: "Data Analytics",  
		}
	],

	"DEPARTMENT": [
		{
			value: "Data Security",
			label: "Data Security", 
		}
	],
};
