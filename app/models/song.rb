class Song < ActiveRecord::Base
  attr_accessible :artist, :title, :url, :id
  has_and_belongs_to_many :playlists

  def faye_channel(*args)
  	playlist_id = args.join 
  	::Rails.logger.info('songs'+playlist_id)
  	return 'songs'+playlist_id

  end
end