/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import Table from 'rc-table';
import {useState} from 'react';
import Map from "./../components/ui/Map";

function ListOfBooksPage() {
	const [data, setData] = React.useState(null);

	/**
	 * Data in form:
	 * {results: [
	 *   {isbn, author, title, call_no},
	 *   ...
	 * ]}
	 */

	React.useEffect(() => {
		let url = "https://library-guide.herokuapp.com/api/books?name=" + localStorage.getItem("name");
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setData(data.results)
			});
	}, []);

    const [text, setText] = useState(null);

    const changeText = (event) => {
        event.preventDefault();
        let changeIt = "Currently Searching Shortest Route, Please Be PATIENT!";
        setText(changeIt);
    };

	// Delete the books if clicked
	// const [deleteText, setdeleteText] = useState (null);

	const deleteBooks = (event) => {
        event.preventDefault();
        // let deleted = "will Delete now";
		// setdeleteText(deleted);
        if (localStorage.getItem("name") !== null) {
			const requestOptions = {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json;charset=utf-8'
			  },
			  body: JSON.stringify({name: localStorage.getItem("name")})
			};
	
			fetch("https://library-guide.herokuapp.com/api/remove", requestOptions)
			  .then(response => response.json())
			  .then(data => 
				{
				  try {
					setText(data.Status)
				  }
				  catch {
					setText("Error: Bad input")
				  }
				  window.location.reload(false);
				  //   window.location.href='https://route-finder.netlify.app/book-list';
			});
		} 
    };

	


	const columns = [
		{
		  title: 'Title',
		  dataIndex: 'title',
		  key: 'title',
		},
		{
		  title: 'Author',
		  dataIndex: 'author',
		  key: 'author',
		},
		{
		  title: 'Call Number',
		  dataIndex: 'call_no',
		  key: 'call_no',
		},
	];

    return (
        <div>
            <h1>Books to be Found</h1>

			{
				!localStorage.getItem("name") ?
				<a className="mui-btn mui-btn--raised" href="/">
					Login to See Your Books
				</a> :
				""
			}

            <Table columns={columns} data={data}></Table>
			
			<div id="buttons">
				<button className="mui-btn mui-btn--danger mui-btn--raised" onClick = {deleteBooks}>
					Remove Selected Items
				</button>
				{/* Onclick function will eventually display the map for a shortest path of the selected books */}
				<button className="mui-btn mui-btn--primary mui-btn--raised" onClick = {changeText}>
					View Map and Key
				</button>
				
			</div>

			{/* <div>
                {!deleteText ? " ": deleteText}
            </div> */}
            

            <div>
                {!text ? " ": text}
            </div>
     <React.StrictMode>
        <Map />
    </React.StrictMode>
			
        </div>
    );
}

export default ListOfBooksPage;
