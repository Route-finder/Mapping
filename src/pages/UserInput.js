/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {useState, useEffect} from 'react';

function UserInput () {

    const [data, setData] = useState(null);
    const [text, setText] = useState(null);
    
   
    const clickHandler = (event) => {
        // When clicked, set text to value of input box
        event.preventDefault();
        // console.log("Clicked");
        let s = document.getElementById("search");
        let b = document.getElementById("search1");
        let c = document.getElementById("search2");


        setText(s.value);
       
    };

}

export default UserInput;