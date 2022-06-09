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
      next({ status: 404, message: 'user not found' });
      return;
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

  const { name } = request.body;
  if (!name || !name.trim()) {
    response.status(400).json({ message: 'missing required name field'});
  } else {
    request.name = name.trim();
    next();
  }
}

function validatePost(request, response, next) {
  // DO YOUR MAGIC

  const { text } = request.body;
  if (!text || !text.trim()) {
    response.status(400).json({ message: 'missing required text field' });
  } else {
    request.text = text.trim();
    next();
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};