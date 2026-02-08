// Main application logic
let currentYear = 2023;
let currentRegion = 'all';
let currentMetric = 'hdi';
let filteredData = [...humanDevelopmentData];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateVisualizations();
});

// Setup event listeners
function setupEventListeners() {
    const yearSlider = document.getElementById('year-slider');
    const yearDisplay = document.getElementById('year-display');
    const regionFilter = document.getElementById('region-filter');
    const metricSelect = document.getElementById('metric-select');

    yearSlider.addEventListener('input', function() {
        currentYear = parseInt(this.value);
        yearDisplay.textContent = currentYear;
        updateVisualizations();
    });

    regionFilter.addEventListener('change', function() {
        currentRegion = this.value;
        updateVisualizations();
    });

    metricSelect.addEventListener('change', function() {
        currentMetric = this.value;
        updateVisualizations();
    });
}

// Filter data based on current selections
function filterData() {
    filteredData = humanDevelopmentData.filter(country => {
        if (currentRegion !== 'all' && country.region !== currentRegion) {
            return false;
        }
        return true;
    });
    
    // Sort by current metric
    filteredData.sort((a, b) => b[currentMetric] - a[currentMetric]);
}

// Update all visualizations
function updateVisualizations() {
    filterData();
    createBarChart();
    createScatterPlot();
    createRegionalChart();
    updateTable();
}

// Create bar chart for country rankings
function createBarChart() {
    const top20 = filteredData.slice(0, 20);
    
    const metricNames = {
        hdi: 'HDI',
        lifeExpectancy: 'Life Expectancy (years)',
        gdpPerCapita: 'GDP per Capita (USD)',
        education: 'Education Index'
    };

    const trace = {
        x: top20.map(d => d[currentMetric]),
        y: top20.map(d => d.country),
        type: 'bar',
        orientation: 'h',
        marker: {
            color: top20.map(d => {
                if (currentMetric === 'hdi' || currentMetric === 'education') {
                    if (d[currentMetric] >= 0.8) return '#10b981';
                    if (d[currentMetric] >= 0.7) return '#3b82f6';
                    if (d[currentMetric] >= 0.55) return '#f59e0b';
                    return '#ef4444';
                }
                return '#667eea';
            }),
            line: {
                color: '#555',
                width: 1
            }
        }
    };

    const layout = {
        title: `Top 20 Countries by ${metricNames[currentMetric]}`,
        xaxis: {
            title: metricNames[currentMetric]
        },
        yaxis: {
            autorange: 'reversed'
        },
        margin: {
            l: 150,
            r: 50,
            t: 50,
            b: 50
        },
        height: 600
    };

    Plotly.newPlot('bar-chart', [trace], layout, {responsive: true});
}

// Create scatter plot for HDI vs GDP
function createScatterPlot() {
    const regions = [...new Set(filteredData.map(d => d.region))];
    const colors = {
        'Africa': '#ef4444',
        'Asia': '#f59e0b',
        'Europe': '#3b82f6',
        'Americas': '#10b981',
        'Oceania': '#8b5cf6'
    };

    const traces = regions.map(region => {
        const regionData = filteredData.filter(d => d.region === region);
        return {
            x: regionData.map(d => d.gdpPerCapita),
            y: regionData.map(d => d.hdi),
            mode: 'markers',
            type: 'scatter',
            name: region,
            text: regionData.map(d => d.country),
            marker: {
                size: 10,
                color: colors[region],
                line: {
                    color: 'white',
                    width: 1
                }
            }
        };
    });

    const layout = {
        title: 'Human Development Index vs GDP per Capita',
        xaxis: {
            title: 'GDP per Capita (USD)',
            type: 'log'
        },
        yaxis: {
            title: 'Human Development Index'
        },
        hovermode: 'closest',
        showlegend: true,
        height: 500
    };

    Plotly.newPlot('scatter-plot', traces, layout, {responsive: true});
}

// Create regional comparison chart
function createRegionalChart() {
    const regions = ['Africa', 'Asia', 'Europe', 'Americas', 'Oceania'];
    
    const regionalAverages = regions.map(region => {
        const regionData = humanDevelopmentData.filter(d => d.region === region);
        const avgHDI = regionData.reduce((sum, d) => sum + d.hdi, 0) / regionData.length;
        const avgLife = regionData.reduce((sum, d) => sum + d.lifeExpectancy, 0) / regionData.length;
        const avgGDP = regionData.reduce((sum, d) => sum + d.gdpPerCapita, 0) / regionData.length;
        const avgEdu = regionData.reduce((sum, d) => sum + d.education, 0) / regionData.length;
        
        return {
            region,
            hdi: avgHDI,
            lifeExpectancy: avgLife,
            gdpPerCapita: avgGDP,
            education: avgEdu
        };
    });

    const trace1 = {
        x: regions,
        y: regionalAverages.map(d => d.hdi),
        name: 'HDI',
        type: 'bar',
        marker: { color: '#667eea' }
    };

    const trace2 = {
        x: regions,
        y: regionalAverages.map(d => d.education),
        name: 'Education Index',
        type: 'bar',
        marker: { color: '#10b981' }
    };

    const layout = {
        title: 'Average HDI and Education Index by Region',
        barmode: 'group',
        yaxis: {
            title: 'Index Value',
            range: [0, 1]
        },
        xaxis: {
            title: 'Region'
        },
        height: 500
    };

    Plotly.newPlot('regional-chart', [trace1, trace2], layout, {responsive: true});
}

// Update data table
function updateTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    filteredData.forEach((country, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${country.country}</strong></td>
            <td>${country.hdi.toFixed(3)}</td>
            <td>${country.lifeExpectancy.toFixed(1)}</td>
            <td>$${country.gdpPerCapita.toLocaleString()}</td>
            <td>${country.education.toFixed(3)}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Utility function to get HDI category
function getHDICategory(hdi) {
    if (hdi >= 0.8) return 'Very High';
    if (hdi >= 0.7) return 'High';
    if (hdi >= 0.55) return 'Medium';
    return 'Low';
}

// Utility function to get color based on HDI
function getHDIColor(hdi) {
    if (hdi >= 0.8) return '#10b981';
    if (hdi >= 0.7) return '#3b82f6';
    if (hdi >= 0.55) return '#f59e0b';
    return '#ef4444';
}
