import React,{useEffect, useState} from 'react';

const Contact = () => {
    const [userData, setUserData] = useState({name: "", email: "", phone: "", message: ""});

    const userContact = async () => {
      try{
        const res = await fetch('/getdata', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          },
         });

        const data = await res.json();
        console.log(data);
        setUserData({...userData, name: data.name, email: data.email, phone: data.phone, });

        if(!res.status === 200){
          const error = new Error(res.error);
          throw error;
        }
        
      }catch(err){
        console.log(err);
      }
    }

    useEffect(() =>{
      userContact();
    },[]);

	const handleInputs = (e) =>{
		const name = e.target.name;
		const value = e.target.value;

		setUserData({...userData, [name]: value});
	}	
	
	// Send the data to backend
	const contactForm = async (e) =>{
		e.preventDefault();

		const {name, email, phone, message}	= userData;

		const res = await fetch('/contact',{
			method: 'POST',
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				name, email, phone,message
			})
		});

		const data = await res.json();

		if(!data){
			console.log('Message Not Send');
		}
		else{
			alert("Message Sent");
			setUserData({...userData,message:""});
		}
	}

	return (
		<>
			<div class="container mt-5">
				<div class="row">
					<div class="col">
						<div class="card text-dark bg-light mb-3" style={{ maxWidth: "18rem" }}>
							<div class="card-header">Phone</div>
							<div class="card-body">
								<p class="card-text">03006051196</p>
							</div>
						</div>
					</div>
					<div class="col">
						<div class="card text-dark bg-light mb-3" style={{ maxWidth: "18rem" }}>
							<div class="card-header">Email</div>
							<div class="card-body">
								<p class="card-text">Shahryartariq57@gmail.com</p>
							</div>
						</div>
					</div>
					<div class="col">
						<div class="card text-dark bg-light mb-3" style={{ maxWidth: "18rem" }}>
							<div class="card-header">Address</div>
							<div class="card-body">
								<p class="card-text">House No: 138, Street 4, Sargodha</p>
							</div>
						</div>
					</div>
				</div>
			</div>





			<div class="container">


			<form method="POST">
				<div class="row input-container">
					<div class="col-xs-12">
						<div class="styled-input wide">
							<input type="text" name="name" onChange={handleInputs} required value={userData.name} placeholder="Enter Your Name" />
							<label></label>
						</div>
					</div>
					<div class="col-md-6 col-sm-12">
						<div class="styled-input">
							<input type="text" name="email" onChange={handleInputs} required required value={userData.email} placeholder="Enter Your Email" />
							<label></label>
						</div>
					</div>
					<div class="col-md-6 col-sm-12">
						<div class="styled-input" style={{ float: "right" }}>
							<input type="text" required name="phone" onChange={handleInputs} required required value={userData.phone} placeholder="Enter Your Phone" />
							<label></label>
						</div>
					</div>
					<div class="col-xs-12">
						<div class="styled-input wide">
							<textarea name="message" onChange={handleInputs}  value={userData.message} placeholder="message" />
							<label></label>
						</div>
					</div>
					<div class="col-xs-12">
						<div class="btn-lrg submit-btn" onClick={contactForm}>Send Message</div>
					</div>
				</div>
				</form>
			</div>
		</>
	)
}

export default Contact
