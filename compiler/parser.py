from grammar import resume

def parse(file):
    if not file.endswith(".resume"):
        raise ValueError("File must have a .resume extension")

    with open(file, "r", encoding="utf-8") as f:
        data = f.read()
        result = resume.parseString(data)
        return result.as_dict()
