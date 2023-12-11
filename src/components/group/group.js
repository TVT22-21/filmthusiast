import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './group.css';

function Groups() {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupTitle, setNewGroupTitle] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [createdGroup, setCreatedGroup] = useState(null);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:3001/groups');
      setGroups(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const joinGroup = async (groupId) => {
    try {
      const idprofiili = 8;
      await axios.post('http://localhost:3001/groups/join', { groupId, idprofiili });
      fetchGroups();
    } catch (error) {
      console.error(error);
    }
  };

  const createGroup = async () => {
    try {
      const response = await axios.post('http://localhost:3001/groups/create', {
        groupname: newGroupName,
        grouptitle: newGroupTitle,
        groupdescription: newGroupDescription,
      });
      fetchGroups();
    
      setCreatedGroup(response.data);
      setGroups([...groups, response.data]);
      setNewGroupName('');
      setNewGroupTitle('');
      setNewGroupDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [createdGroup]); 

  return (
    <div>
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
          <li key={group.idGroup}>
            {group.groupname} - {group.grouptitle}
            <button onClick={() => joinGroup(group.idGroup)}>Join Group</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Groups;