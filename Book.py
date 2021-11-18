class Book:
    def __init__(self, title, author_first, author_last, publish_year,
                 page_count, genre, image_path):
        self.title = title
        self.author_first = author_first
        self.author_last = author_last
        self.publish_year = publish_year
        self.page_count = page_count
        self.genre = genre
        self.image_path = image_path

    def __str__(self):
        return self.title + ": " + self.author_last + ", " + self.author_first

    def break_book(self):
        broken_book = []
        broken_book.append(self.title)
        broken_book.append(self.author_first)
        broken_book.append(self.author_last)
        broken_book.append(self.publish_year)
        broken_book.append(self.page_count)
        broken_book.append(self.genre)
        broken_book.append("static/images/" + self.image_path)
        return broken_book