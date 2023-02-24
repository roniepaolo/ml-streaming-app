import asyncio
import bentoml
import pandas as pd
from bentoml.io import JSON

churn_runner = bentoml.sklearn.get("churn_model:latest").to_runner()
svc = bentoml.Service("churn_model", runners=[churn_runner])


@svc.api(input=JSON(), output=JSON(), route="/v2/models/churn")
async def predict(input):
    df = pd.DataFrame([input])
    result = await asyncio.gather(churn_runner.predict.async_run(df.drop("customerid", axis=1)))
    result_json = {
        "customerid": df["customerid"].values[0],
        "exited": result[0][0]
    }
    return result_json
