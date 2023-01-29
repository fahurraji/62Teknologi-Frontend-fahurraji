import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, Link, useHistory} from "react-router-dom"


function Detail(){
	const {id,lat,long} = useParams();
	const [bussiness, setBussiness] = useState([]);
	const history = useHistory();

    //token
    const token = localStorage.getItem("token");
    const urlAPI = 'http://localhost:8000/api/bussiness';
    const reviewAPI = 'http://localhost:8000/api/review'
    //function "fetchData"
    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get(urlAPI,{
        	params :{
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

        //check token empty
        if(!token) {

            //redirect login page
            history.push('/');
        }
        
        //call function "fetchData"
        fetchData();
    }, []);

   

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            DETAIL DATA  <strong className="text-uppercase"></strong>
                            <hr />
                            {bussiness.map((data)=>(
			            		<div key={data.id}>

			            			<p>Nama Bisnis = {data.name}</p>
			            			<p>Nama Alias = {data.alias}</p>
			            			<p>Alamat = {data.location.address1}</p>
			            			<p>Jarak = {data.distance} KM</p>
			            			<p>Rating = {data.rating}</p>
			            			<p>Phone = {data.phone}</p>
			            			<button type="button" className="btn btn-md btn-warning"><Link to={`/review/${data.id}`}> Jumlah Review - {data.review_count}</Link></button>
			            			<button onClick={() => window.open("https://maps.google.com?q=`${data.coordinates.latitude}`,`${data.coordinates.longitude}`")} className="btn btn-md btn-primary">Lihat Maps</button>
			            		</div>
			            		
			            	))}
                            <hr/>
                           
                        </div>
                        <div className="card-footer">
                        	
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

		
}

export default Detail;