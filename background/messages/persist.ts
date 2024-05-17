import type { PlasmoMessaging } from "@plasmohq/messaging";
import { addDoc, collection } from "firebase/firestore";
import { DATA_COLLECTION_NAME, HISTORY_COLLECTION_NAME } from "~constants";
import db from "~firebase";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    const url = req.sender.url;
    const title = req.sender.tab.title;
    for (const product of req.body?.products) {
        await addDoc(collection(db, DATA_COLLECTION_NAME), { ...product, url });
    }

    // At the end, save details of url that was scraped
    await addDoc(collection(db, HISTORY_COLLECTION_NAME), {
        url,
        timestamp: Date.now(),
        title
    })

    res.send({})
}

export default handler;