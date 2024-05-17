import type { PlasmoMessaging } from "@plasmohq/messaging";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    console.log({ req })
    const message = await new Promise((res, rej) => {
        setTimeout(() => { res("successful") }, 5000)
    })

    res.send({ message })
}

export default handler;