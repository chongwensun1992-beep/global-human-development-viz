# HDI Dashboard (Dash + Plotly)

An interactive dashboard for exploring global human development indicators, including education, health, and overall development, built with **Dash** and **Plotly**.

This project is designed as a **single-page, full-screen dashboard** with responsive layout, dynamic filtering, and explanatory visualizations.

---

## 📊 Features

- **Single-page (100vh) dashboard**
  - All charts visible at once
  - No page scrolling
  - Left / center / right panels aligned in height

- **Interactive filters**
  - Metric selection (e.g. Expected Years of Schooling, Life Expectancy)
  - Year slider
  - UNDP Region & Human Development Group filters
  - Trend country selection (1–6 recommended)

- **Visualizations**
  - **Top Countries (Bar Chart)**  
    Compare countries by a selected metric in a given year
  - **Scatter Plot**  
    Explore relationships between two development indicators (e.g. HDI vs Life Expectancy)
  - **Trend Line Chart**  
    Track metric changes over time for selected countries

- **Dynamic legend & help panel**
  - Automatically reflects current filters
  - Shows fallback behavior when filters yield no data
  - Provides usage tips for interpretation

- **Collapsible sidebar**
  - Toggle button always visible
  - Sidebar can be collapsed to maximize visualization space

---

## 🧠 Design Rationale

- **Scatter plot** is included to reveal cross-metric relationships that cannot be observed from rankings or time-series alone.
- **Fallback logic** ensures charts never render empty, improving robustness and user experience.
- **Mode bar hidden** to reduce visual noise; interaction is driven through filters instead.
- **Responsive layout** ensures usability across different screen sizes.

---

## 🗂 Project Structure

```text
.
├── app.py # Main Dash application entry point
│
├── data/ # Data directory
│ ├── raw/ # Original raw data (unchanged)
│ │ ├── dataset.csv # Raw HDI dataset
│ │ └── data_check.py # Data validation and sanity checks
│ │
│ └── processed/ # Processed and cleaned data
│ ├── cleaned.csv # Cleaned dataset used by the Dash app
│ └── data_process.py # Data cleaning and preprocessing script
│
├── doc/ # Project documentation by milestone
│ ├── milestone_1/ # Milestone 1 deliverables
│ ├── milestone_2/ # Milestone 2 deliverables
│ ├── milestone_3/ # Milestone 3 deliverables
│ └── milestone_4/ # Milestone 4 deliverables
│
├── src/ # Source code directory
│ └── app.py # Dash application logic (if separated)
│
├── README.md # Project overview and instructions
├── LICENSE.md # Project license
├── .gitignore # Git ignore rules
├── Procfile # Deployment configuration (e.g., Render/Heroku)
├── render.yaml # Render deployment settings
├── requirements.txt # Python dependencies
└── runtime.txt # Python runtime version
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
https://github.com/chongwensun1992-beep/global-human-development-viz.git
cd global-human-development-viz
```
### 2. Install dependencies
```bash
pip install -r requirements.txt
```
### 3. Run the application
```bash
python app.py
```
### 4. Open in browser
Navigate to `http://127.0.0.1:8050/`
to view the dashboard.
---
## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
## 📧 Authors
Chongwen Sun |
*Master of Data Science, UBC Okanagan*