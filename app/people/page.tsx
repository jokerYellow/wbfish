import React from 'react';
import { fetchAllWeibos } from '../lib/data';

const Page: React.FC = async () => {
    const weibos = await fetchAllWeibos()
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
            {items}
        </div>
    );
};

export default Page;