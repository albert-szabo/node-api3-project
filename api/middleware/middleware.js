function logger(request, response, next) {
  // DO YOUR MAGIC

  const timestamp = new Date().toLocaleString();
  const method = request.method;
  const URL = request.originalUrl;

  console.log(`[${timestamp}] ${method} to ${URL}`);

  next();
}

function validateUserId(request, response, next) {
  // DO YOUR MAGIC
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