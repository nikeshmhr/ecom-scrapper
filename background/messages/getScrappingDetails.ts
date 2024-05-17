import type { PlasmoMessaging } from "@plasmohq/messaging";
import { collection, getDocs, query, where } from "firebase/firestore";
import { HISTORY_COLLECTION_NAME } from "~constants";
import db from "~firebase";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    const url = req.sender.url;

    const historyRef = collection(db, HISTORY_COLLECTION_NAME);
    const q = query(historyRef, where("url", "==", url))
    const qSnapshot = await getDocs(q);

    if (qSnapshot.size == 0)
        return null;
    const data = [];
    qSnapshot.forEach(doc => data.push(doc.data()));

    res.send(data[0])
}

export default handler;