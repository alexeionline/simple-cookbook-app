;cookbook.Views.RecipeEdit = Backbone.Marionette.ItemView.extend({
	template: '#recipeEditState',

	templateHelpers: {
		/**
		 * date format helper 
		 * use moment.js
		 * @return {[string]}
		 */
		getTime: function () {
			return  moment(this.date).format('MMMM Do YYYY, h:mm:ss a');
		}
	},

	events: {
		'click .rcp-btn-sv':  'saveEditedRecipe',
		'click .rcp-btn-cnl': 'showRecipeInfo'
	},

	ui: {
		description: 'textarea[name=description]',
		errorMsg:	 '.rcp-err-msg'
	},

	/**
	 * simple validation
	 * send recipe new version data to server
	 * @return {[void]}
	 */
	saveEditedRecipe: function () {
		if (this.model.get('description') === this.ui.description.val()) {
			this.ui.errorMsg.text('Description was not changed').show();
		} else if (this.ui.description.val() === '') {
			this.ui.errorMsg.text('Description is required').show();
		} else {
			this.ui.errorMsg.hide();
			cookbook.recipes.create({
				recipeID:       this.model.get('recipeID'),
				title:          this.model.get('title'),
				description:    this.ui.description.val()
			}, {
				wait: true
			});
		}		
	},

	/**
	 * change route
	 * @return {[void]}
	 */
	showRecipeInfo: function () {
		cookbook.mainRouter.navigate(this.model.get('recipeID') + '/a/' +  this.model.get('id'), {trigger: true});
	}
});