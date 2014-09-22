_app = None


def get_app():
    from flask import Flask
    from common.config import app_config
    import os

    global get_app, _app

    this_file = os.path.realpath(__file__)
    cur_dir = os.path.dirname(this_file)
    par_dir = os.path.dirname(cur_dir)
    static_folder = os.path.join(par_dir, 'static')
    template_folder = os.path.join(par_dir, 'templates')

    _app = Flask(__name__,
                 static_folder=static_folder,
                 static_url_path='',
                 template_folder=template_folder)
    get_app = lambda: _app
    _app.debug = True
    _app.config.from_object(app_config)
    return _app
