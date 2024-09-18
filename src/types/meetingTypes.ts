export interface Meeting {
  id: string;
  title: string;
  date: Date;
  link: string;
  user: string;
}

export interface NewMeeting {
  title: string;
  date: string;
  link?: string;
}