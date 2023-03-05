import bentoml
from imblearn.pipeline import Pipeline
from imblearn.over_sampling import SMOTE
from imblearn.under_sampling import RandomUnderSampler
import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.model_selection import RepeatedStratifiedKFold
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import classification_report
import xgboost as xgb

# Reading the raw data
df = pd.read_csv(Path("data/Churn_Modelling.csv"))

# Dropping categorical variables
df.drop(labels=["RowNumber", "CustomerId", "Surname"], axis=1, inplace=True)

# Applying one-hot encoding
df = pd.get_dummies(df, columns=["Geography", "Gender"], drop_first=True)

# Changing case of columns
df.columns = [c.lower() for c in df.columns]

# Generating design matrix and target vector
X = df.drop("exited", axis=1)
y = df[["exited"]]

# Stratified splitting the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, random_state=42)

# The combination of SMOTE and under-sampling performs better than plain under-sampling
over = SMOTE(random_state=42)
under = RandomUnderSampler(random_state=42)
model = xgb.XGBClassifier(random_state=42, n_jobs=-1)
steps = [("over", over), ("under", under), ("model", model)]
pipeline = Pipeline(steps=steps)

# GridSearchCV and SMOTE parameters grid
param_grid = {
  "over__sampling_strategy": [0.3],
  "under__sampling_strategy": [0.3, 0.4, 0.5],
  "over__k_neighbors": [5, 6, 7],
  "model__max_depth": [5, 6, 7],
  "model__n_estimators": [13, 14],
  "model__scale_pos_weight": [1, 2, 3]
}

# Repeated stratified k-fold reduce the noise in the estimated model performance
cv = RepeatedStratifiedKFold(n_splits=10, n_repeats=3, random_state=42)
grid = GridSearchCV(
    estimator=pipeline,
    param_grid=param_grid,
    scoring="roc_auc",
    n_jobs=-1,
    cv=cv
)
grid.fit(X_train, y_train)

# Report
print(f"Best ROC AUC {grid.best_score_}\nUsing {grid.best_params_}\n")
y_pred = grid.predict(X_test)
print(classification_report(y_test, y_pred))

# Saving the model
model_id = bentoml.sklearn.save_model("churn_model", grid)
print(f"Model saved: {model_id}")