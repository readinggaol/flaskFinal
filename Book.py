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