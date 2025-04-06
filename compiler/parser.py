import pprint
from grammar import resume

def parse(file):
    if not file.endswith(".resume"):
        raise ValueError("File must have a .resume extension")

    with open(file, "r", encoding="utf-8") as f:
        data = f.read()
        result = resume.parseString(data)
        return result.as_dict()

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python parser.py <file.resume>")
        sys.exit(1)

    file = sys.argv[1]
    pprint.pprint(parse(file))
