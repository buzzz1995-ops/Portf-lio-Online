from flask import Flask
import os

app = Flask(__name__)

# importa as rotas depois de criar o app
from galeria.views import *

if __name__ == '__main__':
    app.run(debug=True)
