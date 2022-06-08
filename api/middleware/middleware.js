const Users = require('../users/users-model');

function logger(request, response, next) {
  // DO YOUR MAGIC

  const timestamp = new Date().toLocaleString();
  const method = request.method;
  const URL = request.originalUrl;

  console.log(`[${timestamp}] ${method} to ${URL}`);

  next();
}

async function validateUserId(request, response, next) {
  // DO YOUR MAGIC

  try {
    const user = await Users.getById(request.params.id);
    if (!user) {
      response.status(404).json({ message: 'user not found' });
    } else {
      request.user = user;
      next();
    }
  } catch (error) {
    response.status(500).json({ message: 'An internal server error occurred.' });
  }
}

function validateUser(request, response, next) {
  // DO YOUR MAGIC
}

function validatePost(request, response, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};