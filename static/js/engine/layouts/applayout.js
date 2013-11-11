;cookbook.AppLayout = Backbone.Marionette.Layout.extend({

	el: '.cookbook',

	template: "#appLayout-tmpl",

	regions: {
		content: ".pg-cnt"
	},

	events: {
		'click .nw-rcp-btn': 'createNewRecipe',
		'click .pg-hd-tl a': 'showRecipesList'
	},
	/**
	 * show new recipe form
	 * @return {[void]}
	 */
	createNewRecipe: function () {
		cookbook.mainRouter.navigate('new', {trigger: true});
	},
	/**
	 * show recipes list
	 * @param  {[event]} e
	 * @return {[void]}
	 */
	showRecipesList: function (e) {
		e.preventDefault();
		cookbook.mainRouter.navigate('list', {trigger: true});		
	}


});