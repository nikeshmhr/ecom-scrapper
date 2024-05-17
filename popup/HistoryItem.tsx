export default function HistoryItem({ title, url, timestamp }) {
    const onURLClicked = (clickedURL) => {
        chrome.tabs.create({ url: clickedURL });
    }

    return <div className="history_item">
        <p>{title}</p>
        <div>
            <p className="url">
                <a href={url} onClick={() => { onURLClicked(url) }}>URL</a>
            </p>
            <p className="timestamp">
                Last scraped: {new Date(timestamp).toLocaleDateString()}
            </p>
        </div>
    </div>
}