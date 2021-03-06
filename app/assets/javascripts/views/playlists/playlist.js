Syncd.Views.Playlist = Backbone.View.extend({
  tagName: "li",

  events: {
  	"dblclick": "editPlaylist",
    "click": "setActive"
  },

  initialize: function(options) {
    _.bindAll(this);
    this.vent = options.vent;
    this.vent.on("deletePL", this.deletePlaylist);
    this.model.get("songs").on("add", this.updateCount);
    this.model.get("songs").on("remove", this.updateCount);
    this.model.get("songs").on("reset", this.updateCount);
    this.model.on("change:name", this.render);
    this.model.on("setActive", this.setActive);
  },

  render: function () {
    var self = this;
    this.$el.html(JST["playlists/playlist"]({playlist: this.model})).droppable({
      activeClass: "ui-state-active",
      hoverClass: "ui-state-hover",
      drop: self.model.droppableFunc
      });
    return this;
  },

  editPlaylist: function(eventName) {
    var self = this;
  	this.$el.html(JST["playlists/new_playlist"]({playlist: this.model}));
    $(document).not(document.getElementById('editPlaylistName')).on("click", this.saveName);
    $(document).keyup(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode == '13') {
        self.saveName();
      }
    });
  },

  saveName: function() {
    $(document).unbind("keyup");
    $(document).not(document.getElementById('editPlaylistName')).unbind("click");
  	var newName = $("input", this.el).val();
  	this.model.set("name", newName);
  	this.model.save();
  	this.render();
  },

  deletePlaylist: function() {
    var id = this.model.id;
    this.$("span", this.$el).animate({
      left: '15px'
    }, 300 );
    this.$el.append("<div class='delete-button' data-id='"+id+"'></div>");
    $(".delete-button", this.$el).animate({
      left: '6px'
    }, 300 );
  },

  updateCount: function() {
    $(".num", this.el).html(this.model.get("songs").length);
  },

  setActive: function() {
    var self = this;
    $(".active").removeClass("active");
    this.$el.addClass('active');
    router.navigate("playlists/" + this.model.id);
    
    this.model.assureFetched(function() {
      var songsView = new Syncd.Views.SongsIndex({collection: self.model.get("songs"), state: this.state});
      Syncd.centerRegion.show(songsView);
      var subscriberView = new Syncd.Views.SubscribersIndex({collection: self.model.get("subscribers")});
      Syncd.right_layout.subscribers.show(subscriberView);
      var tagsView = new Syncd.Views.TagsIndex({collection: self.model.get("tags")});
      Syncd.right_layout.tags.show(tagsView);
    });

  }

});