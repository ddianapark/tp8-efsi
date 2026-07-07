export interface Comment {
  id: string;
  username: string;
  text: string;
}

export interface CatApiResponse {
  id: string;
  url: string;
  width?: number;
  height?: number;
}

export interface CatPost {
  id: string;
  url: string;
  username: string;
  avatar: string;
  location: string;
  likes: number;
  caption: string;
  isLiked: boolean;
  comments: Comment[];
}

export interface Story {
  id: string;
  username: string;
  avatar: string;
}