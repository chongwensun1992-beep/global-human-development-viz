# Milestone 2 Reflection

## Implemented Features

At this stage, we have implemented a functional prototype of our dashboard that reflects the core design outlined in our proposal. The app is built using Python and Dash and focuses on interactive exploration of global human development indicators.

The current dashboard includes three main visual components:
1. A horizontal bar chart displaying the top countries for a selected development metric in a given year.
2. A scatter plot comparing two user-selected development indicators for the same year.
3. A line chart showing temporal trends of a selected metric for multiple countries.

The interface supports interactive filtering through a collapsible sidebar, allowing users to select metrics, years, regions, development groups, and countries of interest. The dashboard is designed to be full-screen, with a three-column layout (filters, visualizations, and legend/help panel) to improve usability and clarity. All plots include appropriate titles, labels, and hover tooltips to support self-documentation.

## Features Not Yet Implemented

Some features proposed in the initial design are not yet implemented. For example, we have not added advanced explanatory annotations or narrative guidance for novice users. The current version also does not include user authentication, data download functionality, or advanced customization options such as saving user-selected views.

In addition, the app currently focuses on desktop full-screen usage and has not been optimized for mobile or small-screen devices.

## Known Limitations

While the app is functional, there are several known limitations. Some filters may lead to sparse data selections, which are handled via fallback logic but may still reduce interpretability for users unfamiliar with the dataset. Visual encodings such as color schemes and axis scaling may require further refinement to improve accessibility and consistency across plots.

The deployed version prioritizes stability and usability over visual polish at this stage.

## Future Improvements

In future milestones, we plan to incorporate feedback from users and TAs to refine the layout and improve visual clarity. Planned improvements include enhancing legends and annotations, refining color and scale choices, improving responsiveness, and adding additional contextual explanations to guide interpretation. We also plan to further align the dashboard with our target audience’s needs by simplifying interactions and improving overall storytelling.
