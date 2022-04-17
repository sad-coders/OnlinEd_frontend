import React , { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "../../context/GlobalState";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router";  

function getContent(status) {
    if(status === 'pending'){
        return(
            <>
            <Spinner animation="grow" size="lg" className="mx-3"/>
            <h5>Your Email Address is being confirmed. Please Wait.....</h5>
            </>
        )
    }else if(status === 'verified'){
        return(
            <h5 className="mx-auto">Your Email Address is verified. Click <Link to="/"> here </Link> to continue</h5>
        )
    }else if(status === 'failed'){
        return(
            <h5 className="mx-auto">Email Address verification failed. Please try again.</h5>
        )
    }
}


const Verify = () => {
  const { verifyUser , verificationStatus } = useContext(GlobalContext)

  const { userId } = useParams(); 
  useEffect(() => {

    verifyUser(userId);

  }, [userId]);

  return(
    <div className="text-center my-auto">
        {
          getContent(verificationStatus)
        }
    </div>
  )
}

export default Verify;