export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      kill_feed: {
        Row: {
          created_at: string
          id: number
          player_id: string | null
          target_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          player_id?: string | null
          target_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          player_id?: string | null
          target_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kill_feed_player_id_fkey"
            columns: ["player_id"]
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kill_feed_target_id_fkey"
            columns: ["target_id"]
            referencedRelation: "players"
            referencedColumns: ["id"]
          }
        ]
      }
      players: {
        Row: {
          alive: boolean
          full_name: string | null
          id: string
          kill_arr: string[]
          role: string
          student_id: string | null
        }
        Insert: {
          alive?: boolean
          full_name?: string | null
          id: string
          kill_arr?: string[]
          role?: string
          student_id?: string | null
        }
        Update: {
          alive?: boolean
          full_name?: string | null
          id?: string
          kill_arr?: string[]
          role?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "players_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      targets: {
        Row: {
          id: string
          kill_code: string | null
          target: string | null
        }
        Insert: {
          id: string
          kill_code?: string | null
          target?: string | null
        }
        Update: {
          id?: string
          kill_code?: string | null
          target?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "targets_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "targets_target_fkey"
            columns: ["target"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
