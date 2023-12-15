import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './group.css';
import {userInfo} from '../register/signals';
import { Header } from '../header/header';

function Groups() {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupTitle, setNewGroupTitle] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [createdGroup, setCreatedGroup] = useState(null);
  const [groupId, setJoinedGroup] = useState(null);
  const [idgroup, setIdgroup] = useState('');
  

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
  
  const joinGroup = async (id) => {
    setIdgroup(id);
    console.log(id);
    try {    
      const userName = userInfo.value?.private; 
      await axios.post('/groups/join', { 
        group_idgroup: 3, 
        username: userName, 
      });
    } catch (error) {
      console.error(error);
    }
  };

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
    <div>
      <Header />
      <h2>Groups</h2>

      <div className="group-box">
        <h3>Create a New Group</h3>
        <label>Group Name:</label>
        <input type="text" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />

        <label>Group Title:</label>
        <input type="text" value={newGroupTitle} onChange={(e) => setNewGroupTitle(e.target.value)} />

        <label>Group Description:</label>
        <input type="text" value={newGroupDescription} onChange={(e) => setNewGroupDescription(e.target.value)} />

        <button onClick={createGroup}>Create Group</button>
        <button onClick={fetchGroups}>Show Group</button>
      </div>

      {createdGroup && (
        <div className="created-group-info">
          <h4>Created Group Information:</h4>
          <p>Group Name: {createdGroup.groupname}</p>
          <p>Group Title: {createdGroup.grouptitle}</p>
          <p>Group Description: {createdGroup.groupdescription}</p>
        </div>
      )}

<ul>
  {groups.map((group) => (
    <li key={group.groupname}>
      {group.groupname} - {group.grouptitle}
      <button onClick={() => joinGroup(group.idgroup)}>Join Group</button>
      <p>
      {group.idgroup}
      </p>
      
    </li>
 
  ))}
</ul>
    </div>
  );
}

export default Groups; 