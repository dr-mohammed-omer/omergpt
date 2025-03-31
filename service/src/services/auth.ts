import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../config/database'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const SALT_ROUNDS = 10

export interface UserRegisterData {
  username: string
  password: string
  email: string
}

export interface UserLoginData {
  username: string
  password: string
}

export const authService = {
  async register(data: UserRegisterData) {
    const { username, password, email } = data
    
    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    )

    if (existingUser.rows.length > 0) {
      throw new Error('Username or email already exists')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    // Insert new user
    const result = await pool.query(
      'INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, hashedPassword, email]
    )

    const user = result.rows[0]
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' })

    return { user, token }
  },

  async login(data: UserLoginData) {
    const { username, password } = data

    // Find user
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username])
    const user = result.rows[0]

    if (!user) {
      throw new Error('User not found')
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      throw new Error('Invalid password')
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' })

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    }
  },

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
      const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [decoded.userId])
      return result.rows[0]
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
}