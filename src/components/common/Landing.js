import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Blocks from './Blocks'

const Landing = () => {
  return (
    <div>
        <div className='d-flex justify-content-between text-white py-3 px-5 text-white' style={{background:'#051748'}}>
            <div className='px-5'>
                <div className='fw-bold text-white' style={{fontSize:'1.3rem'}}>DigiDesk</div>
            </div>
            <div className='d-flex justify-content-end px-5'>
                <div className='px-3' style={{fontSize:'1rem'}}><a className='text-white text-decoration-none' href='/register'>Register</a></div>
                <div className='text-white px-3' style={{fontSize:'1rem'}}><a className='text-white text-decoration-none' href='/login'>Login</a></div>
            </div>
        </div>
    <div className="container mx-auto w-75" style={{margin:'5rem'}}>
        <div className='row pb-5'>
            <div className='col'>
                <h1 className='fw-bold' style={{fontSize:'4rem'}}>Manage Your<br></br> Tickets with Ease<br></br> On a Digital Desk</h1>
                <p className='mt-5'>Choosing a ticketing system for your website?</p>
                <p className='mb-5'>Click the buttons below to use the best one.</p>
                {/* <div className='row gap-3'>
                    <button className='col btn py-2' style={{background:'#cad4f2'}}>Register</button>
                    <button className='col btn text-white py-2' style={{background:'#051748'}}>Login</button>
                </div> */}
                <div className='row'>
                    <div className='col'>
                        <button onClick={() => (window.location.href = '/register')} className='col btn py-2 me-3' style={{fontSize:'1rem',background:'#cad4f2', width:'13vw'}}>Register</button>
                        <button onClick={() => (window.location.href = '/login')} className='col btn text-white py-2' style={{fontSize:'1rem',background:'#051748', width:'13vw'}}>Login</button>
                    </div>
                </div>
            </div>
            <div className='col'>
                <Blocks></Blocks>
            </div>
        </div>
        <div className='mt-5 p-5 rounded-5' style={{background:'rgb(202, 212, 242, 0.3)'}}>
            <div className='row'>
                <div className='col-4'>
                    <h1 className='fw-bold'>How Does it Work?</h1>
                    <p className='mt-2'>Get your tickets resolved in 4 easy steps.</p>
                </div>                
                <div className='col-1 d-flex justify-content-end'><h1 className='fw-bold' style={{color:'#00DDE0'}}>1</h1></div>
                <div className='col-3'>
                Users submit their concerns, queries, or requests via the ticketing system, detailing the nature of the issue
                </div>
                <div className='col-1 d-flex justify-content-end'><h1 className='fw-bold' style={{color:'#00DDE0'}}>2</h1></div>
                <div className='col-3'>
                The system assigns a unique identifier (ticket) to each submission and categorizes it based on priority or department.
                </div>
            </div>
            <div className='row'>
                <div className='col-4'>

                </div>
                <div className='col-1 d-flex justify-content-end'><h1 className='fw-bold' style={{color:'#00DDE0'}}>3</h1></div>
                <div className='col-3'>
                Assigned agents or teams review and address the tickets in a systematic order, updating their status and providing solutions.
                </div>
                <div className='col-1 d-flex justify-content-end'><h1 className='fw-bold' style={{color:'#00DDE0'}}>4</h1></div>
                <div className='col-3'>
                Once resolved, the system notifies users, and they may provide feedback, closing the loop on the support or service request.
                </div>
            </div>
        </div>
        <div className='text-center m-5 p-5'>
            <h1 className='fw-bold mb-4'>Your Tickets, Our Priority</h1>
            <h6 className='mb-4'>Experience seamless ticket management – elevate your events effortlessly with DigiDesk.</h6>
            <button onClick={() => (window.location.href = '/register')} className='col btn text-white px-5 py-2' style={{fontSize:'1rem',background:'#051748'}}>Join Us</button>
        </div>
    </div>
    </div>
  );
};

export default Landing;
