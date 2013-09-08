Syncd.Views.SearchAlbumIndex = Backbone.Marionette.CollectionView.extend({
  
  itemView: Syncd.Views.SearchAlbum,

  onRender: function(){
    $('#center .search .containers .albums .number').html(this.collection.pagination.total_entries);
  	$(".search .text span.albums").html(this.collection.pagination.total_entries);
  }

});