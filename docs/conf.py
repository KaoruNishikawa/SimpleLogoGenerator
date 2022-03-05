import PACKAGENAME


# -- Project information -----------------------------------------------------

project = "PACKAGENAME"
copyright = "YEAR, AUTHOR"
author = "AUTHOR"
release = version = PACKAGENAME.__version__

# -- General configuration ---------------------------------------------------

extensions = [
    "m2r2",
    "sphinx.ext.autodoc",
    "sphinx.ext.autosummary",
    "sphinx.ext.napoleon",
    "sphinx.ext.viewcode",
]

templates_path = ["_templates"]
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

autosummary_generate = True
add_module_names = False
autodoc_member_order = "bysource"
autodoc_typehints_format = "short"
autodoc_typehints = "description"
napoleon_use_ivar = True

# -- Options for HTML output -------------------------------------------------

html_theme = "pydata_sphinx_theme"
html_theme_options = {
    "icon_links": [
        {
            "name": "GitHub",
            "url": "https://github.com/USERNAME/PACKAGENAME",
            "icon": "fab fa-github-square",
            "type": "fontawesome",
        },
        {
            "name": "PyPI",
            "url": "https://pypi.org/project/PACKAGENAME/",
            "icon": "fas fa-cubes",
            "type": "fontawesome",
        },
    ],
    "navbar_start": ["navbar-logo"],
}
# html_logo = "_static/logo.svg"
html_favicon = "https://avatars.githubusercontent.com/u/20414019?s=400&u=0e47c7d5efc6cf27086c8cfcdb6fd5c757926043&v=4"  # noqa: E501
html_sidebars = {
    "**": [
        "version",
        "search-field.html",
        "sidebar-nav-bs.html",
    ],
}

html_static_path = ["_static"]
html_css_files = ["css/custom.css"]