import React, { useState } from 'react'
import Users from '../components/Users';
import userDetail from "../userData.json";
import {searchDataByName, handleNextPage, handlePreviousPage} from "../userSlice/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

console.log(userDetail)


function UserData() {
    const dispatch = useDispatch()
    const [dropdown, setDropdown] = useState();
    const [selectedDomain, setSelectedDomain] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedAvailability, setSelectedAvailability] = useState('');
    const { filterData } = useSelector((state) => state.users);
    const { userStore } = useSelector((state) => state.users);
    const { userPerPage } = useSelector((state) => state.users);
    const { currentPage } = useSelector((state) => state.users);
    const totalPages = Math.ceil(userDetail.length / userPerPage);

    const handleChange = (e) => {
        if (e.target.value) {
          setDropdown(true);
          dispatch(searchDataByName(e.target.value));
        } else {
          setDropdown(false);
      }
    };

    const startIndex = (currentPage - 1) * userPerPage;
    const endIndex = startIndex + userPerPage;
    const usersToShow = userStore.slice(startIndex, endIndex);

    const previousPage = () => {
      dispatch(handlePreviousPage());
    };
  
    const nextPage = () => {
      dispatch(handleNextPage());
    };

    const filteredUsers = usersToShow.filter((user) => {
      const domainMatch = selectedDomain ? user.domain === selectedDomain : true;
      const genderMatch = selectedGender ? user.gender === selectedGender : true;
      const availabilityMatch = selectedAvailability ? user.available === selectedAvailability : true;
      console.log(selectedAvailability, "fd", user.available)
      return domainMatch && genderMatch && availabilityMatch;
    });

    console.log(filteredUsers)

  

  return (
    <div className="users">
      <div className="filters">
        <div className="filters2">
          <label>Filter Variants:</label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
            <option value="" disabled>All Domains</option>
            {Array.from(Array.from(new Set(userStore.map((user) => user.domain)
            )).map((domain,id) => (
              <option key={id} value={domain}>
                {domain}
              </option>
            )))}
          </select>
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="" disabled>All Genders</option>
            {Array.from(Array.from(new Set(userStore.map((user) => user.gender)
            )).map((gender,id) => (
              <option key={id} value={gender}>
                {gender}
              </option>
            )))}
          </select>
          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
          >
            <option value="" disabled>All Availabilities</option>
            {Array.from(Array.from(new Set(userStore.map((user) => user.available)
            )).map((available,id) => (
              <option key={id} value={available}>
                {available ? "true" : "false"}
              </option>
            )))}
          </select>
        </div>
     

        <div className="filters2">
          <button>Search User By Name</button>
          <input type="text" placeholder="Search user" onChange={handleChange} />
        </div>
        {dropdown && (
        <div className="dd">
          {filterData?.length > 0
            ? filterData.map((user, i) => (
                <Link to={`user-data/${user.id}`} key={i}>
                  {user.first_name}
                </Link>
              ))
            : "no users available"}
        </div>
      )}
      </div>
        <div className="userData">
            {filteredUsers.map((user, i) => (
              <Users key={i} data={user} />
          ))}
        </div>
        <div className="pagination">
            <button onClick={previousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={nextPage} disabled={currentPage === totalPages}>
              Next
            </button>
        </div>
    </div>
    
    
         
     
      
        
       
  )
}

export default UserData;