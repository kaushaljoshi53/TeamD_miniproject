import React, { useState } from 'react';
export{}
export interface Person {
  name: string;
  designation: string;
  birthdate: Date;
}
interface Props {
  person: Person[];
}
const BirthdayToday = ({ person }: Props) => { 
  return (
    <div>   
      <div  >      
      </div>
      <div className='profile-card'> 
        <h2 className="moving-text">Today's Birthday</h2>     
        <ul>
          {person.map((s) => (
            <div key={s.name}>
            <div className="flex">
                <div className="profileImage">
                    <div className='names'>
                        <span className='username'>{s.name}</span>
                        <div className='designation'><h6>{s.designation}</h6></div>
                    </div>
                </div>
            </div>
            {/* { // <li className="list-items"key={s.name}>
            //     <img src="assets/images/profile.png"alt="person" width={50} height={50}></img>
            //   {s.name}
            //   <h6>({s.designation})</h6>
            // </li> */}
          {/* ))}  */}
          
          </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BirthdayToday;
