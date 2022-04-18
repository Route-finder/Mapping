import json
json.dumps(list(map(lambda x: (lambda v: {"name": v[0], "section": v[1][:-1]})(x.split(',')), open("test_books.csv"))))
