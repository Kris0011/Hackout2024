from flask import Flask 
from fertilizer.routes import fertilizer
from nasa_firms.routes import nasa_firms
from flask_cors import CORS , cross_origin

app = Flask(__name__)


CORS(app , supports_credentials=True)


app.register_blueprint(fertilizer , url_prefix='/fertilizer')


app.register_blueprint(nasa_firms , url_prefix='/nasa_firms')

@app.route('/') 
def home():
    return 'Hello!'

if __name__ == '__main__':
    app.run(debug=True)
