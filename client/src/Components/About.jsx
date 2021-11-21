import React,{useEffect, useState} from 'react'
import {useHistory } from 'react-router-dom'

const About = () => {

    const history = useHistory();
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
      try{
        const res = await fetch('/about', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
          },
          credentials: "include"
        });

        const data = await res.json();
        console.log(data);
        setUserData(data);

        if(!res.status === 200){
          const error = new Error(res.error);
          throw error;
        }
        
      }catch(err){
        console.log(err);
        history.push("/login");
      }
    }

    useEffect(() =>{
      callAboutPage();
    },[]);
    return (
        <div>
            <div className="container mt-3">
    <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center"><hr />
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>{userData.name}</h4>
                      <p className="text-secondary mb-2">{userData.work}</p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData.name}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData.email}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData.phone}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Work</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData.work}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-primary " target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit Profile</a>
                    </div>
                  </div>
                </div>
              </div>

            



            </div>
          </div>

        </div>
    </div>
        </div>
    )
}

export default About
