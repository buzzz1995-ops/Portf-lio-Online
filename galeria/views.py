from flask import render_template, request, jsonify
from app import app, mail
from flask_mail import Message

# Rota principal -> abre templates/index.html
@app.route('/')
def index():
    return render_template('index.html')
