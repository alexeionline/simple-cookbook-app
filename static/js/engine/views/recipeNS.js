;cookbook.Views.RecipeNew = Backbone.Marionette.ItemView.extend({
	template: '#recipeNewState',

	events: {
		'click .rcp-btn-sv':  'saveNewRecipe',
		'click .rcp-btn-cnl': 'showRecipesList'
	},

	ui: {
		title:          'input[name=title]',
		description:    'textarea[name=description]',
		errorMsg:	 	'.rcp-err-msg'
	},

	/**
	 * simple inputs validation 
	 * send new recipe data on server
	 * @return {[void]}
	 */
	saveNewRecipe: function () {
		if (this.ui.title.val() === '') {
			this.ui.errorMsg.text('Title is required').show();
		} else if (this.ui.description.val() === '') {
			this.ui.errorMsg.text('Description is required').show();
		} else {
			this.ui.errorMsg.hide();
			cookbook.recipes.create({
				title: this.ui.title.val(),
				description: this.ui.description.val()
			}, {
				wait: true
			});
		}
	},
	
	/**
	 * change route
	 * @return {[void]}
	 */
	showRecipesList: function () {
		cookbook.mainRouter.navigate('list', {trigger: true});		
	}
});