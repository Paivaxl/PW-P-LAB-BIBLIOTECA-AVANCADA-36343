const authService = require('../services/auth.service');

class AuthController {
  async signup(req, res, next) {
    try {
      const { email, password, name } = req.body;

      // Validação básica
      if (!email || !password || !name) {
        return res.status(400).json({
          error: 'Email, password e name são obrigatórios'
        });
      }

      const user = await authService.signup(email, password, name);

      res.status(201).json({
        message: 'Utilizador registado com sucesso',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      // Validação básica
      if (!email || !password) {
        return res.status(400).json({
          error: 'Email e password são obrigatórios'
        });
      }

      const user = await authService.signin(email, password);

      res.status(200).json({
        message: 'Login realizado com sucesso',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
