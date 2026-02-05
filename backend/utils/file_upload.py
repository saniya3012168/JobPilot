import os
from werkzeug.utils import secure_filename
from config import Config

def save_file(file):
    os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)
    filename = secure_filename(file.filename)
    file.save(os.path.join(Config.UPLOAD_FOLDER, filename))
    return filename
