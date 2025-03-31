import pool from '../config/database'
import type { ChatMessage } from '../chatgpt'
import type { RequestProps } from '../types'

export interface SaveChatOptions {
  userId: number
  prompt: string
  response: string
  conversationId?: string
  parentMessageId?: string
  systemMessage?: string
  temperature?: number
  top_p?: number
}

export const chatService = {
  async saveChat(options: SaveChatOptions) {
    const {
      userId,
      prompt,
      response,
      conversationId,
      parentMessageId,
      systemMessage,
      temperature,
      top_p,
    } = options

    const result = await pool.query(
      `INSERT INTO chat_history 
      (user_id, conversation_id, parent_message_id, prompt, response, system_message, temperature, top_p)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [userId, conversationId, parentMessageId, prompt, response, systemMessage, temperature, top_p]
    )

    return result.rows[0]
  },

  async getChatHistory(userId: number) {
    const result = await pool.query(
      'SELECT * FROM chat_history WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    )
    return result.rows
  },

  async getChatByConversation(userId: number, conversationId: string) {
    const result = await pool.query(
      'SELECT * FROM chat_history WHERE user_id = $1 AND conversation_id = $2 ORDER BY created_at ASC',
      [userId, conversationId]
    )
    return result.rows
  },

  async deleteChat(userId: number, chatId: number) {
    await pool.query(
      'DELETE FROM chat_history WHERE id = $1 AND user_id = $2',
      [chatId, userId]
    )
  },

  async deleteChatsByConversation(userId: number, conversationId: string) {
    await pool.query(
      'DELETE FROM chat_history WHERE user_id = $1 AND conversation_id = $2',
      [userId, conversationId]
    )
  }
}