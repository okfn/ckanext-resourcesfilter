this.ckan.module('resources-list', {

  options: {
    pageSize: 5
  },

  initialize: function () {

    jQuery.proxyAll(this, /_on/);

    $('#resources-list-filter').on('input', this._onFilter);

    this.allResources = this.activeResources = this.options.resources;

    this.pager = $('<div></div>').insertAfter(this.el);

    this.template = $('#resources-list-template').html();

    this.renderList(this.activeResources);

  },

  renderList: function(resources, term) {
    var self_ = this;

    this.pager.pagination({
      pageSize: this.options.pageSize,
      autoHidePrevious: true,
      autoHideNext: true,
      dataSource: resources,
      formatResult: function(resources) {
        console.log(self_.term)
        term = self_.term
        for (var i=0, len = resources.length; i < len; i++) {
          var re = RegExp('(' + term + ')', 'ig');
          resources[i].name = resources[i].name.replace(re, '<span class="highlight">$1</span>');
          resources[i].description = resources[i].description.replace(re, '<span class="highlight">$1</span>');
        }
        return resources;
      },
      callback: function(data, pagination) {
          var html = Mustache.render(self_.template, {resources: data})
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
