
# ckanext-resourcesfilter

This extension replaces the standard resources list on the dataset page with an
interactive paginated list that can be browsed and filtered, useful for datasets with 
many resources.



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
