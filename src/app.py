# src/app.py
import os
from pathlib import Path

import pandas as pd
import numpy as np

from dash import Dash, dcc, html, Input, Output, State
import plotly.express as px

# -----------------------------
# Paths (deployment-safe)
# -----------------------------
# src/app.py -> BASE_DIR = .../src
BASE_DIR = Path(__file__).resolve().parent
# data/processed/cleaned.csv relative to project root
DATA_PATH = BASE_DIR.parent / "data" / "processed" / "cleaned.csv"

# -----------------------------
# Load & normalize data shape
# -----------------------------
df_raw = pd.read_csv(DATA_PATH)

def normalize(df: pd.DataFrame) -> pd.DataFrame:
    cols = {c.lower(): c for c in df.columns}

    country_col = cols.get("country", None)
    year_col = cols.get("year", None)
    metric_col = cols.get("metric", None)
    value_col = cols.get("value", None)

    region_col = None
    group_col = None
    for c in df.columns:
        cl = c.lower()
        if "undp" in cl and "region" in cl:
            region_col = c
        if "human development" in cl and "group" in cl:
            group_col = c

    # long format: Country/year/metric/value already exists
    if country_col and year_col and metric_col and value_col:
        out = df.copy().rename(columns={
            country_col: "Country",
            year_col: "year",
            metric_col: "metric",
            value_col: "value",
        })

        if region_col:
            out = out.rename(columns={region_col: "UNDP Region"})
        if group_col:
            out = out.rename(columns={group_col: "Human Development Group"})

        if "UNDP Region" not in out.columns:
            out["UNDP Region"] = "All"
        if "Human Development Group" not in out.columns:
            out["Human Development Group"] = "All"
        return out

    # wide format -> melt
    if not (country_col and year_col):
        raise ValueError(
            "Can't infer columns. Need long format (Country/year/metric/value) "
            "or wide format with Country + year + metric columns."
        )

    id_vars = [country_col, year_col]
    value_vars = [c for c in df.columns if c not in id_vars]
    out = df.melt(id_vars=id_vars, value_vars=value_vars, var_name="metric", value_name="value")
    out = out.rename(columns={country_col: "Country", year_col: "year"})
    out["UNDP Region"] = "All"
    out["Human Development Group"] = "All"
    return out

df = normalize(df_raw)
df["year"] = pd.to_numeric(df["year"], errors="coerce").astype("Int64")
df["value"] = pd.to_numeric(df["value"], errors="coerce")
df = df.dropna(subset=["Country", "year", "metric"])

all_metrics = sorted(df["metric"].dropna().unique().tolist())
all_years = sorted(df["year"].dropna().unique().tolist())
all_regions = sorted(df["UNDP Region"].dropna().unique().tolist())
all_groups = sorted(df["Human Development Group"].dropna().unique().tolist())
all_countries = sorted(df["Country"].dropna().unique().tolist())

def pick_default_metric(candidates, fallback=None):
    for name in candidates:
        if name in all_metrics:
            return name
    return fallback or (all_metrics[0] if all_metrics else None)

DEFAULT_MAIN_METRIC = pick_default_metric(
    ["Expected Years of Schooling", "Life Expectancy at Birth", "Human Development Index"],
    fallback=(all_metrics[0] if all_metrics else None)
)
DEFAULT_X_METRIC = pick_default_metric(["Human Development Index", "HDI"], fallback=DEFAULT_MAIN_METRIC)
DEFAULT_Y_METRIC = pick_default_metric(["Life Expectancy at Birth"], fallback=DEFAULT_MAIN_METRIC)
DEFAULT_YEAR = 2006 if 2006 in all_years else (int(all_years[len(all_years)//2]) if all_years else 2006)

default_trend = [c for c in ["Canada", "China", "United States", "Japan", "Germany"] if c in all_countries]
if not default_trend:
    default_trend = all_countries[:3]

# -----------------------------
# Filtering with fallback (returns flag)
# -----------------------------
def filter_with_fallback(metric, year, region, group):
    base = df[(df["metric"] == metric) & (df["year"] == year)].copy()

    d = base
    if region and region != "All":
        d = d[d["UNDP Region"] == region]
    if group and group != "All":
        d = d[d["Human Development Group"] == group]

    if d.shape[0] == 0:
        return base, True
    return d, False

def scatter_df(year, region, group, x_metric, y_metric):
    base = df[df["year"] == year].copy()

    d = base
    if region and region != "All":
        d = d[d["UNDP Region"] == region]
    if group and group != "All":
        d = d[d["Human Development Group"] == group]

    fallback_used = False
    if d.shape[0] == 0:
        d = base
        fallback_used = True

    d = d[d["metric"].isin([x_metric, y_metric])]
    wide = d.pivot_table(index=["Country"], columns="metric", values="value", aggfunc="mean").reset_index()

    if x_metric in wide.columns:
        wide = wide.rename(columns={x_metric: "x"})
    else:
        wide["x"] = np.nan

    if y_metric in wide.columns:
        wide = wide.rename(columns={y_metric: "y"})
    else:
        wide["y"] = np.nan

    return wide, fallback_used

# -----------------------------
# Dash App
# -----------------------------
app = Dash(__name__, title="HDI Dashboard")
server = app.server  # ✅ gunicorn entrypoint: src.app:server

# Force full-page no scroll
app.index_string = """
<!DOCTYPE html>
<html>
  <head>
    {%metas%}
    <title>{%title%}</title>
    {%favicon%}
    {%css%}
    <style>
      html, body { height: 100%; margin: 0; overflow: hidden; }
      #_dash-app-content { height: 100%; }
      * { box-sizing: border-box; }
    </style>
  </head>
  <body>
    {%app_entry%}
    <footer>
      {%config%}
      {%scripts%}
      {%renderer%}
    </footer>
  </body>
</html>
"""

CARD = {
    "border": "1px solid #e5e7eb",
    "borderRadius": "12px",
    "padding": "10px",
    "background": "#fff",
}

GRAPH_CONFIG = {
    "displayModeBar": False,
    "responsive": True,
}

# -----------------------------
# Layout: 100vh single page, no scroll
# -----------------------------
app.layout = html.Div(
    style={
        "height": "100vh",
        "overflow": "hidden",
        "fontFamily": "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        "padding": "12px",
        "boxSizing": "border-box",
    },
    children=[
        # Header
        html.Div(
            style={"height": "44px", "display": "flex", "alignItems": "center"},
            children=[html.H3("HDI Dashboard", style={"margin": 0})],
        ),

        dcc.Store(id="sidebar_state", data={"collapsed": False}),

        html.Div(
            id="page_body",
            style={
                "height": "calc(100vh - 44px - 24px)",
                "display": "flex",
                "gap": "12px",
                "alignItems": "stretch",
                "overflow": "hidden",
            },
            children=[
                # -------- Left Sidebar (collapsible) --------
                html.Div(
                    id="left_panel",
                    style={
                        **CARD,
                        "width": "320px",
                        "height": "100%",
                        "alignSelf": "stretch",
                        "transition": "width 200ms ease",
                        "overflow": "hidden",
                        "position": "relative",
                    },
                    children=[
                        html.Div(
                            style={
                                "position": "relative",
                                "height": "40px",
                                "display": "flex",
                                "alignItems": "center",
                            },
                            children=[
                                html.H4("Filters", id="left_title", style={"margin": "0"}),
                                html.Button(
                                    "≡",
                                    id="btn_toggle_sidebar",
                                    n_clicks=0,
                                    title="Toggle sidebar",
                                    style={
                                        "position": "absolute",
                                        "top": "6px",
                                        "right": "6px",
                                        "width": "36px",
                                        "height": "28px",
                                        "border": "1px solid #d1d5db",
                                        "borderRadius": "10px",
                                        "background": "white",
                                        "cursor": "pointer",
                                        "lineHeight": "24px",
                                        "padding": "0",
                                    },
                                ),
                            ],
                        ),

                        html.Div(
                            id="left_content",
                            style={"marginTop": "10px"},
                            children=[
                                html.Label("Metric (Bar/Line)"),
                                dcc.Dropdown(
                                    id="metric_main",
                                    options=[{"label": m, "value": m} for m in all_metrics],
                                    value=DEFAULT_MAIN_METRIC,
                                    clearable=False,
                                ),
                                html.Div(style={"height": "10px"}),

                                html.Label("Year"),
                                dcc.Slider(
                                    id="year",
                                    min=int(min(all_years)) if all_years else 1990,
                                    max=int(max(all_years)) if all_years else 2022,
                                    step=1,
                                    value=int(DEFAULT_YEAR),
                                    marks={int(y): str(int(y)) for y in all_years[::max(1, len(all_years)//6)]} if all_years else None,
                                    tooltip={"placement": "bottom", "always_visible": True},
                                ),
                                html.Div(style={"height": "10px"}),

                                html.Label("UNDP Region"),
                                dcc.Dropdown(
                                    id="region",
                                    options=[{"label": "All", "value": "All"}] + [{"label": r, "value": r} for r in all_regions],
                                    value="All",
                                    clearable=False,
                                ),
                                html.Div(style={"height": "10px"}),

                                html.Label("Human Dev Group"),
                                dcc.Dropdown(
                                    id="group",
                                    options=[{"label": "All", "value": "All"}] + [{"label": g, "value": g} for g in all_groups],
                                    value="All",
                                    clearable=False,
                                ),

                                html.Hr(),

                                html.Label("Trend countries (Line)"),
                                dcc.Dropdown(
                                    id="trend_countries",
                                    options=[{"label": c, "value": c} for c in all_countries],
                                    value=default_trend,
                                    multi=True,
                                    placeholder="Pick 1–6 countries",
                                ),

                                html.Hr(),

                                html.Details(
                                    open=False,
                                    children=[
                                        html.Summary("Advanced (Scatter metrics)"),
                                        html.Div(style={"height": "8px"}),
                                        html.Label("X metric"),
                                        dcc.Dropdown(
                                            id="x_metric",
                                            options=[{"label": m, "value": m} for m in all_metrics],
                                            value=DEFAULT_X_METRIC,
                                            clearable=False,
                                        ),
                                        html.Div(style={"height": "10px"}),
                                        html.Label("Y metric"),
                                        dcc.Dropdown(
                                            id="y_metric",
                                            options=[{"label": m, "value": m} for m in all_metrics],
                                            value=DEFAULT_Y_METRIC,
                                            clearable=False,
                                        ),
                                    ],
                                ),
                            ],
                        ),
                    ],
                ),

                # -------- Center plots --------
                html.Div(
                    id="center_panel",
                    style={
                        "flex": "1",
                        "height": "100%",
                        "display": "grid",
                        "gridTemplateColumns": "1fr 1fr",
                        "gridTemplateRows": "0.45fr 0.55fr",
                        "gap": "12px",
                        "overflow": "hidden",
                    },
                    children=[
                        html.Div(style={**CARD, "height": "100%"}, children=[
                            dcc.Graph(id="bar_top", style={"height": "100%"}, config=GRAPH_CONFIG)
                        ]),
                        html.Div(style={**CARD, "height": "100%"}, children=[
                            dcc.Graph(id="scatter_xy", style={"height": "100%"}, config=GRAPH_CONFIG)
                        ]),
                        html.Div(style={**CARD, "height": "100%", "gridColumn": "1 / span 2"}, children=[
                            dcc.Graph(id="line_trend", style={"height": "100%"}, config=GRAPH_CONFIG)
                        ]),
                    ],
                ),

                # -------- Right Legend/Help --------
                html.Div(
                    id="right_panel",
                    style={**CARD, "width": "300px", "height": "100%", "alignSelf": "stretch", "overflow": "hidden"},
                    children=[
                        html.H4("Legend & Help", style={"margin": "0 0 10px 0"}),
                        html.Div(id="legend_box", style={"fontSize": "13px", "lineHeight": "1.5"}),
                    ],
                ),
            ],
        ),
    ],
)

# -----------------------------
# Sidebar toggle callback
# -----------------------------
@app.callback(
    Output("sidebar_state", "data"),
    Output("left_panel", "style"),
    Output("left_content", "style"),
    Output("left_title", "style"),
    Input("btn_toggle_sidebar", "n_clicks"),
    State("sidebar_state", "data"),
    prevent_initial_call=True,
)
def toggle_sidebar(n, state):
    collapsed = bool(state.get("collapsed", False))
    collapsed = not collapsed

    left_panel_style = {
        **CARD,
        "width": "52px" if collapsed else "320px",
        "height": "100%",
        "alignSelf": "stretch",
        "transition": "width 200ms ease",
        "overflow": "hidden",
        "position": "relative",
    }

    left_content_style = {"display": "none"} if collapsed else {"display": "block", "marginTop": "10px"}
    left_title_style = {"margin": "0", "display": "none"} if collapsed else {"margin": "0", "display": "block"}

    return {"collapsed": collapsed}, left_panel_style, left_content_style, left_title_style

# -----------------------------
# Main charts + legend callback
# -----------------------------
@app.callback(
    Output("bar_top", "figure"),
    Output("scatter_xy", "figure"),
    Output("line_trend", "figure"),
    Output("legend_box", "children"),
    Input("metric_main", "value"),
    Input("year", "value"),
    Input("region", "value"),
    Input("group", "value"),
    Input("trend_countries", "value"),
    Input("x_metric", "value"),
    Input("y_metric", "value"),
)
def update(metric_main, year, region, group, trend_countries, x_metric, y_metric):
    year = int(year)
    x_metric = x_metric or metric_main
    y_metric = y_metric or metric_main
    trend_countries = trend_countries or default_trend

    # --- BAR ---
    d_bar, fb_bar = filter_with_fallback(metric_main, year, region, group)
    d_top = (
        d_bar.dropna(subset=["value"])
        .groupby("Country", as_index=False)["value"].mean()
        .sort_values("value", ascending=False)
        .head(15)
    )

    fig_bar = px.bar(
        d_top.sort_values("value", ascending=True),
        x="value", y="Country", orientation="h",
        title=f"Top Countries ({metric_main}) — {year}",
        labels={"value": metric_main, "Country": "Country"},
    )
    fig_bar.update_layout(autosize=True, margin=dict(l=10, r=10, t=50, b=10))

    # --- SCATTER ---
    d_sc, fb_sc = scatter_df(year, region, group, x_metric, y_metric)
    d_sc = d_sc.dropna(subset=["x", "y"])

    fig_sc = px.scatter(
        d_sc,
        x="x", y="y",
        hover_name="Country",
        title=f"{x_metric} vs {y_metric} — {year}",
        labels={"x": x_metric, "y": y_metric},
    )
    fig_sc.update_layout(autosize=True, margin=dict(l=10, r=10, t=50, b=10))

    # --- LINE ---
    d_line = df[(df["metric"] == metric_main) & (df["Country"].isin(trend_countries))].copy()

    fb_line = False
    d_line_rg = d_line
    if region != "All":
        d_line_rg = d_line_rg[d_line_rg["UNDP Region"] == region]
    if group != "All":
        d_line_rg = d_line_rg[d_line_rg["Human Development Group"] == group]
    if d_line_rg.empty:
        d_line_rg = d_line
        fb_line = True

    d_line_rg = d_line_rg.dropna(subset=["value"]).sort_values(["Country", "year"])

    fig_line = px.line(
        d_line_rg,
        x="year", y="value", color="Country",
        title=f"Trends ({metric_main})",
        labels={"year": "Year", "value": metric_main},
    )
    fig_line.update_layout(autosize=True, margin=dict(l=10, r=10, t=50, b=10), legend=dict(orientation="v"))

    # --- RIGHT LEGEND (dynamic) ---
    used_region = region
    used_group = group

    fallback_notes = []
    if fb_bar:
        fallback_notes.append("Bar: fallback (ignored Region/Group)")
        used_region = f"{region} → All"
        used_group = f"{group} → All"
    if fb_sc:
        fallback_notes.append("Scatter: fallback (ignored Region/Group)")
    if fb_line:
        fallback_notes.append("Line: fallback (ignored Region/Group)")

    legend = [
        html.Div([html.B("Metric: "), metric_main]),
        html.Div([html.B("Year: "), str(year)]),
        html.Div([html.B("Region used: "), str(used_region)]),
        html.Div([html.B("Group used: "), str(used_group)]),
        html.Div(style={"height": "10px"}),

        html.Div(html.B("Scatter metrics:")),
        html.Div(f"X = {x_metric}"),
        html.Div(f"Y = {y_metric}"),
        html.Div(style={"height": "10px"}),

        html.Div(html.B("Trend countries:")),
        html.Div(", ".join(trend_countries[:8]) + (" ..." if len(trend_countries) > 8 else "")),
        html.Div(style={"height": "10px"}),

        html.Div(html.B("Tips:")),
        html.Ul(
            [
                html.Li("Hover points/bars to see Country and values."),
                html.Li("If filters produce no rows, app auto-fallbacks to avoid blank plots."),
                html.Li("Keep Trend countries small (1–6) for readability."),
            ],
            style={"margin": "6px 0 0 18px"},
        ),

        html.Div(style={"height": "10px"}),

        html.Div([html.B("Fallback status: "), "✅ None" if not fallback_notes else "⚠️ " + " | ".join(fallback_notes)]),
    ]

    return fig_bar, fig_sc, fig_line, legend
app = Dash(__name__)
server = app.server
# -----------------------------
# Local run (Render uses gunicorn)
# -----------------------------
if __name__ == "__main__":
    # Render provides PORT env var for web services; locally default to 8050
    port = int(os.environ.get("PORT", "8050"))
    debug = os.environ.get("DASH_DEBUG", "").lower() in ("1", "true", "yes")
    app.run(host="0.0.0.0", port=port, debug=debug)
