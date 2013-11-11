;cookbook.Collections.Recipes = Backbone.Collection.extend({
	url: '/api/v1/recipes',
	model: cookbook.Models.Recipe,
	comparator: function(m) {
		return -m.get('date');
	}
});