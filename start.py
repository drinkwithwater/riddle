#!.env/bin/python
from server import get_app

def wsgi_app():
    app=get_app()
    import routes
    return app

def main():
    app=get_app()
    import routes
    app.run(app.config['HOST'],
            app.config['PORT'],
            **app.config['OPTIONS'])

if __name__=='__main__':
    main()
