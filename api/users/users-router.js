const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();

router.get('/', (request, response, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS

  Users.get()
    .then(users => {
      response.json(users);
    })
    .catch(next);
});

router.get('/:id', validateUserId, (request, response) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id

  response.json(request.user);
});

router.post('/', validateUser, (request, response, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid

  Users.insert({ name: request.name })
    .then(newUser => {
      response.status(201).json(newUser);
    })
    .catch(next);
});

router.put('/:id', validateUserId, validateUser, (request, response, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  Users.update(request.params.id, { name: request.name })
    .then(() => {
      return Users.getById(request.params.id);
    })
    .then(updatedUser => {
      response.json(updatedUser);
    })
    .catch(next);
});

router.delete('/:id', validateUserId, (request, response, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id

  Users.remove(request.params.id)
    .then(() => {
      response.json(request.user);
    })
    .catch(next);
});

router.get('/:id/posts', validateUserId, (request, response, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id

  Users.getUserPosts(request.params.id)
    .then(posts => {
      response.json(posts);
    })
    .catch(next);
});

router.post('/:id/posts', validateUserId, validatePost, (request, response, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  Posts.insert({ user_id: request.params.id, text: request.text })
    .then(newPost => {
      response.status(201).json(newPost);
    })
    .catch(next);
});



router.use((error, request, response, next) => {
  response.status(error.status || 500).json({ message: error.message || 'An internal server error occurred within the users router.' });
})

// do not forget to export the router

module.exports = router;
