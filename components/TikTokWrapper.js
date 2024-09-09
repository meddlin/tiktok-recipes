'use client';

import { useEffect, useState, useRef } from "react";
// import { Helmet } from 'react-helmet';
import { TikTokEmbed } from "react-social-media-embed";

/**
 * Based on: https://github.com/andrewszucs/react-tiktok
 * 
 * The linked repo is for an npm package built to enable
 * embedding TikTok videos directly into React apps with
 * just the video URL. However, the code using `window`
 * and MutationObserver was breaking the component, as
 * a "window not available" error was happening.
 */

const TIKTOK_OEMBED_BASE_URL = `https://www.tiktok.com/oembed`;

/**
 * 
 * - url: The URL of the video hosted on TikTok. This will be concatenated
 *          with `TIKTOK_OEMBED_BASE_URL` to make an oembed API call for 
 *          the embed code.
 * - children: Meant to be used for passing in Markdown content. This will
 *          be converted to JSX by the MDX processing built into the app.
 *          Regular JSX (children) works just as well, too.
 * @param {string} url
 * @param {*} children
 * @returns 
 */
export function TikTokWrapper({ url, children }) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();
    const [html, setHtml] = useState();
    const [scriptSrc, setScriptSrc] = useState();

    const ref = useRef(null);

    // useEffect(() => {
    //     fetch(`${TIKTOK_OEMBED_BASE_URL}?url=${url}`)
    //         .then((res) => res.json())
    //         .then((res) => {
    //             const htmlString = res.html;
    //             const tempElement = document.createElement('div');
    //             tempElement.innerHTML = htmlString;

    //             const scriptTag = tempElement.getElementsByTagName('script')[0];
    //             // console.log(`scriptTag.src: ${JSON.stringify(stripTag.src)}`)

    //             setScriptSrc(scriptTag && scriptTag.src);
    //             setHtml(htmlString.substr(0, htmlString.indexOf('<script')));
    //         })
    //         .catch((err) => setError(err));
    // }, [url]);

    return (
        <>
            {/* <Helmet>
                <script id='ttEmbedder' async src={scriptSrc} />
            </Helmet> */}
            {/* <div
                ref={ref}
                style={{ display: 'flex' }}
            // dangerouslySetInnerHTML={{ __html: html || '' }}
            >{JSON.stringify(html)}</div> */}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TikTokEmbed url="https://www.tiktok.com/@tiggerninjafitness/video/7155596179513068846" width={325} />
            </div>

            {/* {children ? (
                <div style={{ display: 'flex' }}>
                    <div
                        ref={ref}
                        style={{ display: 'flex' }}
                        dangerouslySetInnerHTML={{ __html: html || '' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1em' }}>
                        {children}
                    </div>
                </div>) : (
                <div
                    ref={ref}
                    style={{ display: 'flex' }}
                    dangerouslySetInnerHTML={{ __html: html || '' }}
                />
            )} */}
        </>
    );
}