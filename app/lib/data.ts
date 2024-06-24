import { Weibo, WeiboDate } from "./definitions";
import {sql} from '@vercel/postgres';

export async function fetchDateCount() {
    try{
        const count = await sql`select count(distinct date) from weibos`;
        return count.rows[0].count ;
    }catch(error){
        console.error('database error:',error);
        throw new Error(`Failed to fetch Date count ${error}`);
    }
}

const ITEMS_PER_PAGE = 1000;

export async function fetchDate(currentPage:number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try{
        const dates = await sql<WeiboDate>`select distinct date from weibos order by date desc limit ${ITEMS_PER_PAGE} offset ${offset} `;
        return dates.rows;
    }catch(error){
        console.error('database error:',error);
        throw new Error(`Failed to fetch Date count ${error}`);
    }
}

export async function fetchWeiboByDate(queryDate:Date | string) {
    try{
        let query : string;
        if (queryDate instanceof Date){
            query = dateToString(queryDate)
        }else{
            query = queryDate;
        }
        const queryDate_str = query.substring(0,4)+'-'+query.substring(4,6)+'-'+query.substring(6,8);
        const weibos = await sql.query<Weibo>(`select weibos.id,weibos.content,weibos.href,weibos.date  from weibos where date=$1`,[queryDate_str]);
        return weibos.rows;
    }catch(error){
        console.error('database error:',error);
        throw new Error(`Failed to fetch Date count ${error}`);
    }
}

export function dateToString(d:Date){
    return d.toISOString().split('T')[0];
}

export function smallToBig(query :string){
    const queryDate_str = query.substring(0,4)+'-'+query.substring(4,6)+'-'+query.substring(6,8);
    return queryDate_str;
}