import React from 'react';
import { fetchAllWeibos } from '../lib/data';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone' // 导入插件
import utc from 'dayjs/plugin/utc' // 导入插件

const Page: React.FC = async () => {
    const weibos = await fetchAllWeibos()
    dayjs.extend(timezone)
    dayjs.extend(utc)
    const refreshTime = dayjs().tz("Asia/Shanghai").format("YYYYMMDD HH:mm:ss");
    const items = weibos.reverse().map((weibo) => {
        return (
            <div key={weibo.id} className="bg-gray-100 p-2 mb-2 rounded-lg">
                <p className="text-black font-sans text-xs">{weibo.authorName} <span className="text-gray-500 text-xs">{weibo.date.toLocaleDateString()}</span></p>
                <a href={weibo.href} target="_blank" className="text-sm text-blue-500 hover:underline">{weibo.content}</a>
                {weibo.retweetContent && (
                    <p className="text-gray-700 text-sm bg-gray-200 p-2 rounded-lg">{weibo.retweetContent}</p>
                )}
            </div>
        );
    });

    return (
        <div >
            <p className='text-black'>{refreshTime}</p>
            {items}
        </div>
    );
};

export const revalidate = 3600;
 
export default Page;