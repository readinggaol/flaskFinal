from flask import Flask, render_template
import db as db
import Book

app = Flask(__name__)
app.config["UPLOAD_PATH"] = "static/images"


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/collection")
def collection():
    myBooks = db.getBooks()
    myList = []
    for book in myBooks:
        myList.append(book.break_book())
    return render_template("collection.html", collection=myList)

@app.route("/upload")
def upload():
    return render_template("upload.html")

@app.route("/delete")
def delete():
    return render_template("delete.html")