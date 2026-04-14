import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

data = {
    "skill": [1, 2, 3, 1, 2],
    "urgency": [5, 3, 4, 2, 1],
    "task": [1, 0, 1, 0, 1]
}

df = pd.DataFrame(data)

X = df[["skill", "urgency"]]
y = df["task"]

model = RandomForestClassifier()
model.fit(X, y)

# Save model
pickle.dump(model, open("ai-model/model.pkl", "wb"))

print("Model trained & saved!")