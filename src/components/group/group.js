import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './group.css';
import {userInfo} from '../register/signals';
import { Header } from '../header/Header';
import { Footer } from '../footer/footer';


function Groups() {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupTitle, setNewGroupTitle] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [createdGroup, setCreatedGroup] = useState(null);
  const [groupId, setJoinedGroup] = useState(null);
  const [selectedPersonId, setSelectedPersonId] = useState(null);

  

  const fetchGroups = async () => {
    try {
      console.log('Before fetching groups...');
      const response = await axios.get('/groups/getgroups', );

      console.log('Groups fetched successfully:', response.data);
      setGroups(response.data);
      console.log('After setting groups...');
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };
  
  const joinGroup = async (groupname) => {
    try {    
      const userName = userInfo.value?.private; 
      await axios.post('http://localhost:3001/groups/join', { 
        groupname,
        username: userName, 
      });
    } catch (error) {
      console.error(error);
    }
  };

  
  const Members = async (id) => {
    setSelectedPersonId(id);
  
    try {
      console.log(id);
      console.log(selectedPersonId);
      const response = await axios.get(`http://localhost:3001/groups/members`, {
        params: { group_idgroup: id },
      });
      console.log('Group Members:', response.data);
      const groupIds = response.data.map(item => item.group_idgroup);
      console.log(groupIds);
  
      const groupDataPromises = groupIds.map(async (groupId) => {
        try {
          const responseInfo = await axios.get(`http://localhost:3001/groups/getmembers`, {
            params: {
              group_idgroup: groupId,
            },
          });
          console.log(responseInfo.data);
          return responseInfo.data.rows;
        } catch (error) {
          console.error('Error fetching group data:', error);
        }
      });
  
      const resolvedGroupData = await Promise.all(groupDataPromises);
      console.log(resolvedGroupData);
    } catch (error) {
      console.error('Error fetching group members:', error);
    }
  };

  const showMembers = async () => {
    try {
      if (!selectedPersonId) {
        console.log('No selected person_idperson');
        return;
      }

      const response = await axios.get(`http://localhost:3001/groups/getmembers/${selectedPersonId}`);
      console.log('Group Member:', response.data.username);
    } catch (error) {
      console.error('Error fetching group member:', error);
    }
  };
/*
  const groupDataPromises = groupIds.map(async (groupId) => {
  const responseInfo = await axios.get(`http://localhost:3001/groups/getmembers/${selectedPersonId}`),{
      params: {
        idgroup: groupId,
      },
    });

    return responseInfo.data.rows;
  });

  const resolvedGroupData = await Promise.all(groupDataPromises);

*/
  /*
  const showGroupMembers = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3001/groups/getusernames/${id}`);
        console.log('Group Members by name:', response.data);
    } catch (error) {
        console.error('Error getting member name:', error);
    }
};*/
/*
  const showMembers = async (person_idperson) => {
    try {
      if (!person_idperson) {
        console.log('Person ID is undefined');
        return;
      }

      const response = await axios.get(`http://localhost:3001/groups/getusername/${person_idperson}`);
      
      if (response.data.username) {
        console.log('Group Member:', response.data.username);
        // Update your UI or state with the fetched username
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error fetching group member:', error);
    }
  };*/

  const createGroup = async () => {
    try {
      const response = await axios.post('/groups/create', {
        groupname: newGroupName,
        grouptitle: newGroupTitle,
        groupdescription: newGroupDescription,
      });
  
      setCreatedGroup(response.data);
      setNewGroupName('');
      setNewGroupTitle('');
      setNewGroupDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []); 

  return (
    <div className='groups-container'>
      <Header />

      <div className="group-box">
        <h3>Create a New Group</h3>
        <label>Group Name:</label>
        <input type="text" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />

        <label>Group Title:</label>
        <input type="text" value={newGroupTitle} onChange={(e) => setNewGroupTitle(e.target.value)} />

        <label>Group Description:</label>
        <input type="text" value={newGroupDescription} onChange={(e) => setNewGroupDescription(e.target.value)} />

        <div className='group-box-btn-container'>
        <button className='group-box-btn' onClick={createGroup}>Create Group</button>
        <button className='group-box-btn' onClick={fetchGroups}>Show Group</button>
        </div>     
      </div>

      {createdGroup && (
        <div className="created-group-info">
          <h4>Created Group Information:</h4>
          <p>Group Name: {createdGroup.groupname}</p>
          <p>Group Title: {createdGroup.grouptitle}</p>
          <p>Group Description: {createdGroup.groupdescription}</p>
        </div>
      )}
      <div>

      <div className='show-groups'>
        <ul>
            {groups.map((group) => (
              <li key={group.groupname}>
              {group.groupname} - {group.grouptitle}
              <button className='show-groups-btn' onClick={() => joinGroup(group.groupname)}>Join Group</button>
              <button className='show-groups-btn' onClick={() => Members(group.idgroup)}>Members</button>
              <button className='show-groups-btn' onClick={showMembers}>Show Members</button>
            <p>
            {group.idgroup}
            </p>
            
          </li>
      
          ))}
        </ul>
      </div> 
      </div>  
    </div>
  );
}

export default Groups;