import {useState} from "react";

interface Item {
    by: string,
    id: number,
    kids: Array<number>,
    score: number,
    time: number,
    title: string,
    type: string,
    url: string

}

interface NewsFeedProps {
    itemIds: Array<number>;
    items: Array<Item>;
}


export async function getStaticProps() {
    const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const itemIds: Array<number> = await res.json();
    let items: Array<Item> = [];

    // slice for demo
    for (let itemId of itemIds.slice(0,50)) {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`);
        const item: Item = await res.json();
        items.push(item);
    }

    return {
        props: {
            itemIds,
            items
        }
    }

}

export default function NewsFeed(props: NewsFeedProps) {



    return (
        <div className={"news-feed"}>
            {
                props.items.map((item) => {
                    return <ItemComponent item={item} key={item.id}/>
                })
            }
        </div>
    )
}

function ItemComponent(props: { item: Item }) {
    return (
        <div className={"item-component"}>
            <span style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline"
            }}>
                <h3><a
                    style={{textDecoration: "none",}}
                    href={props.item.url}>
                        {props.item.title}
                </a></h3>
                <span style={{marginLeft: "1em"}}>
                     <a href={props.item.url}>
                        {getBaseUrl(props.item.url)}
                    </a>
                </span>

            </span>
            <span style={
                {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    justifyContent: "space-between"

                }}>
                <div>By: {props.item.by}</div>
                <div>Score: {props.item.score}</div>
            </span>
        </div>
    )
}

function getBaseUrl(url: String) {
    if(!url){
        return "";
    }
    try{

        return url.split("/")[2];
    }
    catch (e){
        console.error(e)
    }
}
