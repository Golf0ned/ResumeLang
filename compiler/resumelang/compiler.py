import os
import json

import jinja2

from grammar import resume


class ResumeLang:
    def __init__(self, file):
        self.file = file
        self.data = self.parse()

    def parse(self):
        if not self.file.endswith(".resume"):
            raise ValueError("File must have a .resume extension")

        with open(self.file, "r", encoding="utf-8") as f:
            data = f.read()
            result = resume.parseString(data)
            return result.as_dict()

    def emit_json(self, file=None):
        res = json.dumps(self.data, indent=4)

        if not file:
            print(res)
            return

        with open(file, "w", encoding="utf-8") as f:
            f.write(res)

    def write_template(self, template, output=None):
        env = jinja2.Environment(
            loader=jinja2.FileSystemLoader("."),
            block_start_string="<<",
            block_end_string=">>",
            variable_start_string="<;",
            variable_end_string=";>",
            comment_start_string="<#",
            comment_end_string="#>",
            trim_blocks=True,
        )

        unfilled = env.get_template(template)
        res = unfilled.render(self.data)

        if not output:
            print(res)
            return
        with open(output, "w", encoding="utf-8") as f:
            f.write(res)

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) != 3:
        print("Usage: python compiler.py </path/to/template/file> <*.resume>")
        sys.exit(1)

    template = sys.argv[1]
    file = sys.argv[2]
    resume_lang = ResumeLang(file)
    resume_lang.write_template(template)
