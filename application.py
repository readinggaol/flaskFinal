from flask import Flask, render_template

app = Flask(__name__)
app.config["UPLOAD_PATH"] = "static/images"

@app.route("/")
def index():
    return render_template("index.html")