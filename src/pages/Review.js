import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, Link, useHistory} from "react-router-dom"


function Review(){
	const [bussiness, setBussiness] = useState([]);
  	const {id} = useParams();
	const urlAPI = 'http://localhost:8000/api/bussiness';
    const reviewAPI = 'http://localhost:8000/api/review'

	 const history = useHistory();

    //token
    const token = localStorage.getItem("token");

	const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get(reviewAPI,{
        	params:{
        		id :id

        	}
        })
        .then((response) => {
            console.log(response.data.Bussiness);
            //set response user to state
            setBussiness(response.data.Bussiness);
		    
        })
    }

     //hook useEffect
    useEffect(() => {

        if(!token) {
            history.push('/');
        }
        
        fetchData();
    }, []);



    return(
    <div className="container mt-5">
      <div className="columns">
        <div className="column is-centered">
          <form >
            <div className="field has-addons">
              
              
            </div>
          </form>
          <table className="table is-striped is-bordered is-fullwidth mt-2">
            <thead>
              <tr >
                
                <th>Name</th>
                <th>Review</th>
                <th>Rating</th>
               
              </tr>
            </thead>
            <tbody>
            {bussiness.map((data)=>(

            	<tr key={data.id}>
            		<td>{data.buss_id}</td>
            		<td>{data.comment}</td>
            		<td>{data.rating}</td>
            	</tr>

            	))}
            	
            </tbody>
            
          </table>
          
        </div>
      </div>
    </div>
    
    )
}


export default Review;