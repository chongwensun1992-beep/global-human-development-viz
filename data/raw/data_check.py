import pandas as pd

# ========== 1. 读取数据 ==========
df = pd.read_csv("dataset.csv")

print("=== BASIC INFO ===")
print("Shape (rows, cols):", df.shape)
print("\nColumn names:")
print(df.columns.tolist())

# ========== 2. 前几行，直观看结构 ==========
print("\n=== HEAD ===")
print(df.head())

# ========== 3. 数据类型检查 ==========
print("\n=== DATA TYPES ===")
print(df.dtypes)

# ========== 4. 缺失值比例（非常重要） ==========
missing_ratio = (
    df.isna()
      .mean()
      .sort_values(ascending=False)
)

print("\n=== MISSING VALUE RATIO (Top 15) ===")
print(missing_ratio.head(15))

# ========== 5. 唯一值数量（判断是否适合做 filter） ==========
unique_counts = (
    df.nunique()
      .sort_values(ascending=False)
)

print("\n=== UNIQUE VALUE COUNTS ===")
print(unique_counts)

# ========== 6. 数值变量快速统计 ==========
numeric_cols = df.select_dtypes(include="number").columns

print("\n=== NUMERIC SUMMARY ===")
print(df[numeric_cols].describe().T)

# ========== 7. 国家 / 时间字段检查（dashboard 核心） ==========
possible_country_cols = [c for c in df.columns if "country" in c.lower()]
possible_year_cols = [c for c in df.columns if "year" in c.lower()]

print("\nPossible country columns:", possible_country_cols)
print("Possible year columns:", possible_year_cols)

if possible_country_cols:
    col = possible_country_cols[0]
    print(f"\nTop countries in `{col}`:")
    print(df[col].value_counts().head(10))

if possible_year_cols:
    col = possible_year_cols[0]
    print(f"\nYear range in `{col}`:")
    print(df[col].min(), "to", df[col].max())

# ========== 8. 极端值快速检查（寿命 / HDI 类） ==========
suspect_cols = [
    c for c in df.columns
    if "life" in c.lower() or "hdi" in c.lower()
]

print("\n=== EXTREME VALUE CHECK ===")
for c in suspect_cols:
    if c in numeric_cols:
        print(f"{c}: min={df[c].min()}, max={df[c].max()}")
