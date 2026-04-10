const authService = require('../services/auth.service');

const authenticate = (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Token não fornecido ou formato inválido'
      });
    }

    const token = authHeader.substring(7); 

   
    const decoded = authService.verifyToken(token);

    
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      error: error.message || 'Não autorizado'
    });
  }
};

module.exports = authenticate;
