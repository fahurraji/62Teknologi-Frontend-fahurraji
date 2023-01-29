
import React, { useState, useEffect } from 'react';

import { Link, useHistory } from "react-router-dom";

import axios from 'axios';

const bussAPI = 'http://localhost:8000/api/bussiness';
const urlAPI = 'http://localhost:8000/api/user';

function Dashboard() {

    //state user
    const [user, setUser] = useState({});

    //define history
    const history = useHistory();

    //token
    const token = localStorage.getItem("token");

    //function "fetchData"
    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get(urlAPI)
        .then((response) => {
            console.log(response);
            //set response user to state
            setUser(response.data);
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


    const bussinessHandler = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get(bussAPI)
        .then((response) => {
            history.push('/bussiness');
            console.log(response.data);
            //set response user to state
            // setBussiness(response.data.Bussiness);
            // setRows(response.data.total);
        })
        
    };

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            SELAMAT DATANG <strong className="text-uppercase">{user.name}</strong>
                            <hr />
                            Nama : <p className="text-lowercase">{user.name}</p>
                            Email : <p className="text-lowercase">{user.email}</p>
                            <hr/>
                            <button onClick={logoutHanlder} className="btn btn-md btn-danger">LOGOUT</button>
                            <button onClick={bussinessHandler} className="btn btn-md btn-primary">Lihat Data Bussiness</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Dashboard;