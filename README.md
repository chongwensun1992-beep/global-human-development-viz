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
├── app.py                 # Main Dash application
├── data/
│   └── processed/
│       └── cleaned.csv    # Preprocessed HDI dataset
├── README.md
├── LICENSE.md
├── .gitignore
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/hdi-dashboard.git
cd hdi-dashboard
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