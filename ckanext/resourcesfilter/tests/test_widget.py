import pytest

from ckan.tests import factories

from ckantoolkit import url_for, check_ckan_version


@pytest.mark.usefixtures('clean_db')
def test_widget_loaded(app):

    dataset = factories.Dataset()

    for i in range(1, 11):
        resource = factories.Resource(
            name='Resource {}'.format(i),
            url='https://example.com',
            package_id=dataset['id'],
        )

    if check_ckan_version(min_version='2.9.0'):
        url = url_for('dataset.read', id=dataset['id'])
    else:
        url = url_for(controller='package', action='read', id=dataset['id'])

    res = app.get(url)

    assert 'resources-list-filter-container' in res.get_data(as_text=True)
    assert 'script type="text/template" id="resources-list-template"' in res.get_data(as_text=True)
