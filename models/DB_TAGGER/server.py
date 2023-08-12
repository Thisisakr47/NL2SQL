from flask import Flask, request, jsonify
from code import model
import pickle
import jsonpickle
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)
#model = model()
#model = pickle.load(open("model.pkl", "rb")) 

@app.route("/predict", methods=["GET"])
@cross_origin(supports_credentials=True)
def predict(): 
    print(request.args.get('data'))    
    #return jsonify(query_to_postag)
    return jsonify("fls")

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5050)

