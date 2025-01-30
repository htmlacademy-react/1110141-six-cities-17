export type Comment = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  review: string;
  rating: number;
}

export type PostComment = {
  review: string;
  rating: number;
}

export type Comments = Comment[];
