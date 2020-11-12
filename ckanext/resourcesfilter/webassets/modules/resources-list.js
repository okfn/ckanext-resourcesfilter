this.ckan.module('resources-list', {

  options: {
    pageSize: 5,
    // All the ones below are passed as module params
    resources: null,
    baseReadUrl: null,
    baseEditUrl: null,
    canEdit: null
  },

  initialize: function () {

    jQuery.proxyAll(this, /_on/, 'preProcess');

    $('#resources-list-filter').on('input', this._onFilter);

    this.allResources = this.activeResources = this.options.resources;

    // Compute some fields on initialization to keep templates simple
    this.allResources.forEach(this.preProcess);

    this.pager = $('<div></div>').insertAfter(this.el);

    this.template = $('#resources-list-template').html();

    this.renderList(this.activeResources);

  },

  preProcess: function(resource) {
    // Display name
    if (resource.name) {
      resource.display_name = resource.name;
    } else if (resource.description) {
      resource.display_name = resource.description.split('.')[0];
    } else {
      resource.display_name = 'Unnamed resource';
    }
    if (resource.display_name.length > 60) {
      resource.display_name = resource.display_name.substring(0, 60) + '...';
    }

    // Description
    if (resource.description) {
      resource.display_description = resource.description
      if (resource.display_description.length > 80) {
        resource.display_description = resource.display_description.substring(0, 80) + '...';
      }
    } else {
      resource.display_description = '';
    }

    // Format
    resource.display_format = (resource.format) ? resource.format.toLowerCase() : 'data';

    // Upload?
    resource.is_upload = (resource.url_type == 'upload');

    // Read URL
    resource.read_url = this.options.baseReadUrl.replace('__resource_id__', resource.id);

    // Edit URL
    resource.can_edit = (this.options.canEdit === 'True');
    resource.edit_url = this.options.baseEditUrl.replace('__resource_id__', resource.id);

  },

  renderList: function(resources, term) {
    var self_ = this;

    this.pager.pagination({
      pageSize: this.options.pageSize,
      autoHidePrevious: true,
      autoHideNext: true,
      dataSource: resources,
      formatResult: function(resources) {
        term = self_.term
        for (var i=0, len = resources.length; i < len; i++) {
          var re = RegExp('(' + term + ')', 'ig');
          resources[i].display_name = resources[i].display_name.replace(re, '<span class="highlight">$1</span>');
          resources[i].display_description = resources[i].display_description.replace(re, '<span class="highlight">$1</span>');
        }
        return resources;
      },
      callback: function(data, pagination) {
          var html = Mustache.render(
            self_.template, {
              resources: data
            })
          self_.el.html(html);
      }
    })

  },


  _onFilter: function(e) {
    var value = e.target.value;
    this.term = value;
    this.activeResources = this.allResources.filter(
      function(resource) {
        return (
          resource.name.toLowerCase().includes(value.toLowerCase()) ||
          resource.description.toLowerCase().includes(value.toLowerCase())
        )
    });
    this.renderList(this.activeResources);

  }

});
