// Main application logic
let currentYear = 2023;
let currentRegion = 'all';
let currentMetric = 'hdi';
let filteredData = [...humanDevelopmentData];
let searchQuery = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateVisualizations();
    updateStatistics();
});

// Setup event listeners
function setupEventListeners() {
    const yearSlider = document.getElementById('year-slider');
    const yearDisplay = document.getElementById('year-display');
    const regionFilter = document.getElementById('region-filter');
    const metricSelect = document.getElementById('metric-select');
    const searchBox = document.getElementById('search-box');

    yearSlider.addEventListener('input', function() {
        currentYear = parseInt(this.value);
        yearDisplay.textContent = currentYear;
        // Note: Year filtering is currently non-functional as the dataset only contains 2023 data
        // This slider is included for future implementation when historical data is added
        updateVisualizations();
        updateStatistics();
    });

    regionFilter.addEventListener('change', function() {
        currentRegion = this.value;
        updateVisualizations();
        updateStatistics();
    });

    metricSelect.addEventListener('change', function() {
        currentMetric = this.value;
        updateVisualizations();
    });

    searchBox.addEventListener('input', function() {
        searchQuery = this.value.toLowerCase();
        updateTable();
    });
}

// Filter data based on current selections
function filterData() {
    filteredData = humanDevelopmentData.filter(country => {
        if (currentRegion !== 'all' && country.region !== currentRegion) {
            return false;
        }
        if (searchQuery && !country.country.toLowerCase().includes(searchQuery)) {
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
    createRegionalChart();
    updateTable();
}

// Update statistics
function updateStatistics() {
    filterData();
    
    const totalCountries = filteredData.length;
    const avgHDI = filteredData.reduce((sum, d) => sum + d.hdi, 0) / totalCountries;
    const avgLife = filteredData.reduce((sum, d) => sum + d.lifeExpectancy, 0) / totalCountries;
    const avgGDP = filteredData.reduce((sum, d) => sum + d.gdpPerCapita, 0) / totalCountries;
    
    document.getElementById('total-countries').textContent = totalCountries;
    document.getElementById('avg-hdi').textContent = avgHDI.toFixed(3);
    document.getElementById('avg-life').textContent = avgLife.toFixed(1);
    document.getElementById('avg-gdp').textContent = '$' + Math.round(avgGDP).toLocaleString();
}

// Create bar chart for country rankings
function createBarChart() {
    const top15 = filteredData.slice(0, 15);
    
    const metricNames = {
        hdi: 'HDI',
        lifeExpectancy: 'Life Expectancy (years)',
        gdpPerCapita: 'GDP per Capita (USD)',
        education: 'Education Index'
    };

    const chartContainer = document.getElementById('bar-chart');
    chartContainer.innerHTML = '';
    
    if (top15.length === 0) {
        chartContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">No data available for the selected filters.</p>';
        return;
    }
    
    // Find max value for scaling
    const maxValue = Math.max(...top15.map(d => d[currentMetric]));
    
    top15.forEach((country, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        
        const label = document.createElement('span');
        label.className = 'bar-label';
        label.textContent = country.country;
        
        const barContainer = document.createElement('div');
        barContainer.className = 'bar-container';
        
        const barFill = document.createElement('div');
        barFill.className = 'bar-fill';
        
        const value = country[currentMetric];
        const percentage = (value / maxValue) * 100;
        
        barFill.style.width = percentage + '%';
        barFill.style.backgroundColor = getColorForMetric(value, currentMetric);
        
        const barValue = document.createElement('span');
        barValue.className = 'bar-value';
        if (currentMetric === 'gdpPerCapita') {
            barValue.textContent = '$' + value.toLocaleString();
        } else {
            barValue.textContent = value.toFixed(currentMetric === 'lifeExpectancy' ? 1 : 3);
        }
        
        barContainer.appendChild(barFill);
        bar.appendChild(label);
        bar.appendChild(barContainer);
        bar.appendChild(barValue);
        
        chartContainer.appendChild(bar);
    });
}

// Create regional comparison chart
function createRegionalChart() {
    const regions = ['Africa', 'Asia', 'Europe', 'Americas', 'Oceania'];
    
    const regionalAverages = regions.map(region => {
        const regionData = humanDevelopmentData.filter(d => d.region === region);
        if (regionData.length === 0) return { region, hdi: 0, education: 0 };
        
        const avgHDI = regionData.reduce((sum, d) => sum + d.hdi, 0) / regionData.length;
        const avgEdu = regionData.reduce((sum, d) => sum + d.education, 0) / regionData.length;
        
        return {
            region,
            hdi: avgHDI,
            education: avgEdu
        };
    });

    const chartContainer = document.getElementById('regional-chart');
    chartContainer.innerHTML = '';
    
    const barsContainer = document.createElement('div');
    barsContainer.className = 'regional-bars';
    
    const maxValue = 1; // HDI and education are 0-1 scale
    
    regionalAverages.forEach(data => {
        const barGroup = document.createElement('div');
        barGroup.className = 'regional-bar-group';
        
        const barPair = document.createElement('div');
        barPair.className = 'bar-pair';
        
        // HDI bar
        const hdiBar = document.createElement('div');
        hdiBar.className = 'regional-bar';
        const hdiHeight = (data.hdi / maxValue) * 300;
        hdiBar.style.height = hdiHeight + 'px';
        hdiBar.style.backgroundColor = '#667eea';
        hdiBar.title = `HDI: ${data.hdi.toFixed(3)}`;
        
        // Education bar
        const eduBar = document.createElement('div');
        eduBar.className = 'regional-bar';
        const eduHeight = (data.education / maxValue) * 300;
        eduBar.style.height = eduHeight + 'px';
        eduBar.style.backgroundColor = '#10b981';
        eduBar.title = `Education: ${data.education.toFixed(3)}`;
        
        barPair.appendChild(hdiBar);
        barPair.appendChild(eduBar);
        
        const label = document.createElement('div');
        label.className = 'regional-bar-label';
        label.textContent = data.region;
        
        barGroup.appendChild(barPair);
        barGroup.appendChild(label);
        
        barsContainer.appendChild(barGroup);
    });
    
    chartContainer.appendChild(barsContainer);
    
    // Add legend
    const legend = document.createElement('div');
    legend.style.display = 'flex';
    legend.style.justifyContent = 'center';
    legend.style.gap = '2rem';
    legend.style.marginTop = '1rem';
    
    const hdiLegend = document.createElement('div');
    hdiLegend.innerHTML = '<span style="display:inline-block;width:20px;height:20px;background:#667eea;vertical-align:middle;margin-right:5px;border-radius:3px;"></span><span>HDI</span>';
    
    const eduLegend = document.createElement('div');
    eduLegend.innerHTML = '<span style="display:inline-block;width:20px;height:20px;background:#10b981;vertical-align:middle;margin-right:5px;border-radius:3px;"></span><span>Education Index</span>';
    
    legend.appendChild(hdiLegend);
    legend.appendChild(eduLegend);
    
    chartContainer.appendChild(legend);
}

// Update data table
function updateTable() {
    // Refilter data with search query
    filteredData = humanDevelopmentData.filter(country => {
        if (currentRegion !== 'all' && country.region !== currentRegion) {
            return false;
        }
        if (searchQuery && !country.country.toLowerCase().includes(searchQuery)) {
            return false;
        }
        return true;
    });
    
    // Sort by current metric
    filteredData.sort((a, b) => b[currentMetric] - a[currentMetric]);
    
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    if (filteredData.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="7" style="text-align:center;color:#999;padding:2rem;">No countries found matching your criteria.</td>';
        tableBody.appendChild(row);
        return;
    }

    filteredData.forEach((country, index) => {
        const row = document.createElement('tr');
        
        const hdiColor = getColorForMetric(country.hdi, 'hdi');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${country.country}</strong></td>
            <td><span style="padding:0.2rem 0.6rem;border-radius:4px;background:${getRegionColor(country.region)};color:white;font-size:0.85rem;">${country.region}</span></td>
            <td><strong style="color:${hdiColor}">${country.hdi.toFixed(3)}</strong></td>
            <td>${country.lifeExpectancy.toFixed(1)} years</td>
            <td>$${country.gdpPerCapita.toLocaleString()}</td>
            <td>${country.education.toFixed(3)}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Utility function to get color based on metric value
function getColorForMetric(value, metric) {
    if (metric === 'hdi' || metric === 'education') {
        if (value >= 0.8) return '#10b981';
        if (value >= 0.7) return '#3b82f6';
        if (value >= 0.55) return '#f59e0b';
        return '#ef4444';
    }
    return '#667eea';
}

// Utility function to get region color
function getRegionColor(region) {
    const colors = {
        'Africa': '#ef4444',
        'Asia': '#f59e0b',
        'Europe': '#3b82f6',
        'Americas': '#10b981',
        'Oceania': '#8b5cf6'
    };
    return colors[region] || '#667eea';
}

// Utility function to get HDI category
function getHDICategory(hdi) {
    if (hdi >= 0.8) return 'Very High';
    if (hdi >= 0.7) return 'High';
    if (hdi >= 0.55) return 'Medium';
    return 'Low';
}
