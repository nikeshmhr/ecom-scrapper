import { useEffect, useState } from "react"
import "./style.css"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { url } from "inspector";
import { HISTORY_COLLECTION_NAME } from "~constants";
import db from "~firebase";
import HistoryItem from "./HistoryItem";

function IndexPopup() {
  const [scrapableTabs, setScrapableTabs] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchScrapableTabs() {
      const scrapableTabs = await chrome.tabs.query({
        url: [
          'https://www.daraz.com.np/*'
        ]
      });

      console.log(scrapableTabs);
      setScrapableTabs(scrapableTabs);
    }
    fetchScrapableTabs();
  }, [])

  useEffect(() => {
    async function fetchHistory() {
      const historyRef = collection(db, HISTORY_COLLECTION_NAME);
      const q = query(historyRef, orderBy("timestamp", "desc"))
      const qSnapshot = await getDocs(q);
      const history = [];
      qSnapshot.forEach(doc => history.push(doc.data()));

      console.log({ history })
      setHistory(history);
    }

    fetchHistory();
  }, []);

  const handleActivateTab = (tabId) => {
    chrome.tabs.update(tabId, {
      active: true,
    })
  }

  return (
    <div className="wrapper">
      <h5>Scrapable tabs</h5>
      {
        scrapableTabs.length === 0 && <p>You don't have any open tabs that can be scrapped.</p>
      }
      {
        scrapableTabs.length > 0 && (<>
          <ul>
            {
              scrapableTabs.map(tab => <li key={tab.id} onClick={() => handleActivateTab(tab.id)}><p>{tab.title}</p></li>)
            }
          </ul>
        </>
        )
      }

      <h5>History</h5>
      {
        history.length === 0 && <p>You don't have scrapping history.</p>
      }

      {
        history.length > 0 && (<>
          <ul>
            {
              history.map(history => <li key={history.id}>
                <HistoryItem title={history.title} url={history.url} timestamp={history.timestamp} />
              </li>)
            }
          </ul>
        </>
        )
      }
    </div>
  )
}

export default IndexPopup
