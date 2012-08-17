Syncd.Models.Song = Backbone.Model.extend({

  initialize: function() {
    _.bindAll(this);
    try {
      this.initSongs();
    } catch (err) {
      // do nothing
    }
   },

  initSongs: function() {
    //filter out where playlist doesn't exist
  	var self = this;
    var p_id = this.collection.parent.id.toString();
  	var m_id = this.id.toString();
    var id = "id-" + p_id + "-" + m_id;
    soundManager.createSound({
      id: id,
      url: this.get("audio"),
      autoLoad: false,
      autoPlay: false,
      onload: function() {
      },
      onplay: function() {
      },
      onresume: function() {
        self.trigger("resumed", self);
      },
      whileloading: function() {
        //console.log(this.durationEstimate);
      },
      onfinish: function() {
        self.nextSong();
    	},
      onstop: function() {
        self.trigger("stop");
      },
      onpause: function() {
        self.trigger("stop");
      },
      volume: 50
    });
  },

  nextSong: function() {
    var index = this.collection.indexOf(this);
    var nextModel = this.collection.at(index+1);
    var nextModelid = nextModel.id.toString();
    var nextModelpid = nextModel.collection.parent.id.toString();
    var currentModel = this; 
    var currentModelid = currentModel.id.toString();

    // Play upcoming song
    soundManager.getSoundById("id-"+nextModelpid+"-"+nextModelid).play();

    // Remove play view for previous song
    this.trigger("stop");

    // Trigger upcoming song to play view
    nextModel.trigger("play");

    // Update state
    //console.log(window);
    //window.Syncd.playlists.trigger("stateChange",nextModelid);
    //this.collection.trigger("stateChange", nextModelid);
  }, 

  play: function() {
    soundManager.pauseAll();
    var id = "id-" + this.collection.parent.id.toString() + "-" + this.id.toString();
    soundManager.play(id);
    this.trigger("play");
  },

  stop: function() {
    var id = "id-" + this.collection.parent.id.toString() + "-" + this.id.toString();
    soundManager.pause(id);
    console.log(id);
  },

  delete: function() {
    var id = "id-" + this.collection.parent.id.toString() + "-" + this.id.toString();
    soundManager.destroySound(id);
    this.destroy();
    //this.collection.remove(this.model);
  }

});