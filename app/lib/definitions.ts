export type EventWeibo = {
  id: number;
  content: string;
  href: string;
  date: Date;
};

//define a weibo struct,contain author name,href,author id, content ,date and like number
export class Weibo {
  id : number
  authorName: string;
  href: string;
  authorId: string;
  content: string;
  retweetContent: string;
  date: Date;
  likeNumber: string;

  constructor() {
    this.id = 0;
    this.authorName = "";
    this.href = "";
    this.authorId = "";
    this.content = "";
    this.retweetContent = "";
    this.date = new Date();
    this.likeNumber = "";
  }

  toString(): string {
    return `authorName:${this.authorName} href:${this.href} authorId:${this.authorId} content:${this.content} retweetContent:${this.retweetContent} date:${this.date} likeNumber:${this.likeNumber}`;
  }
}

export type WeiboDate = {
  date: Date;
};
