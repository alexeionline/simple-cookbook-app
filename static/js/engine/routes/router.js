;cookbook.MainRouter = Backbone.Marionette.AppRouter.extend({

	routes: {
		"list":             "showRecipesList",
		"new":              "newRecipe",
		":id/edit":         "editRecipe",
		":recipeID/a/:id":  "showRecipe"
	},

	/**
	 * sort our recipes list by created date
	 * get unique recipes by recipeID (latest version of each recipe)
	 * render this recipes list into app layout 
	 * @return {[void]}
	 */
	showRecipesList: function () {
		var recipesLastVersion
		,   recipesView
		;

		cookbook.recipes.sort();

		recipesLastVersion = new cookbook.Collections.Recipes(	
			_.uniq(cookbook.recipes.models, function (model) {return model.get("recipeID");})
		);

		recipesView = new cookbook.Views.Recipes({
			collection: recipesLastVersion
		});

		cookbook.applayout.content.show(recipesView);	
	},

	/**
	 * get all version of needed recipe (using recipeID)
	 * render all recipe version into app layout
	 * set latest version as active  
	 * @param  {[string]} recipeID
	 * @param  {[string]} id
	 * @return {[void]}
	 */
	showRecipe: function (recipeID, id) {
		var recipeAllVersion
		,   recipesView
		;

		recipeAllVersion = new cookbook.Collections.Recipes(
			cookbook.recipes.where({
				'recipeID': recipeID
			})
		);

		recipesView = new cookbook.Views.Recipes({
			collection: recipeAllVersion,
			activeID: id
		});

		cookbook.applayout.content.show(recipesView);
	},

	/**
	 * get needed model from our recipes collection
	 * render edit recipe form into layout
	 * @param  {[string]} id
	 * @return {[void]}
	 */
	editRecipe: function (id) {
		var recipe
		,   recipeEditView
		;

		recipe = cookbook.recipes.findWhere({
			'id': id
		});

		recipeEditView = new cookbook.Views.RecipeEdit({
			model: recipe
		});

		cookbook.applayout.content.show(recipeEditView);
	},

	/**
	 * render new recipe form into layout
	 * @return {[void]}
	 */
	newRecipe: function () {
		var recipeNewView;
		recipeNewView = new cookbook.Views.RecipeNew;
		cookbook.applayout.content.show(recipeNewView);
	}
});