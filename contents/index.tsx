import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo";
import styleText from "data-text:./style.css";
import icon from "data-base64:~assets/icon.png"
import { useEffect, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";

export const getStyle: PlasmoGetStyle = () => {
    const style = document.createElement("style")
    style.textContent = styleText;
    return style;
}

export const config: PlasmoCSConfig = {
    matches: ['https://www.daraz.com.np/*']
}

const productLocator = [
    "[data-qa-locator='product-item']"
]

function ContentUI() {
    const [isScrapping, setIsScrapping] = useState(false);
    const [pageScrapeData, setPageScrapeData] = useState(null);

    const handleScrape = async () => {
        if (isScrapping)
            return;
        setIsScrapping(true);
        const productsNodes = document.querySelectorAll(productLocator[0]);
        const products = [];
        for (let i = 0; i < productsNodes.length; i++) {
            const image = productsNodes[i].querySelector("img#id-img").getAttribute("src");
            const title = productsNodes[i].querySelector("div#id-title").textContent;
            const description = title;
            const price = productsNodes[i].querySelector("div#id-price>div>div").textContent;

            products.push({
                image, title, description, price
            })
        }
        await sendToBackground({ name: 'persist', body: { products } })
        setIsScrapping(false);
    };

    useEffect(() => {
        async function getScrappingDetails() {
            const res = await sendToBackground({ name: 'getScrappingDetails', body: {} })
            if (res && res.url)
                setPageScrapeData(res);
        }
        getScrappingDetails();
    }, []);

    return <div className="ext_wrapper">
        <button className="icon_wrapper" onClick={handleScrape}>
            <img src={icon} />
        </button>
        {isScrapping && <p>Scrapping...</p>}
        {pageScrapeData && <p>Last scraped on: {new Date(pageScrapeData.timestamp).toLocaleDateString()}</p>}
    </div>
}

export default ContentUI;