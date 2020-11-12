import ckan.plugins as plugins
import ckantoolkit as toolkit


def get_resources_filter_page_size():
    return toolkit.asint(
        toolkit.config.get('ckanext.resourcesfilter.page_size', 10)
    )

def ckan_29():
    return toolkit.check_ckan_version(min_version='2.9.0')


class ResourcesfilterPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.ITemplateHelpers)

    # IConfigurer

    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('webassets', 'resourcesfilter')

    # ITemplateHelpers

    def get_helpers(self):
        return {
            'get_resources_filter_page_size': get_resources_filter_page_size,
            'ckan_29': ckan_29,
        }
