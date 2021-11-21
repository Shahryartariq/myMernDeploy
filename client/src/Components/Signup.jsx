import React,{useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
function Signup() {
    const history = useHistory()
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: "",
    });

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]: value});
    }

    const PostData = async (e) =>{
        e.preventDefault();

        const {name, email, phone, work, password, cpassword} = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({      
                name: name, email: email, phone: phone, work: work, password: password, cpassword: cpassword
            })
        });

        const data = await res.json();
            if(res.status === 422 || !data){
                window.alert("Invalid Registration!");
                console.log("Invalid Registration!");
            } else {
            window.alert("Registration Successful");
            console.log("Registration Successful");

            history.push("/login");
        }
    }

    return (
        <>
            <div className="signup-form">
                <form method="POST" className="signup-form" id="signup-form">
                <h2>Sign Up</h2>
                <p>Please fill in this form to create an account!</p>
                <hr />
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <span className="fas fa-user fa-2x"></span>
                            </span>
                        </div>
                        <input type="text" autoComplete="off" className="form-control" name="name" placeholder="Username" required="required" value={user.name} onChange={handleInputs} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-paper-plane fa-2x"></i>
                            </span>
                        </div>
                        <input type="email" autoComplete="off" className="form-control" name="email" placeholder="Email Address" required="required" value={user.email} onChange={handleInputs} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i className="fas fa-phone fa-2x"></i>
                            </span>
                        </div>
                        <input type="number"  autoComplete="off"  className="form-control" name="phone" placeholder="Phone Number" required="required" value={user.phone} onChange={handleInputs} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i className="fas fa-briefcase fa-2x"></i>
                            </span>
                        </div>
                        <input type="text" className="form-control" name="work" placeholder="Your Profession" required="required" value={user.work} onChange={handleInputs} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-lock fa-2x"></i>
                            </span>
                        </div>
                        <input type="password" className="form-control" name="password" placeholder="Enter Password" required="required" value={user.password} onChange={handleInputs} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-passport fa-2x"></i>
                            </span>
                        </div>
                        <input type="password" className="form-control" name="cpassword" placeholder="Confirm Password" required="required" value={user.cpassword} onChange={handleInputs} />
                    </div>
                </div>
                <div className="form-group form-button">
                    <input type="submit" name="signup" id="signup" className="form-submit btn btn-primary btn-lg" value="Register" onClick={PostData} />
                </div>

                <div className="text-center">Already have an account? <NavLink to="/login">Login here</NavLink></div>
            </form>
            </div>

        </>
    )
}

export default Signup
