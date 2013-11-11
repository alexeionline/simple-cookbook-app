;cookbook.Views.Recipes = Backbone.Marionette.CollectionView.extend({
	tagName:    'ul',
	className:  'rcp-lst',

	initialize: function (opt) {
		this.activeID = opt.activeID;
	},

	/**
	 * add class to active version of recipe 
	 * @return {[void]}
	 */
	onRender: function () {
		if (this.activeID) {
			this.$el.find('[data-id=' + this.activeID + ']').addClass('actv');
		}
	},

	itemView: cookbook.Views.RecipeView
});