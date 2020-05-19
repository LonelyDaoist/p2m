import flask
import pickle
import pandas as pd

with open("Model/rf_model.pickle","rb") as f:       # Loading the model
    model = pickle.load(f)

with open("files/model_inputs.txt","r") as f:       # Loading the model columns
    cols = f.read().splitlines()                    # which will be used to complete missing values

with open("files/numeric_inputs.txt","r") as f:     # Loading the columns that needs to be numeric
    numeric_cols = f.read().splitlines()

app = flask.Flask(__name__)

#numeric_cols = ["room","bedroom","swimming_pool","area(m�)"]

@app.route("/",methods=["POST"])
def main():
    data = flask.request.form.to_dict(flat=False)   # Extracting form data and
                                                    # converting it to a dictionnary 

    query = pd.DataFrame(data)                      # Converting the dictionnary into a dataframe

    for col in query.columns:                       # Converting to numeric columns
        if col in numeric_cols:
            query[col] = pd.to_numeric(query[col])

    query = pd.get_dummies(query,prefix='', prefix_sep='')  # Applying one hot encoding to match the model

    for col in cols:                                # If there are missing values
        if col not in query.columns:                # they will be filled with 0
            query[col] = 0

    prediction = 10 ** model.predict(query)[0]      # Prediction the result
                                                    # which is initially an ndarray
                                                    # thus the use of [0]

    return flask.jsonify({"prediction":prediction})

if (__name__=="__main__"):
    app.run()

