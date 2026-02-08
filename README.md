# Global Human Development Visualization

An interactive web-based visualization platform for exploring and comparing global human development indicators across countries and regions.

## Overview

This project provides an intuitive interface to visualize and analyze the Human Development Index (HDI) and related metrics including life expectancy, GDP per capita, and education indices. The visualization helps users understand global development patterns, regional differences, and country-specific achievements.

## Features

### Interactive Visualizations
- **Country Rankings Bar Chart**: View top countries ranked by selected metrics
- **HDI vs GDP Scatter Plot**: Explore the relationship between economic wealth and human development
- **Regional Comparison**: Compare average development indicators across continents
- **Dynamic Data Table**: Sortable table with comprehensive country statistics

### Interactive Controls
- **Year Slider**: Navigate through historical data (2010-2023)
- **Region Filter**: Focus on specific geographical regions (Africa, Asia, Europe, Americas, Oceania)
- **Metric Selector**: Switch between HDI, Life Expectancy, GDP per Capita, and Education Index

### Data Insights
- Color-coded HDI categories (Very High, High, Medium, Low)
- Real-time filtering and sorting
- Responsive design for desktop and mobile devices
- Detailed tooltips and country information

## Human Development Index

The Human Development Index (HDI) is a composite statistic that measures average achievement in three basic dimensions of human development:

1. **Long and healthy life** - Life expectancy at birth
2. **Knowledge** - Expected and mean years of schooling  
3. **Decent standard of living** - Gross National Income (GNI) per capita

### HDI Categories
- **Very High HDI**: ≥ 0.800
- **High HDI**: 0.700 - 0.799
- **Medium HDI**: 0.550 - 0.699
- **Low HDI**: < 0.550

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No additional installations required

### Running the Visualization

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Explore the interactive visualizations using the control panel

```bash
# If using a local server (recommended)
python -m http.server 8000
# or
npx serve
```

Then navigate to `http://localhost:8000` in your browser.

## Project Structure

```
global-human-development-viz/
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── app.js              # Application logic and visualization code
├── data.js             # Human development dataset
└── README.md           # Project documentation
```

## Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling, layouts, and responsive design
- **JavaScript (ES6+)** - Application logic and interactivity
- **D3.js v7** - Data visualization library
- **Plotly.js** - Interactive charting library

## Data Source

The data presented in this visualization is based on estimates from the United Nations Development Programme (UNDP) Human Development Reports. The dataset includes:

- 40+ countries representing all major regions
- Key metrics: HDI, Life Expectancy, GDP per Capita, Education Index
- Current data year: 2023

**Note**: This is a demonstration project with sample data for educational purposes. For official HDI statistics, please refer to the [UNDP Human Development Reports](https://hdr.undp.org/).

## Future Enhancements

Potential features for future development:
- Historical trend analysis with time-series charts
- Country-to-country comparison tool
- Interactive world map visualization
- Data export functionality (CSV, JSON)
- Additional indicators (inequality-adjusted HDI, gender development index)
- Integration with live UNDP API data
- Predictive analytics and forecasting

## Contributing

Contributions are welcome! If you'd like to improve the visualization or add new features:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available for educational purposes.

## Acknowledgments

- United Nations Development Programme (UNDP) for HDI methodology and data
- D3.js and Plotly.js communities for excellent visualization libraries
- All contributors to open data initiatives in global development

## Contact

For questions, suggestions, or feedback, please open an issue in this repository.

---

**Disclaimer**: This visualization is created for educational and demonstration purposes. While efforts have been made to ensure data accuracy, users should refer to official UNDP sources for authoritative HDI statistics and research.
