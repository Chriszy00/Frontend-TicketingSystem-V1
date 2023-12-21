import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css'; 
import './dashboard.css'; 
import './admin.js';

const Message = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleSwitchChange = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
      <div>
        <section id="sidebar">
		<a href="#" class="brand">
            <i className="bx bx-desktop"></i>
			<span class="text">DigiDesk</span>
		</a>
		<ul class="side-menu top ps-0">
			<li class="">
				<a href="#" id="dashboardBtn">
					<i class='bx bxs-dashboard' ></i>
					<span class="text">Dashboard</span>
				</a>
			</li>
			<li>
				<a href="#" id="orderManagementBtn">
					<i class='bx bxs-cart-alt' ></i>
					<span class="text">Order Management</span>
				</a>
			</li>
			<li className='active'>
				<a href="#">
					<i class='bx bxs-message-dots' ></i>
					<span class="text">Message</span>
				</a>
			</li>
		</ul>
		<ul class="side-menu ps-0">
			<li>
				<a href="#" class="logout">
					<i class='bx bxs-log-out-circle' ></i>
					<span class="text">Logout</span>
				</a>
			</li>
		</ul>
	</section>
	
	<section id="content">
	
		<nav>
			<i class='bx bx-menu' ></i>
			{/* <form action="#">
				<div class="form-input">
					<input type="search" placeholder="Search..."></input>
					<button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>
				</div>
			</form>
			<input
                type="checkbox"
                id="switch-mode"
                hidden
                onChange={handleSwitchChange}
                checked={isDarkMode}
            />
            <label htmlFor="switch-mode" className="switch-mode"></label> */}

		</nav>
		
		<main id="adminDashboard">
			<div class="head-title">
				<div class="left pt-5 pb-4">
					<h1 className='mb-0'>Customer Service</h1>
				</div>
			</div>

			<div class="table-data">
				<div class="order">
					<div className='' style={{height:'65vh'}}></div>
					<div className='d-flex justify-content-start gap-3'>
						<input type="text" className='border rounded-3' style={{ height: '5vh', width:'95%' }} placeholder="Type your message..."></input>
						<button className='btn btn-outline-primary'>Send</button>
					</div>

				</div>
			</div>
		</main>
	</section>
    <script src="/admin.js"></script>
      </div>
    )
  }

  export default Message;