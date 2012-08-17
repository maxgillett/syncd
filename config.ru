# This file is used by Rack-based servers to start the application.
require 'rubygems'
require 'bundler'
Bundler.require
require 'faye'

require ::File.expand_path('../config/environment',  __FILE__)
run Syncd::Application

faye_server = Faye::RackAdapter.new(:mount => '/faye', :timeout => 45)
faye_server.add_extension(ServerAuth.new)
run faye_server