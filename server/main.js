import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links'
import { WebApp } from 'meteor/webapp'
import ConnectRoute from 'connect-route'

Meteor.startup(() => {
  Meteor.publish('links', function() {
    return Links.find({})
  })
})

// Route user from short url to long url
function onRoute({ params: { token }}, res, next) {
  // find link where token == token
  const link = Links.findOne({ token })
  if (link) {
    // redirect (307) user to url assoc with that record
    res.writeHead(307, { 'Location': link.url })
    res.end()
  } else {
    // token doesnt exist; go to next middleware
    next()
  }
}

const middleware = ConnectRoute(function(router) {
  router.get('/:token', onRoute)
})

WebApp.connectHandlers.use(middleware)
