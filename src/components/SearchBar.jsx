import React, { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserService from "../services/user_service";
import { Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { addDays, subDays } from 'date-fns';
import Table from 'react-bootstrap/Table';

// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const containerStyle = {
    // width : "60%",
    display :  "flex",
    justifyContent : "space-between",
    // border:"2px solid red",
    borderRadius: 10,
    backgroundColor : "#f7f7f7",
    padding : 10,
    marginBottom:'7px'
    
}

const dropDownItemStyle = {
    border:"2px solid red",
    width: "30%" 

}

const current = new Date();   
current.setDate(current.getDate() + 1);
console.log(current.toDateString());



const SearchBar = () => {


  



    const [place,setPlace] = useState('Location');
    const [slot,setSlot] = useState('Slot');
    const [startDate, setStartDate] = useState(new Date());
   
    
    let seatsAvailable = 44;
  

    

      const [codes, setCodes] = useState([]);

      const [available,setAvailable] =useState([]);
      const [locationCode,setLocationCode] =useState('');

      //location  pin {g1,g2...}
      const [pin,setPin] =useState('G1');
 

       
         

        const handleSearch =()=>{
         let seats=[];
         let serverData={};
          UserService.getLocationData(place,slot).then(
            (response) => {
              const locationData=response.data;


              // for(let i=0;i<locationData.length;i++){
           
               
              //   UserService.getAvailableSlotDetail(startDate,slot,locationData[i]).then(
              //     (response)=>{
                     
              //       seats.push(response);
                     
                   
              //       },
              //     (error) => {
              //       const _available =
              //         (error.response &&
              //           error.response.data &&
              //           error.response.data.message) ||
              //         error.message ||
              //         error.toString();
              //       setAvailable(_available);
              //     }
      
              //   )
              //  }
  
                //  const obj=seats;
                //  var arr=[];
                //  const getData=response.data;
                //  Object.keys(seats.map((i)=>{
                //    console.log(getData[i]+" "+seats[i].id);
                //    arr[getData[i]]=seats[i].id
                //  })
                //  );
                //  console.log(typeof(seats));
                //  console.log(arr);
  
               
               //console.log(seats["0"]);
               
               //console.log(getData);
              //  getData.forEach((element,i) =>{
              //    serverData[element]=seats[i];
              //    i++;
              //  });
  
















              
            
              console.log(locationData);
              setCodes(locationData);
            },
            (error) => {
              const _codes =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              setCodes(_codes);
            }
          
          );

            
        };

        
        const [book,setBook] =useState([]);

       const getBooking =()=>{


         UserService.getBooking(startDate,slot,locationCode).then(
          
          
           (response) =>{
             console.log(slot);
             console.log(locationCode);
             console.log(response.data);
             setBook(response.data);
           }, (error) => {
            console.log(slot);
            console.log(locationCode);
            const _book =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setBook(_book);
          }
         )
       }

      
    
    
    return (
            <>
            <div className="container" style={containerStyle}>
                {/* Location */}
                <div className="input-group" style={containerStyle}>
                    <input type="text" value={place} className="form-control" 
                        aria-label="Text input with dropdown button"/>
                        
                  
                    <div className="input-group-append">
                        {/* <button className="btn btn-outline-secondary dropdown-toggle" 
                        type="button" data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"></button>

                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" onClick={()=>setText("Gurugram")}>Gurugram</a>
                            <a class="dropdown-item" href="#" onClick={()=>setText("Noida")}>Noida</a>
                            <a class="dropdown-item" href="#" onClick={()=>setText("Hyderabad")}>Hyderabad</a>
                            <a class="dropdown-item" href="#" onClick={()=>setText("Bengaluru")}>Bengaluru</a>
                            
                        </div> */}
                        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Search Locations
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={()=>setPlace("Gurgaon")}>Gurgaon</Dropdown.Item>
        <Dropdown.Item href="#" onClick={()=>setPlace("Noida")}>Noida</Dropdown.Item>
        <Dropdown.Item href="#" onClick={()=>setPlace("Hyderabad")}>Hyderabad</Dropdown.Item>
        <Dropdown.Item href="#" onClick={()=>setPlace("Bangalore")}>Bangalore</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
                    </div>

                 
                </div>
                {/* date */}
                <div className="input-group" style={containerStyle}>
                    <div className="container">
                    <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            startDate={startDate}
                            minDate={current}
                            maxDate={addDays(current, 6)}
                            
                            inline
                            />
                    </div>
                </div>
                {/* Slots */}
                <div className="input-group" style={containerStyle}>
                    <input type="text" value={slot} className="form-control" 
                        aria-label="Text input with dropdown button" />
                    <div className="input-group-append">
                    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Search Slot Timings
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={()=>setSlot("I")}>8:30AM-5:00PM</Dropdown.Item>
        <Dropdown.Item href="#" onClick={()=>setSlot("II")}>11:00AM-8:30PM</Dropdown.Item>
       
      </Dropdown.Menu>
    </Dropdown>
                    </div>
                </div>
            
                <button className="btn btn-primary" type="button" onClick={()=>handleSearch()}   style={{width:'20%'}}>Search</button>
                
            </div>

            {/* seat status renders with search results */}
            <div className="container" style={containerStyle}>
                <div className="container"> <p> Seats available:</p> <strong>{seatsAvailable}</strong></div>
            <div className="btn btn-primary" type="button" style={{alignSelf:"flex-end"}}>Check Seats Available</div>
            </div>

            {/* Table */}

            <Table responsive stripped size="small">
            <thead>
                <tr>
                    <th>Location Code</th>
                    <th>Slots Available</th>
                    
                    <th>Slot Selected</th>
                    <th>Book</th>

                </tr>
            </thead>
            <tbody>
                {
                    codes && codes.length>0 ?
                    codes.map(item => 
                     
                        <tr>
                            <td onChange={(pin)=>setPin(item)}>{item}</td>
                            <td>10</td>
                            
                            <td>{slot}</td>
                            <td><button onClick={()=>getBooking(startDate,slot,pin)} className='btn btn-primary'>Book</button></td>
                           
                        </tr>
                        )
                        : 'No data'
                }
            </tbody>
        </Table>
            </>
        );
    
};

export default SearchBar;

// style={{border:"2px solid red"}}