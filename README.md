
# ckanext-resourcesfilter

This extension replaces the standard resources list on the dataset page with an
interactive paginated list that can be browsed and filtered, useful for datasets with 
many resources.

![Demo](https://raw.githubusercontent.com/okfn/ckanext-resourcesfilter/master/doc/ckanext-resourcesfilter.gif)

Important things to keep in mind:

* This extension overrides CKAN core templateis. If you need to add customizations to the resources list for
  your own project, you need to override this extension's templates from your own (and load your plugin first in the ini
  file, eg `ckan.plugins = ... your_plugin resourcesfilter`). The templates to override are the following:
  * `package/snippets/resources_list.html` -> same name and location
  * `package/snippets/resource_item.html` -> `package/snippets/resources_list_template.html`
  The second one is a [Mustache](https://mustache.github.io) template, rendered on the client. So any server side
  logic (eg check if user can edit, build URLs, etc) must be done on the Jinja2 `resources_list.html` template and
  passed via module parameters.

* The browsable list is only rendered on the dataset read page, not the internal management one.
* The current implementation does not support translations or the "popular" indicators. Pull requests are welcome.

## Installation

To install ckanext-resourcesfilter:

1. Activate your CKAN virtual environment, for example::

     . /usr/lib/ckan/default/bin/activate

2. Install the ckanext-resourcesfilter Python package into your virtual environment::

     pip install ckanext-resourcesfilter

3. Add ``resourcesfilter`` to the ``ckan.plugins`` setting in your CKAN
   config file (by default the config file is located at
   ``/etc/ckan/default/production.ini``).

4. Restart CKAN.

## Configuration

The page size controls the minimum number of resources in a dataset needed to display the 
updated interface. The default is 10.

    ckanext.resourcesfilter.page_size = page_size


## Development Installation

To install ckanext-resourcesfilter for development, activate your CKAN virtualenv and
do::

    git clone https://github.com/okfn/ckanext-resourcesfilter.git
    cd ckanext-resourcesfilter
    python setup.py develop
