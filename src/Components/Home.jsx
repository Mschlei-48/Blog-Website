import {useState} from 'react'
import "./home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faPenToSquare,faBell,faUser } from '@fortawesome/free-solid-svg-icons';

function Home(){
    return(
        <div className="home-main-content">
            <div className="home-nav-bar">
                <div style={{display:"flex",justifyContent:"start",alignItems:"flex-start",gap:"25px"}}>
                    <span style={{fontSize:"2.7rem",fontFamily:"Roboto",fontWeight:"bold"}}>Infinity</span>
                    <input type="text" placeholder="Search..." style={{height:"45px",width:"205px",border:"none",borderRadius:"17px",paddingLeft:"10px",backgroundColor:"rgb(248, 247, 247)"}}></input>
                </div>
                <div style={{display:"flex",gap:"45px"}}>
                    <a className="home-nav-a">
                        <FontAwesomeIcon icon={faPenToSquare} className="home-nav-icons"/>
                    </a>
                    <a className="home-nav-a">
                        <FontAwesomeIcon icon={faBell} className="home-nav-icons"/>
                    </a>
                    <a className="home-nav-a">
                        <FontAwesomeIcon icon={faUser} className="home-nav-icons" style={{color:"white",backgroundColor:"black",borderRadius:"25px",padding:"25%",width:"30px",height:"28px"}}/>
                    </a>
                </div>

            </div>
        </div>
    )
}
export default Home;