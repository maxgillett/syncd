Syncd.Layouts.Search = Backbone.Marionette.Layout.extend({
	initialize: function() {
		
	},

	template: "searches/layout",
	className: "search",
  	regions: {
    	artists: ".artists .items",
    	albums: ".albums .items",
    	playlists: ".playlists",
    	tracks: ".tracks"
	}

});