from setuptools import setup

setup_args = dict(
    name="riddle",
    install_requires=[
        'Flask>=0.9',
        'Jinja2==2.7.1',
        'Werkzeug==0.9.4',
        ]
    )

if __name__ == "__main__":
    setup(**setup_args)
