Syncd.Views.SearchTrack = Backbone.Marionette.ItemView.extend({
	initialize: function(options) {
    _.bindAll(this);

	this.status = this.model.get("audio");
	if (!this.status) {
		this.deactivate();
	}

    // Make unselectable
    this.$el.attr('unselectable', 'on');
    this.$el.css('user-select', 'none');
    
    this.bindTo(this.model, "stop", this.stop);
    this.bindTo(this.model, "play", this.play);
    this.bindTo(this.model, "deactivate", this.deactivate);

    this.state = Syncd.state;
    this.index = this.model.collection.indexOf(this.model);

  },

  className: "track",

  template: "searches/index/song",

  events: function() {
  	obj = {};

	if (this.status) {
		obj.dblclick = "clickPlay";
		obj.click = "highlight"
	}

    return obj;
  },

  clickPlay: function() {
    this.model.play();
  },

  highlight: function() {
    $(".track:not(.bar)").removeClass("active");
    this.$el.addClass("active");
  },

  play: function() {
  	$(".status", this.el).addClass("playing");
  	this.$el.on("dblclick", this.clickStop);
  },

  clickStop: function() {
    this.model.stop();
  },

  stop: function() {
  	$('.status',this.el).removeClass("playing");
    this.$el.on("dblclick", this.clickPlay);
    this.state.id = null;
  },

  deactivate: function() {
  	this.model.set("audio", null)
    this.$el.removeClass("active");
  	this.$el.addClass("unplayable");
  }

});