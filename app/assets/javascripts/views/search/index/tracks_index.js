Syncd.Views.SearchTrackIndex = Backbone.Marionette.CollectionView.extend({
  
  itemView: Syncd.Views.SearchTrack,

  onRender: function(){
  	$(".search .text span.songs").html(this.collection.pagination.total_entries);
  }

});