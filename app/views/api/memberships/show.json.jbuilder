json.membership do
  json.extract! @membership, :id, :channel_id, :last_read
  json.extract! @membership.channel, :name
end

if @oldmembership 
  json.oldmembership do 
    json.extract! @oldmembership, :id, :channel_id, :last_read
    json.extract! @oldmembership.channel, :name
  end
end

json.focus @focus