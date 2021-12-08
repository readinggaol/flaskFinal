from flask import Flask, render_template, request, redirect
from flask_cors import CORS
import os
import db as db
import base64

app = Flask(__name__)
app.config["UPLOAD_PATH"] = "static/images"
CORS(app)

if app.config["UPLOAD_PATH"] != "static/images":
    print("BROKEN! --> " + app.config["UPLOAD_PATH"])
else:
    print("GOOD! --> " + app.config["UPLOAD_PATH"])

@app.route("/")
def index():
    if app.config["UPLOAD_PATH"] != "static/images":
        print("BROKEN! --> " + app.config["UPLOAD_PATH"])
    else:
        print("GOOD! --> " + app.config["UPLOAD_PATH"])
    return render_template("index.html")


@app.route("/collection")
def collection():
    if app.config["UPLOAD_PATH"] != "static/images":
        print("BROKEN! --> " + app.config["UPLOAD_PATH"])
    else:
        print("GOOD! --> " + app.config["UPLOAD_PATH"])
    myBooks = db.get_books()
    myList = []
    for book in myBooks:
        myList.append(book.break_book())
    return render_template("collection.html", collection=myList)


@app.route("/upload", methods=["GET", "POST"])
def upload():
    if app.config["UPLOAD_PATH"] != "static/images":
        print("BROKEN! --> " + app.config["UPLOAD_PATH"])
    else:
        print("GOOD! --> " + app.config["UPLOAD_PATH"])
    if request.method == "POST":
        # determine if the webcam was used
        # if it was, decode the base64 string and create a fileName based on the title of the book and the author
        # create a pathName that represents the folder where you want to save the binary data
        # manually open the new file and write the decoded binary data, then manually close the file
        imageString = request.values["string"]
        if len(imageString) > 0:
            imageData = base64.b64decode(imageString)
            fileName = request.values["title"].replace(" ", "_").lower() + "_" + request.values["last"].lower() + ".jpg"
            pathName = os.path.join(app.config["UPLOAD_PATH"], fileName)
            saveFile = open(pathName, "wb")
            saveFile.write(imageData)
            saveFile.close()
            book = [request.values["title"], request.values["first"], request.values["last"],
                    request.values["year"], request.values["pages"], request.values["genre"],
                    fileName]
            db.add_book(book)
        else:
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
    if app.config["UPLOAD_PATH"] != "static/images":
        print("BROKEN! --> " + app.config["UPLOAD_PATH"])
    else:
        print("GOOD! --> " + app.config["UPLOAD_PATH"])
    if request.method == "POST":
        target_book = request.form.get("books")
        filename = db.get_file_path(target_book)
        db.delete_book(target_book)
        os.remove(os.path.join(app.config['UPLOAD_PATH'], filename))
    myBooks = db.get_books()
    myList = []
    for book in myBooks:
        myList.append(book.break_book())
    return render_template("delete.html", collection=myList)