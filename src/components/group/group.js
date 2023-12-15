import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './group.css';
import {userInfo} from '../register/signals';
import { Header } from '../header/Header';

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
      const response = await axios.get('http://localhost:3001/groups/getgroups', );
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
    try {
      const response = await axios.get(`http://localhost:3001/groups/members`);
      console.log('Group Members:', response.data);
      setSelectedPersonId(response.data[0]?.person_idperson); // Store the first person_idperson
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
      const response = await axios.post('http://localhost:3001/groups/create', {
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
          <button onClick={() => joinGroup(group.groupname)}>Join Group</button>
          <button onClick={() => Members(group.idgroup)}>Members</button>
          <button onClick={showMembers}>Show Members</button>
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