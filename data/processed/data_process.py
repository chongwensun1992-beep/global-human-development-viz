# data/processed/data_process.py
import re
from pathlib import Path

import pandas as pd


def main():
    # ----------------------------
    # Paths (robust)
    # ----------------------------
    project_root = Path(__file__).resolve().parents[2]  # .../global-human-development-viz
    raw_path = project_root / "data" / "raw" / "dataset.csv"
    out_path = project_root / "data" / "processed" / "cleaned.csv"
    out_path.parent.mkdir(parents=True, exist_ok=True)

    # ----------------------------
    # Load wide table
    # ----------------------------
    df = pd.read_csv(raw_path)

    # identity columns (NOT melted into metric)
    id_cols = ["ISO3", "Country", "Human Development Groups", "UNDP Developing Regions"]

    # Fill missing region
    if "UNDP Developing Regions" in df.columns:
        df["UNDP Developing Regions"] = df["UNDP Developing Regions"].fillna("Other / Not classified")

    # Metrics for MVP
    keep_metrics = [
        "Human Development Index",
        "Life Expectancy at Birth",
        "Gross National Income Per Capita",
        "Expected Years of Schooling",
        "Mean Years of Schooling",
    ]

    # columns like "xxx (1990)"
    pattern = re.compile(r"^(.*)\s\((\d{4})\)$")

    value_cols = []
    for c in df.columns:
        m = pattern.match(c)
        if not m:
            continue
        metric = m.group(1)
        if metric in keep_metrics:
            value_cols.append(c)

    # subset
    df_sub = df[id_cols + value_cols].copy()

    # melt wide -> long
    long = df_sub.melt(
        id_vars=id_cols,
        var_name="metric_year",
        value_name="value",
    )

    # split metric/year
    long[["metric", "year"]] = long["metric_year"].str.extract(r"^(.*)\s\((\d{4})\)$")
    long["year"] = long["year"].astype(int)
    long = long.drop(columns=["metric_year"])

    # drop missing values (speed + clean)
    long = long.dropna(subset=["value"])

    # ensure numeric
    long["value"] = pd.to_numeric(long["value"], errors="coerce")
    long = long.dropna(subset=["value"])

    # save
    long.to_csv(out_path, index=False)

    print("Saved:", out_path)
    print("Shape:", long.shape)
    print(long.head())
    print("\nMetrics:", long["metric"].nunique())
    print(long["metric"].value_counts())


if __name__ == "__main__":
    main()
