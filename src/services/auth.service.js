const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

class AuthService {
  async signup(email, password, name) {
   
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('Email já está registado');
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    });

    
    const token = this.generateToken(user.id, user.email);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token
    };
  }

  async signin(email, password) {
   
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('Email ou password inválidos');
    }

   
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Email ou password inválidos');
    }

 
    const token = this.generateToken(user.id, user.email);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token
    };
  }

  generateToken(userId, email) {
    return jwt.sign(
      { id: userId, email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }
}

module.exports = new AuthService();
