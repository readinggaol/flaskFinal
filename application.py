from flask import Flask, render_template, request, redirect, session, g
from flask_cors import CORS
import os
import db as db
import base64
from Book import User

app = Flask(__name__)
app.config["UPLOAD_PATH"] = "static/images"
# required for session implementation
app.secret_key = "mendacious"
CORS(app)

# global storage for users
users = [User(1, "Douglas", "admin"), User(2, "Eric", "winter")]


def get_user_by_id(users, id):
    for user in users:
        if user.id == id:
            return user
    return None


def get_user_by_name(users, name):
    for user in users:
        if user.username == name:
            return user
    return None


@app.before_request
def before_request():
    if "user_id" in session:
        user = get_user_by_id(users, session["user_id"])
        g.user = user
    else:
        g.user = None


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # removes the current session to help with bad/repeated input
        session.pop("user_id", None)
        username = request.values["username"]
        password = request.values["password"]
        user = get_user_by_name(users, username)
        if user and user.password == password:
            session["user_id"] = user.id
            return redirect(request.url)
        else:
            g.user = None
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
    if g.user is None:
        return render_template("unavailable.html")
    else:
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
    if g.user is None:
        return render_template("unavailable.html")
    else:
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