// Sample human development data for various countries (2023 estimates)
const humanDevelopmentData = [
    {
        country: "Norway",
        region: "Europe",
        hdi: 0.961,
        lifeExpectancy: 83.2,
        gdpPerCapita: 89202,
        education: 0.953,
        year: 2023
    },
    {
        country: "Switzerland",
        region: "Europe",
        hdi: 0.955,
        lifeExpectancy: 83.8,
        gdpPerCapita: 92101,
        education: 0.946,
        year: 2023
    },
    {
        country: "Australia",
        region: "Oceania",
        hdi: 0.951,
        lifeExpectancy: 83.3,
        gdpPerCapita: 58824,
        education: 0.948,
        year: 2023
    },
    {
        country: "Germany",
        region: "Europe",
        hdi: 0.947,
        lifeExpectancy: 81.3,
        gdpPerCapita: 54076,
        education: 0.946,
        year: 2023
    },
    {
        country: "Singapore",
        region: "Asia",
        hdi: 0.939,
        lifeExpectancy: 83.6,
        gdpPerCapita: 72794,
        education: 0.932,
        year: 2023
    },
    {
        country: "United States",
        region: "Americas",
        hdi: 0.921,
        lifeExpectancy: 78.9,
        gdpPerCapita: 69288,
        education: 0.927,
        year: 2023
    },
    {
        country: "Canada",
        region: "Americas",
        hdi: 0.936,
        lifeExpectancy: 82.7,
        gdpPerCapita: 52051,
        education: 0.938,
        year: 2023
    },
    {
        country: "Japan",
        region: "Asia",
        hdi: 0.925,
        lifeExpectancy: 84.8,
        gdpPerCapita: 42940,
        education: 0.919,
        year: 2023
    },
    {
        country: "United Kingdom",
        region: "Europe",
        hdi: 0.929,
        lifeExpectancy: 81.3,
        gdpPerCapita: 46344,
        education: 0.931,
        year: 2023
    },
    {
        country: "South Korea",
        region: "Asia",
        hdi: 0.925,
        lifeExpectancy: 83.6,
        gdpPerCapita: 44292,
        education: 0.922,
        year: 2023
    },
    {
        country: "France",
        region: "Europe",
        hdi: 0.903,
        lifeExpectancy: 82.7,
        gdpPerCapita: 44852,
        education: 0.896,
        year: 2023
    },
    {
        country: "Spain",
        region: "Europe",
        hdi: 0.905,
        lifeExpectancy: 83.6,
        gdpPerCapita: 40139,
        education: 0.901,
        year: 2023
    },
    {
        country: "Italy",
        region: "Europe",
        hdi: 0.895,
        lifeExpectancy: 83.5,
        gdpPerCapita: 42840,
        education: 0.887,
        year: 2023
    },
    {
        country: "China",
        region: "Asia",
        hdi: 0.768,
        lifeExpectancy: 78.2,
        gdpPerCapita: 12556,
        education: 0.752,
        year: 2023
    },
    {
        country: "Brazil",
        region: "Americas",
        hdi: 0.760,
        lifeExpectancy: 75.9,
        gdpPerCapita: 9673,
        education: 0.756,
        year: 2023
    },
    {
        country: "Russia",
        region: "Europe",
        hdi: 0.822,
        lifeExpectancy: 72.6,
        gdpPerCapita: 14665,
        education: 0.838,
        year: 2023
    },
    {
        country: "Mexico",
        region: "Americas",
        hdi: 0.758,
        lifeExpectancy: 75.1,
        gdpPerCapita: 10045,
        education: 0.750,
        year: 2023
    },
    {
        country: "India",
        region: "Asia",
        hdi: 0.633,
        lifeExpectancy: 70.4,
        gdpPerCapita: 2277,
        education: 0.611,
        year: 2023
    },
    {
        country: "South Africa",
        region: "Africa",
        hdi: 0.713,
        lifeExpectancy: 64.1,
        gdpPerCapita: 7055,
        education: 0.723,
        year: 2023
    },
    {
        country: "Egypt",
        region: "Africa",
        hdi: 0.731,
        lifeExpectancy: 72.0,
        gdpPerCapita: 4295,
        education: 0.721,
        year: 2023
    },
    {
        country: "Nigeria",
        region: "Africa",
        hdi: 0.535,
        lifeExpectancy: 54.7,
        gdpPerCapita: 2432,
        education: 0.520,
        year: 2023
    },
    {
        country: "Kenya",
        region: "Africa",
        hdi: 0.575,
        lifeExpectancy: 67.5,
        gdpPerCapita: 2081,
        education: 0.558,
        year: 2023
    },
    {
        country: "Ethiopia",
        region: "Africa",
        hdi: 0.498,
        lifeExpectancy: 66.6,
        gdpPerCapita: 1020,
        education: 0.468,
        year: 2023
    },
    {
        country: "Argentina",
        region: "Americas",
        hdi: 0.842,
        lifeExpectancy: 76.7,
        gdpPerCapita: 10636,
        education: 0.851,
        year: 2023
    },
    {
        country: "Chile",
        region: "Americas",
        hdi: 0.855,
        lifeExpectancy: 80.2,
        gdpPerCapita: 15923,
        education: 0.858,
        year: 2023
    },
    {
        country: "Turkey",
        region: "Asia",
        hdi: 0.838,
        lifeExpectancy: 77.7,
        gdpPerCapita: 10655,
        education: 0.839,
        year: 2023
    },
    {
        country: "Saudi Arabia",
        region: "Asia",
        hdi: 0.875,
        lifeExpectancy: 76.9,
        gdpPerCapita: 23186,
        education: 0.873,
        year: 2023
    },
    {
        country: "Thailand",
        region: "Asia",
        hdi: 0.800,
        lifeExpectancy: 79.1,
        gdpPerCapita: 7189,
        education: 0.791,
        year: 2023
    },
    {
        country: "Malaysia",
        region: "Asia",
        hdi: 0.803,
        lifeExpectancy: 76.2,
        gdpPerCapita: 11993,
        education: 0.799,
        year: 2023
    },
    {
        country: "Vietnam",
        region: "Asia",
        hdi: 0.726,
        lifeExpectancy: 75.4,
        gdpPerCapita: 4163,
        education: 0.709,
        year: 2023
    },
    {
        country: "Philippines",
        region: "Asia",
        hdi: 0.710,
        lifeExpectancy: 71.2,
        gdpPerCapita: 3485,
        education: 0.702,
        year: 2023
    },
    {
        country: "Indonesia",
        region: "Asia",
        hdi: 0.713,
        lifeExpectancy: 71.7,
        gdpPerCapita: 4357,
        education: 0.699,
        year: 2023
    },
    {
        country: "Bangladesh",
        region: "Asia",
        hdi: 0.661,
        lifeExpectancy: 72.6,
        gdpPerCapita: 2457,
        education: 0.633,
        year: 2023
    },
    {
        country: "Pakistan",
        region: "Asia",
        hdi: 0.544,
        lifeExpectancy: 67.3,
        gdpPerCapita: 1594,
        education: 0.521,
        year: 2023
    },
    {
        country: "Morocco",
        region: "Africa",
        hdi: 0.683,
        lifeExpectancy: 76.9,
        gdpPerCapita: 3795,
        education: 0.655,
        year: 2023
    },
    {
        country: "Peru",
        region: "Americas",
        hdi: 0.762,
        lifeExpectancy: 76.7,
        gdpPerCapita: 7002,
        education: 0.757,
        year: 2023
    },
    {
        country: "Colombia",
        region: "Americas",
        hdi: 0.767,
        lifeExpectancy: 77.3,
        gdpPerCapita: 6651,
        education: 0.763,
        year: 2023
    },
    {
        country: "New Zealand",
        region: "Oceania",
        hdi: 0.937,
        lifeExpectancy: 82.5,
        gdpPerCapita: 48781,
        education: 0.934,
        year: 2023
    },
    {
        country: "Sweden",
        region: "Europe",
        hdi: 0.945,
        lifeExpectancy: 82.8,
        gdpPerCapita: 60239,
        education: 0.942,
        year: 2023
    },
    {
        country: "Denmark",
        region: "Europe",
        hdi: 0.948,
        lifeExpectancy: 81.4,
        gdpPerCapita: 68300,
        education: 0.946,
        year: 2023
    }
];
