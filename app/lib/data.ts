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
        let query ;
        if (queryDate instanceof Date){
            query = dateToString(queryDate)
        }else{
            query = queryDate;
        }
        const weibos = await sql.query<Weibo>(`select weibos.id,weibos.content,weibos.href,weibos.date  from weibos where date=$1`,[query]);
        return weibos.rows;
    }catch(error){
        console.error('database error:',error);
        throw new Error(`Failed to fetch Date count ${error}`);
    }
}

export function dateToString(d:Date){
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()+1}`
}