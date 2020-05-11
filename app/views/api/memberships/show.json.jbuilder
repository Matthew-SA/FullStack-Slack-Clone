json.membership do
  json.extract! @membership, :id, :channel_id, :last_arrived, :last_departed
  json.extract! @membership.channel, :name
end

json.oldmembership do 
  json.extract! @oldmembership, :id, :channel_id, :last_arrived, :last_departed
  json.extract! @oldmembership.channel, :name
end