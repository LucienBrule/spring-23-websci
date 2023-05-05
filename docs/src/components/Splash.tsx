import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
function Splash(){

    return (
        <div>
            <img
                className={"splash"}
                src={useBaseUrl('/img/sisman.jpeg')}
                alt="WebSci"
            />
        </div>
    )

}

export default Splash;