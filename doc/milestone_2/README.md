# HDI Dashboard – Interactive Visualization of Global Human Development

## Overview
This project is an interactive dashboard developed for DATA 551, designed to support the exploration and communication of global human development indicators. The dashboard allows users to visually analyze differences and trends in development metrics across countries, regions, and time.

The app is intended for students, researchers, and policy-oriented audiences who want an accessible way to explore global development data without requiring advanced technical expertise.

---

## What the Dashboard Can Do
The dashboard provides several interactive visualizations:
- **Bar chart** showing top countries for a selected development metric in a given year
- **Scatter plot** comparing two development indicators across countries
- **Line chart** displaying longitudinal trends for selected countries

Users can interact with the dashboard by:
- Selecting development metrics and years
- Filtering by UNDP region and human development group
- Comparing multiple countries over time
- Exploring relationships between indicators through scatter plots

The interface is designed to be self-documenting, with clear titles, labels, and legends.

---

## Live App
> Deployment link will be added here once finalized.

(For Milestone 2, the dashboard is fully functional locally and ready for deployment.)

---

## Project Structure

```text
project/
├── data/
│ ├── raw/
│ └── processed/
├── src/
│ └── app.py
├── doc/
│ ├── proposal.md
│ └── reflection-milestone2.md
├── reports/
├── README.md
├── LICENSE.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
└── requirements.txt
```

## Running the App Locally

### 1. Clone the repository
```bash
git clone https://github.com/UBC-MDS/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```
### 3. Run the application
```bash
python src/app.py
``` 
### Then open your browser and navigate to:
```text
http://127.0.0.1:8050/
``` 
## Deployment
The dashboard is designed to be deployable on platforms such as Heroku or Render.
A public deployment link will be added here once finalized.

## Contributing
The dashboard is designed to be deployable on platforms such as Heroku or Render.
A public deployment link will be added here once finalized.

## License
This project is licensed under the MIT License. See LICENSE.md for details.