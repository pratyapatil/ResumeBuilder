import os
from pathlib import Path

from fpdf import FPDF


PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_FILE = Path(__file__).resolve().parent / "project_A4.pdf"
INCLUDED_EXTENSIONS = {".py", ".js", ".jsx", ".ts", ".tsx", ".html", ".css"}
EXCLUDED_DIRS = {".git", "__pycache__", "ENV", "dist", "node_modules"}
EXCLUDED_FILES = {"html-docx.js"}
MAX_FILE_SIZE_BYTES = 200_000
UNICODE_REPLACEMENTS = str.maketrans(
    {
        "\u2013": "-",
        "\u2014": "-",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2022": "*",
        "\u2026": "...",
        "\u00a0": " ",
    }
)


def sanitize_text(text):
    normalized = text.translate(UNICODE_REPLACEMENTS)
    return normalized.encode("latin-1", "replace").decode("latin-1")


def should_include_file(file_path):
    if file_path.suffix.lower() not in INCLUDED_EXTENSIONS:
        return False

    if file_path.name in EXCLUDED_FILES:
        return False

    try:
        return file_path.stat().st_size <= MAX_FILE_SIZE_BYTES
    except OSError:
        return False


class CodePDF(FPDF):
    def header(self):
        self.set_font("Arial", "B", 12)
        self.cell(
            0,
            10,
            sanitize_text("Project Code Documentation"),
            border=False,
            ln=True,
            align="C",
        )
        self.ln(5)


pdf = CodePDF(format="A4")
pdf.set_auto_page_break(auto=True, margin=15)
pdf.set_font("Courier", size=8)

for root, dirs, files in os.walk(PROJECT_ROOT):
    dirs[:] = sorted(
        directory
        for directory in dirs
        if directory not in EXCLUDED_DIRS and not directory.startswith(".")
    )

    for file_name in sorted(files):
        file_path = Path(root) / file_name

        if not should_include_file(file_path):
            continue

        pdf.add_page()

        pdf.set_font("Arial", "B", 10)
        relative_path = file_path.relative_to(PROJECT_ROOT)
        pdf.cell(0, 8, sanitize_text(str(relative_path)), ln=True)
        pdf.ln(2)

        pdf.set_font("Courier", size=8)
        with file_path.open("r", encoding="utf-8", errors="ignore") as source_file:
            for line in source_file:
                pdf.multi_cell(0, 4, sanitize_text(line.rstrip("\n")))

pdf.output(str(OUTPUT_FILE))

print(f"PDF generated successfully: {OUTPUT_FILE}")
