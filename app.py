from flask import Flask
from flask_mail import Mail

app = Flask(__name__)

# ===== CONFIGURAÇÃO DO FLASK-MAIL =====
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'ruben-silva-work@wide-empire-474509-u6.iam.gserviceaccount.com'
app.config['MAIL_PASSWORD'] = 'AIzaSyBo_uP-F10wgJ9qOTFhO2HpZIv1ByzXir4'                # senha de app do Gmail
app.config['MAIL_DEFAULT_SENDER'] = ('Portfólio Ruben Silva', 'teuemail@gmail.com')

mail = Mail(app)

# importa as rotas depois de criar o app
from galeria.views import *

if __name__ == '__main__':
    app.run(debug=True)
