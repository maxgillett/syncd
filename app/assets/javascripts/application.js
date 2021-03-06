// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery.ui.all
//= require jquery.superslides
//= require underscorejs
//= require backbone
//= require backbone-relational
//= require backbone-paginator
//= require backbone.marionette
//
//= require syncd
//
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require_tree ./routers
//= require_tree ../templates
//= require extensions/backbone.collection.idempotent
//= require backbone_sync-rails/rails_faye_subscriber
//= require_tree .


soundManager.setup({
  url: '/swf',
  flashVersion: 9, // optional: shiny features (default = 8)
  useFlashBlock: false, 
  preferFlash: true,
  onready: function() { }
});

