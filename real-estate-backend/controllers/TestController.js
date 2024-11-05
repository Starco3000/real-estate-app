const jwt = require('jsonwebtoken');

async function shouldBeLoggedIn(request, response) {
 console.log(request.userId)

  response.status(200).json({ message: 'You are Authenticated' });
}

async function shouldBeAdmin(request, response) {
    const token = request.cookies.token;

  if (!token)
    return response.status(401).json({ message: 'Not Authenticated' });
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return response.status(403).json({ message: 'Invalid Token' });
    if (!payload.isAdmin){
        return response.status(403).json({ message: 'Not Authorized' });
    }
  });

  response.status(200).json({ message: 'You are Authenticated' });
}

module.exports = { shouldBeLoggedIn, shouldBeAdmin };
