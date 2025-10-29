from flask import render_template, request, jsonify
from app import app
from flask_mail import Message

# Rota principal -> abre templates/index.html
@app.route('/')
def index():
    return render_template('index.html')

# Rota Ruben -> abre templates/ruben/index.html
@app.route('/ruben')
def ruben():
    return render_template('index.html')
