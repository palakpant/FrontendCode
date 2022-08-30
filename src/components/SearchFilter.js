import React from 'react';
import { Button, Tab } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
function SearchFilter(){
  
    const[userData,setUserData]=React.useState([]);
    const[place,setPlace]=React.useState('');
    const [slot,setSlot]=React.useState('');

    React.useEffect(() =>{
        const data = [
            {place:"Bangalore",date:"2022-08-29",slot:'II'},
            {place:"Bangalore",date:"2022-08-30",slot:'I'},
            {place:"Bangalore",date:"2022-08-30",slot:'II'},
            {place:"Bangalore",date:"2022-08-29",slot:'I'}
        ];

        setUserData(data);
    },[])

    const handleSearch =()=>{
        
    }

    return <div>
        <Table>
           <tr>
               <td>
                   <input type='text' placeholder='Place' onChange={(e)=>setPlace(e.target.value)}/>
               </td>

               <td>
                   <button onClick={()=>handleSearch()}>Search</button>
               </td>

              
           </tr>




        </Table>
        <Table responsive stripped size="small">
            <thead>
                <tr>
                    <th>Place</th>
                    <th>Date</th>
                    <th>Slot</th>

                </tr>
            </thead>
            <tbody>
                {
                    userData && userData.length>0 ?
                    userData.map(item =>
                        <tr>
                            <td>{item.place}</td>
                            <td>{item.date}</td>
                            <td>{item.slot}</td>
                        </tr>
                        )
                        : 'No data'
                }
            </tbody>
        </Table>


    </div>
}

export default SearchFilter;