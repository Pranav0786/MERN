import React, { useEffect, useState } from "react";
import { apiUrl , filterData } from "./data" ;
import Navbar from "./Components/Navbar" ;
import Filter from "./Components/Filter" ; 
import Cards from "./Components/Cards" ;
import Spinner from "./Components/Spinner";
import { toast } from "react-toastify";


const App = () => {

  const [courses , setCourses] = useState(null) ;
  const [loading , setLoading] = useState(true) ;

  async function fetchData() {
    setLoading(true) ;
    try{
      let response = await fetch(apiUrl) ;
      let output = await response.json() ;
      // output -> 
      setCourses(output.data) ;
    }
    catch(error)
    {
      toast.error("Network is not working") ;
    }
    setLoading(false) ;
  }

  useEffect( () => {
    fetchData() ;
  },[])

  return (
    <div className="min-h-screen flex flex-col">
      <div> <Navbar/> </div>
      
      {/* <div> 
        <Filter filterData = {filterData} /> 
      </div>
      
      <div>
        {
          loading ? ( <Spinner/> ) : ( <Cards courses={courses} /> )  
        }
      </div> */}

    </div>
  ) ;
};

export default App;
