/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Wrapper from '../components/ui/Wrapper';
import {useState} from 'react';

function AddBooksPage() {

  const [text, setText] = useState(null);
    
    const clickHandler = (event) => {
      // When clicked, set text to value of input box
      event.preventDefault();
      // console.log("Clicked");
      let title = document.getElementById("search");
      let isbn = document.getElementById("search1");
      let author = document.getElementById("search2");

      /**
       * Submit request to backend with info for OCLC request
       */

      // If ISBN provided, select the first result
      if (isbn.value !== "") {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({isbn: isbn.value, name: localStorage.getItem("name")})
        };

        fetch("https://library-guide.herokuapp.com/api/search", requestOptions)
          .then(response => response.json())
          .then(data => 
            {
              try {
                setText(data.book.title)
              }
              catch {
                setText("Error: Bad input")
              }
            });
      }

      // If title or author provided, send as a request
      else if (author.vaule !== "" || title.value !== "") {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({author: author.vaule, title: title.value, name: localStorage.getItem("name")})
        };
        
        fetch("https://library-guide.herokuapp.com/api/search", requestOptions)
          .then(response => response.json())
          .then(data =>
            {
              try {
                setText(data.book.title)
              }
              catch {
                setText("Error: Bad input")
              }
            }
          );
      }
    };

    return (
      <div>
        <h1 id="welcome">
          Enter a search term below:
        </h1>
        <Wrapper>
          <form className = 'form'>
            {/* <div>
              
              <input id="search" type = "checkbox"></input>
            </div> */}
            <div>
              <p>Book Title: </p>
              <input id="search" type = "text"></input>
            </div>
            <div>
              <p>ISBN Number: </p>
              <input id="search1" type = "text"></input>
            </div>
            <div>
              <p>Author: </p>
              <input id="search2" type = "text"></input>
            </div>
            <br></br>
            <div>
              <button class="mui-btn mui-btn--primary mui-btn--raised" onClick = {clickHandler}>Search</button>
            </div>
          </form>

          <p>
            {!text ? "Empty Basket, please choose a book": text}
          </p>

        </Wrapper>
      </div>
      
        
    )

}

export default AddBooksPage;