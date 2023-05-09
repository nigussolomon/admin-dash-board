function createData(name, email, department, region, trainingTitle, date) {
  return { name, email, department, region, trainingTitle, date };
}

function createTrainings(category, title, season) {
  return { category, title, season };
}

export const samples = [
  [
    createData(
      "Nigus Solomon",
      "nigus.solomon@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management 1",
      "2023-04-23"
    ),
    createData(
      "Hemen Solomon",
      "hemen.solomon@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management 2",
      "2023-04-23"
    ),
    createData(
      "Hawani Hashim",
      "hawani.hashim@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management 3",
      "2023-04-23"
    ),
    createData(
      "Eyosias Mekbib",
      "eyosias.mekbib@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management 4",
      "2023-04-23"
    ),
    createData(
      "Kaleab Anteneh",
      "kaleab.anteneh@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management 5",
      "2023-04-23"
    ),
    createData(
      "Yeabsera Seyoum",
      "yeabsera.seyoum@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management 6",
      "2023-04-23"
    ),
    createData(
      "Aklog Sirak",
      "aklog.sirak@mks.com",
      "Software Engineering",
      "Addis Ababa",
      "Information Management 7",
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

export const seasons = [
  {
    value: "Summer",
    label: "Summer",
  },
  {
    value: "Fall",
    label: "Fall",
  },
  {
    value: "Winter",
    label: "Winter",
  },

  {
    value: "Spring",
    label: "Spring",
  },
]

export const currencies = [
  {
    value: "IT and Technical Skills",
    label: "IT and Technical Skills",
  },
  {
    value: "Financial Skills",
    label: "Financial Skills",
  },
  {
    value: "Business Skills",
    label: "Business Skills",
  },

  {
    value: "Management Skills",
    label: "Management Skills",
  },
];

export const trainings = {
  "Management Skills": [
    { value: "Basic Managerial Skills", label: "Basic Managerial Skills" },
    { value: "Change Management", label: "Change Management" },
    { value: "Developing a High Performance Team", label: "Developing a High Performance Team" },
    { value: "Leadership 101", label: "Leadership 101" },
    { value: "Transformational Leadership", label: "Transformational Leadership" },
    { value: "Executive Leadership and Decision making", label: "Executive Leadership and Decision making" },
    { value: "Coaching and Mentoring", label: "Coaching and Mentoring" },
    { value: "Emotional Intelligence", label: "Emotional Intelligence" },
    { value: "Ethical Leadership", label: "Ethical Leadership" },
    { value: "Management Succession Training", label: "Management Succession Training" },
    { value: "Positive Attitude/Motivational trainings", label: "Positive Attitude/Motivational trainings" },
    { value: "Supervisory Management", label: "Supervisory Management" },
    { value: "Time Management", label: "Time Management" },
    { value: "Strategic Leadership", label: "Strategic Leadership" }
  ],

  "Financial Skills": [
    { label: "Basic Monetary Policy Instrument and Operation", value: "Basic Monetary Policy Instrument and Operation" },  
    { label: "Credit analysis", value: "Credit analysis" },  
    { label: "Fundamentals of credit Appraisal", value: "Fundamentals of credit Appraisal" },  
    { label: "Credit Management", value: "Credit Management" },  
    { label: "Credit Risk Management", value: "Credit Risk Management" },  
    { label: "Financial Analysis", value: "Financial Analysis" },  
    { label: "Financial Statement Analysis and Tools", value: "Financial Statement Analysis and Tools" },  
    { label: "Financial Accounting", value: "Financial Accounting" },  
    { label: "Financial Management", value: "Financial Management" },  
    { label: "Industry and product knowledge", value: "Industry and product knowledge" },  
    { label: "Interest Free Banking", value: "Interest Free Banking" },  
    { label: "Loan Work Out Overview", value: "Loan Work Out Overview" },  
    { label: "Market Bonds FX and Derivates", value: "Market Bonds FX and Derivates" },  
    { label: "Foreclosure & Loan Workout Procedure", value: "Foreclosure & Loan Workout Procedure" },  
      { label: "Treasury and Cash Management", value: "Treasury and Cash Management" }
  ],

  "Business Skills": [
    { value: 'Business Analytics', label: 'Business Analytics' },  
    { value: 'Business Intelligence and Analytics tools', label: 'Business Intelligence and Analytics tools' },  
    { value: 'Bussiness Development', label: 'Bussiness Development' },  
    { value: 'Competitive Analysis Tools In banking Industry', label: 'Competitive Analysis Tools In banking Industry' },  
    { value: 'Enterprise Risk Management', label: 'Enterprise Risk Management' },  
    { value: 'Logistic Management', label: 'Logistic Management' },  
    { value: 'Marketing & Sales Skill', label: 'Marketing & Sales Skill' },  
    { value: 'Product and Service Development in Banking and Process Innovation in Banking', label: 'Product and Service Development in Banking and Process Innovation in Banking' },  
    { value: 'Product Knowledge', label: 'Product Knowledge' },  
    { value: 'Project Design Planning and Analysis', label: 'Project Design Planning and Analysis' },  
    { value: 'Project Planinig and Proposal Writing', label: 'Project Planinig and Proposal Writing' },  
    { value: 'Promotion and advertising in Marketing', label: 'Promotion and advertising in Marketing' },  
    { value: 'Quality Assurance', label: 'Quality Assurance' },  
    { value: 'Strategic Marketing Management', label: 'Strategic Marketing Management' },  
    { value: 'Strategic Partnership Management', label: 'Strategic Partnership Management' },  
    { value: 'Strategic performance evaluation and review techniques', label: 'Strategic performance evaluation and review techniques' },  
    { value: 'Strategic Planning & Management', label: 'Strategic Planning & Management' },  
    { value: 'Strategic Project Management', label: 'Strategic Project Management' },  
    { value: 'Strategic Thinking', label: 'Strategic Thinking' },  
    { value: 'Successful Negotiation Management', label: 'Successful Negotiation Management' },  
    { value: 'Supply Chain Management', label: 'Supply Chain Management' }
  ],

  "IT and Technical Skills": [
    { value: "Data Analytics Tool", label: "Data Analytics Tool" },  
    { value: "Database management", label: "Database management" },  
    { value: "Digital Banking", label: "Digital Banking" },  
    { value: "Finacle Core Banking advanced technical training", label: "Finacle Core Banking advanced technical training" },  
    { value: "Existing and newly implemented System Trainings by Internal IT staffs", label: "Existing and newly implemented System Trainings by Internal IT staffs" },  
    { value: "Advanced graphic design and illustration", label: "Advanced graphic design and illustration" }
  ],
};

export const sampleTraining = [
  createTrainings(
    "Nigus Solomon",
    "nigus.solomon@mks.com",
    "Software Engineering"
  ),
  createTrainings(
    "Hemen Solomon",
    "hemen.solomon@mks.com",
    "Software Engineering"
  ),
  createTrainings(
    "Hawani Hashim",
    "hawani.hashim@mks.com",
    "Software Engineering"
  ),
];
