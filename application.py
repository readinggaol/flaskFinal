from flask import Flask, render_template, request, redirect
import os
import db as db

app = Flask(__name__)
app.config["UPLOAD_PATH"] = "static/images"


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/collection")
def collection():
    myBooks = db.get_books()
    myList = []
    for book in myBooks:
        myList.append(book.break_book())
    return render_template("collection.html", collection=myList)

@app.route("/upload", methods=["GET", "POST"])
def upload():
    if request.method == "POST":
        book = [request.values["title"], request.values["first"], request.values["last"],
                request.values["year"], request.values["pages"], request.values["genre"], request.files["file"].filename]
        db.add_book(book)
        if request.files:
            image = request.files["file"]
            image.save(os.path.join(app.config["UPLOAD_PATH"], image.filename))
            return redirect(request.url)
    return render_template("upload.html")

@app.route("/delete", methods=["GET", "POST"])
def delete():
    if request.method == "POST":
        target_book = request.form.get("books")
        filename = db.get_file_path(target_book)
        print(filename)
        db.delete_book(target_book)
        os.remove(os.path.join(app.config['UPLOAD_PATH'], filename))
    myBooks = db.get_books()
    myList = []
    for book in myBooks:
        myList.append(book.break_book())
    return render_template("delete.html", collection=myList)