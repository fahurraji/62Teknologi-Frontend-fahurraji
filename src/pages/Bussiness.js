
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useHistory } from "react-router-dom";




function Bussiness() {
  const [bussiness, setBussiness] = useState([]);
  const [page, setPage] = useState(0);
  const [term, setTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");
  const [price, setPrice] =useState("");
  const [rating, setRating] = useState("");
  // const [telp, setPhone] = usePhone("");

    const history = useHistory();
    const urlAPI = 'http://localhost:8000/api/bussiness';

    //token
    const token = localStorage.getItem("token");

    //function "fetchData"
    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get(urlAPI,{
        	params:{
        		term:term,
        		limit:limit,
        		price:price,

        	}
        })
        .then((response) => {
            console.log(response.data.Bussiness);
            //set response user to state
            setBussiness(response.data.Bussiness);
		    setRows(response.data.total);
        })
    }

    const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg(
        "silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg("");
    }
  };

    const searchData = (e) => {
    e.preventDefault();
    setPage(1);
    setMsg("");
    setTerm(query);
  };
 

    useEffect(() => {

        if(!token) {

            history.push('/');
        }
        
    
        fetchData();
    }, [page,keyword]);

    //function logout
    const logoutHanlder = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch Rest API
        await axios.post('http://localhost:8000/api/logout')
        .then(() => {

            //remove token from localStorage
            localStorage.removeItem("token");

            //redirect halaman login
            history.push('/');
        });
    };

    return (
      <div className="container mt-5">
      <div className="columns">
        <div className="column is-centered">
          <form >
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  type="text"
                  className="input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="cari disini..."
                />
              </div>
              <div className="control">
                <button type="submit" className="button is-info">
                  Search
                </button>
              </div>
            </div>
          </form>
          <table className="table is-striped is-bordered is-fullwidth mt-2">
            <thead>
              <tr >
                
                <th>Name</th>
                <th>Alias</th>
                <th>Image</th>
                <th>Jarak</th>
                <th>Rating</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            	{bussiness.map((data)=>(
            		<tr key={data.id}>
            			<td>{data.name}</td>
            			<td>{data.alias}</td>
            			<td>{data.image}</td>
            			<td>{data.distance} KM</td>
            			<td>{data.rating}</td>
            			<td>{data.phone}</td>
            			<td>{data.location.display_address}</td>
            			<td><a><Link className="btn-item auction-btn mr-2" to={`/bussiness/${data.id}`}> Details</Link></a></td>
            		</tr>
            	))}
            </tbody>
            
          </table>
          <p>
            Total Rows: {rows}  
          </p>
          <p className="has-text-centered has-text-danger">{msg}</p>
          <nav
            className="pagination is-centered"
            
            role="navigation"
            aria-label="pagination"
          >
           
         

          </nav>
        </div>
      </div>
    </div>
    )

}

export default Bussiness;