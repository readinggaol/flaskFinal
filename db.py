import sqlite3
from contextlib import closing
import Book as b

def getBooks():
    conn = sqlite3.connect("books.sqlite")
    conn.row_factory = sqlite3.Row
    books = []
    try:
        with closing(conn.cursor()) as c:
            sql = "SELECT title, author_first, author_last, publish_year, page_count, genre, image_path FROM Books"
            c.execute(sql)
            results = c.fetchall()
            for result in results:
                newBook = b.Book(result[0], result[1], result[2],
                                 result[3], result[4], result[5], result[6])
                books.append(newBook)
            return books
    except sqlite3.OperationalError as e:
        print("Error reading database -", e)