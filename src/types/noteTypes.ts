export interface Note {
    id?: string;
    _id?: string;
    title: string;
    content: string;
    user: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface NewNote {
    title: string;
    content: string;
  }