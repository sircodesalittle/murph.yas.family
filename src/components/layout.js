import React, { useState } from "react"
import { Helmet } from "react-helmet"
import 'cirrus-ui';

function Layout({children}) {
    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
    };
    
    return (   
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>YAS Murph</title>
                <link rel="canonical" href="http://murph.yas.family" />

                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge;" />
            
                <link href="https://unpkg.com/cirrus-ui" type="text/css" rel="stylesheet" />
            
                <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:200,300,400,600,700" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet"/>

                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous"/>

                <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
            </Helmet>
            <body>
                <div class="header header-fixed unselectable header-animated">
                    <div class="header-brand">
                        <div class="nav-item no-hover">
                            <h6 class="title">Murph.YAS</h6>
                        </div>
                        <div className={isActive ? 'nav-item nav-btn active': 'nav-item nav-btn'} onClick={toggleClass}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div class={isActive ? 'header-nav active': 'header-nav'}>
                        <div class="nav-left">
                            <div class="nav-item text-center">
                                <span className="u u-LR">
                                <a href="spotify:playlist:0UAPiXhYnNrndtZpEzPLjX">
                                    Official Playlist
                                    <span class="icon">
                                        <i class="fab fa-wrapper fa-spotify" aria-hidden="true"></i>
                                    </span>
                                </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                { children }
                
            </body>
        </div>
    )
}
export default Layout