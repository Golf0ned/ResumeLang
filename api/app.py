import os
import tempfile

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

from resumelang.compiler import ResumeLang


app = Flask(__name__)
CORS(app)

@app.route("/api/compile/pdf", methods=["POST"])
def compile_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No resume file provided"}), 400
    
    resume_file = request.files["resume"]
    template_path = "/templates/latex/jakes_resume.tex"

    with tempfile.TemporaryDirectory() as temp_dir:
        os.chmod(temp_dir, 0o777)
        resume_path = os.path.join(temp_dir, "in.resume")
        subbed_path = os.path.join(temp_dir, "resume.tex")
        output_path = os.path.join(temp_dir, "resume.pdf")

        resume_file.save(resume_path)

        rl = ResumeLang(resume_path)
        rl.write_template(template_path, subbed_path)

        os.system(f"pdflatex {os.path.relpath(subbed_path)}")
        os.system(f"mv resume.* {temp_dir}")

        return send_file(output_path, as_attachment=True)

@app.route("/api/compile/typescript", methods=["POST"])
def compile_ts():
    if "resume" not in request.files:
        return jsonify({"error": "No resume file provided"}), 400
    
    resume_file = request.files["resume"]
    template_path = "/templates/typescript/resume_data.ts"

    with tempfile.TemporaryDirectory() as temp_dir:
        resume_path = os.path.join(temp_dir, "in.resume")
        output_path = os.path.join(temp_dir, "resume_data.ts")

        resume_file.save(resume_path)

        rl = ResumeLang(resume_path)
        rl.write_template(template_path, output_path)

        return send_file(output_path, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
