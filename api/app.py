import os
import tempfile

from flask import Flask, request, jsonify, send_file

from compiler.compiler import ResumeLang


app = Flask(__name__)

@app.route("/compile/resume", methods=["POST"])
def compile_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No resume file provided"}), 400
    
    resume_file = request.files["resume"]
    template_path = "../templates/latex/jakes_resume.tex"

    with tempfile.TemporaryDirectory() as temp_dir:
        resume_path = os.path.join(temp_dir, "in.resume")
        output_path = os.path.join(temp_dir, "resume.tex")

        resume_file.save(resume_path)

        resume_lang = ResumeLang(resume_path)
        resume_lang.write_template(template_path)

        return send_file(output_path, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
