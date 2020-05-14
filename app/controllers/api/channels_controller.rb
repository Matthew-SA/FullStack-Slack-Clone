class Api::ChannelsController < ApplicationController
  def index
    @memberships = Membership.where(user_id: current_user.id).includes(:channel)
    render 'api/channels/index'
  end

  def create
    timestamp = DateTime.now

    @channel = Channel.new(channel_params)
    @channel.last_message_posted = timestamp
    @channel.save

    @membership = Membership.create(user_id: current_user.id, channel_id: @channel.id, last_arrived: timestamp, last_departed: timestamp)

    @user = current_user
    @user.current_channel = @channel.id
    @user.save
    
    render 'api/channels/show'
  end

  private
  def channel_params
    params.require(:channel).permit(:name, :description)
  end
end
