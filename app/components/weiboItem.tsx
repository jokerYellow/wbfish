import React from 'react';
import { Weibo } from '../lib/definitions';
import { formatTimeAgo } from '../utils';

interface WeiboItemProps {
    weibo: Weibo;
    history?: boolean;
  }

const WeiboItem:React.FC<WeiboItemProps> = ({weibo,history = false}) => {
    return (
        <div className={`${history?"bg-yellow-50":"bg-slate-100"} transition duration-200 ease-in-out hover:${history?"bg-yellow-50":"bg-blue-100"} p-2 rounded-sm font-sans antialiased text-gray-700 group`}>
          <div className="relative grid gap-1">
            <div className="flex justify-start content-start items-baseline gap-3">
              <a
                href={"https://weibo.com/u/" + weibo.authorId}
                className="text-gray-800 font-bold"
              >
                {weibo.authorName}{" "}
              </a>
              <span className="text-xs text-gray-500">
                {formatTimeAgo(weibo.date)}
              </span>
              <div className="grow"></div>
              <a
                href={weibo.href}
                target="_blank"
                className="text-xs text-gray-500"
              >
                原微博
              </a>
            </div>
            <p className="text-base">
              {weibo.content && weibo.content.endsWith("Translate content")
                ? weibo.content.slice(0, -"Translate content".length)
                : weibo.content}
            </p>
          </div>

          {weibo.retweetContent && (
            <div className={`grid gap-1 ${history ? "bg-yellow-100":"bg-slate-200"} last:group-hover:${history?"bg-yellow-100":"bg-blue-200"} p-2 rounded-sm mt-2 transition duration-200 ease-in-out`}>
              <p className="text-gray-800 font-bold">{weibo.retweetAuthor}</p>
              <p className=" text-base ">{weibo.retweetContent}</p>
            </div>
          )}
        </div>
    );
};

export default WeiboItem;