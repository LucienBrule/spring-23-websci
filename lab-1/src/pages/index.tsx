import {useEffect, useState} from "react";

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

    increment: number;
}


export async function getStaticProps() {

    let topStoriesRes
    try{
        topStoriesRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    }catch (e) {
        return {props: {itemIds: [], items: []}}
    }

    const itemIds: Array<number> = await topStoriesRes.json();
    let items: Array<Item> = [];


    // slice for demo
    for (let itemId of itemIds.slice(0, 50)) {
        let itemRes
        try{
            itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`);
            if(itemRes.status !== 200){
                continue;
            }
        }
        catch (e) {
            console.log("error fetching item", e)
            continue
        }
        const item: Item = await itemRes.json();
        items.push(item);
    }

    return {
        props: {
            itemIds,
            items,
            increment: 5
        }
    }

}

export default function NewsFeed(props: NewsFeedProps) {

    // cycle through the items, rendering props.increment at a time
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(props.increment);

    // a boolean for whether or not to auto cycle every props.increment seconds
    const [autoCycle, setAutoCycle] = useState(false);

    // an effect that will auto cycle every props.increment seconds
    useEffect(() => {
        if (autoCycle) {
            const interval = setInterval(() => {
                next()
            }, 5000);
            return () => clearInterval(interval);
        }


    }, [autoCycle, end, start])

    const next = () => {
        if (end  >= props.items.length) {
            setStart(0);
            setEnd(props.increment);
            return
        }
        setStart(start + props.increment);
        setEnd(end + props.increment);
    }

    const prev = () => {
        setStart(start - 5);
        setEnd(end - 5);
    }

    const toggleAutoCycle = () => {
        setAutoCycle(!autoCycle);
    }

    const items = props.items.slice(start, end);


    return (
        <div className={"news-feed"}>
            <div className={"news-feed__header"}>
                <button
                    onClick={prev}
                    disabled={start === 0}
                >Prev
                </button>
                <button
                    onClick={next}
                    disabled={end === props.items.length}
                >Next
                </button>
                <button
                    onClick={toggleAutoCycle}
                >{autoCycle ? "Stop" : "Start"} Auto Cycle
                </button>

                <span>{start} / {props.items.length}</span>
            </div>
            {
                items.map((item) => {
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
    if (!url) {
        return "";
    }
    try {

        return url.split("/")[2];
    } catch (e) {
        console.error(e)
    }
}
