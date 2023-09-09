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
      players: {
        Row: {
          alive: boolean | null
          full_name: string | null
          id: string
          kill_arr: string[] | null
          role: string
          student_id: string | null
        }
        Insert: {
          alive?: boolean | null
          full_name?: string | null
          id: string
          kill_arr?: string[] | null
          role?: string
          student_id?: string | null
        }
        Update: {
          alive?: boolean | null
          full_name?: string | null
          id?: string
          kill_arr?: string[] | null
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
          target: string | null
        }
        Insert: {
          id: string
          target?: string | null
        }
        Update: {
          id?: string
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
