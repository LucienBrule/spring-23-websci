import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
function Splash(){

    return (
        <div>
            <img
                className={"splash"}
                src={useBaseUrl('/img/logo.png')}
                alt="WebSci"
            />
        </div>
    )

}

export default Splash;