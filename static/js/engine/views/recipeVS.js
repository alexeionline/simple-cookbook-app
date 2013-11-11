;cookbook.Views.RecipeView = Backbone.Marionette.ItemView.extend({
	
	tagName:  'li',

	template: '#recipeViewState',

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
		'click .rcp-btn-vw':  'showRecipeInfo',
		'click .rcp-btn-edt': 'editRecipeInfo'
	},

	/**
	 * change route
	 * @return {[void]}
	 */
	showRecipeInfo: function () {
		cookbook.mainRouter.navigate(this.model.get('recipeID') + '/a/' +  this.model.get('id'), {trigger: true});
	},

	/**
	 * change route
	 * @return {[void]}
	 */
	editRecipeInfo: function () {
		cookbook.mainRouter.navigate(this.model.get('id') + '/edit', {trigger: true});
	}
});