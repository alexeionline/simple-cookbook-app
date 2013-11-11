cookbook.addInitializer(function () {
	/**
	 * save all recipes in cookbook.recipes collection
	 * start routing after fetch data from server
	 * @type {cookbook}
	 */
	cookbook.recipes = new cookbook.Collections.Recipes;

	cookbook.recipes.fetch({
		success: function () {

			cookbook.mainRouter = new cookbook.MainRouter;
			Backbone.history.start();			
			
			cookbook.recipes.listenTo(cookbook.recipes, 'add', function (model) {
				cookbook.mainRouter.navigate(model.get('recipeID') + '/a/' +  model.get('id'), {trigger: true});
			});

			if (!Backbone.history.fragment) {
				cookbook.mainRouter.navigate('list', {trigger: true});
			}
		}
	});
});

cookbook.addInitializer(function () {
	cookbook.applayout = new cookbook.AppLayout();
	cookbook.applayout.render();
});

cookbook.start();