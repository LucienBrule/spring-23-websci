import {useEffect, useState} from "react";

type ItemId = number;

interface IndexState {
    items: Array<number>
}

interface Item {
    by: string,
    id: number,
    kids: Array<number>,
    "score": number,
    "time": number,
    "title": string,
    "type": string,
    "url": string

}


function ItemComponent(props: Item) {
    return <div>
        <h3 style={{'lineHeight': '1rem'}}>{props.title}</h3>
        <span style={{
            'display': 'flex',
            'alignItems': 'baseline',
        }}>
            <div style={{
                'marginRight': '1rem',
                'width': '5rem',
            }}
            >
                {props.by}
            </div>
            <div className={'item-score'}>{props.score}</div>
            <p className={'item-time'}>{props.time}</p>
            <a className={'item-url'}
               href={props.url}
            >{props.url}</a>
        </span>
    </div>

}

function ItemHOC(props: { item: Item }) {

    let [self, setSelf] = useState(props.item);

    useEffect(() => {
        console.log("ItemComponent mounted");
        console.log(props.item);

        let fetchSelf = async () => {

            try {

                let response = await fetch("https://hacker-news.firebaseio.com/v0/item/" + props.item.id + ".json");
                let data = await response.json();
                console.log(data);
                setSelf(data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchSelf();
    }, [props.item])


    return <ItemComponent {...self}/>
}

function Navbar() {
    return <div className={".navigation"}>

    </div>;
}

function Items(props: { state: { items: Array<number> | undefined }, element: (itemId: ItemId) => JSX.Element }) {
    return <div className={"Home.content"}>
        {
            props.state?.items?.map(props.element)
        }
    </div>;
}

export default function Index() {

    let [state, setState] = useState<IndexState>({items: []});
    let deserializeItemsFromResponse = async (response: Response) => {
        try {
            let items: Array<number> = await response.json()
            setState({...state, items})
        } catch (e) {
            console.error("Error parsing JSON. ", e)
        }
    }

    let fetchItems = async () => {
        try {
            console.log("fetching items")
            let response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
            await deserializeItemsFromResponse(response)
        } catch (e) {
            console.error("Failed to fetch: ", e)
            throw e
        }
    }

    useEffect(() => {
        console.log("Index mounted");
        fetchItems();
    }, [])

    return (
        <div>
            <Navbar/>
            <Items state={state} element={(itemId) => {
                // @ts-ignore
                // eslint-disable-next-line react/jsx-key
                return <ItemHOC item={{id: itemId}}/>
            }}/>

        </div>
    )
}


function Footer() {
    return <div className={".footer"}>
        Made with love by <a href={"https://rpi.edu/~/brulel"}>Lucien Brule</a>
    </div>;
}