import './styles.css';
import { participants } from './participants.js';

function getStatusBadge(status) {
  const colors = {
    'On Track': 'badge-ontrack',
    'Needs Follow-Up': 'badge-followup',
    'At Risk': 'badge-atrisk'
  };
  return `<span class="badge ${colors[status] || 'badge-default'}">${status}</span>`;
}
function renderParticipants(participantsList) {
  return participantsList.map(participant => {
    return `
      <div class="participant-item" data-id="${participant.id}">
        <div class="participant-info">
          <h3>${participant.name}</h3>
          <span class="participant-email">${participant.role} • ${participant.team}</span>
        </div>
        <div class="participant-meta">
          <span class="participant-team">${participant.team}</span>
          ${getStatusBadge(participant.status)}
        </div>
      </div>
    `;
  }).join('');
}

function renderDetails(participant) {
  if (!participant) {
    return `
      <div class="detail-panel">
        <h2>Participant Details</h2>
        <p>Select a participant to see details here.</p>
      </div>
    `;
  }
  
  return `
    <div class="detail-panel">
      <button class="close-button" onclick="closeDetails()">×</button>
      <h2>${participant.name}</h2>
      <p><strong>Role:</strong> ${participant.role}</p>
      <p><strong>Team:</strong> ${participant.team}</p>
      <p><strong>Status:</strong> ${getStatusBadge(participant.status)}</p>
      <p><strong>Weekly Report:</strong> ${participant.weeklyReport}</p>
      <p><strong>Deliverable:</strong> ${participant.deliverable}</p>
      <p><strong>Housing:</strong> ${participant.housing}</p>
    </div>
  `;
}
function getUniqueTeams() {
  const teams = participants.map(p => p.team);
  return [...new Set(teams)];
}

let currentSearch = '';
let currentStatusFilter = 'all';
let selectedParticipantId = null;

function getFilteredParticipants() {
  let result = [...participants];
  
  if (currentSearch) {
    result = result.filter(p => 
      p.name.toLowerCase().includes(currentSearch.toLowerCase())
    );
  }
  
  if (currentStatusFilter !== 'all') {
    result = result.filter(p => p.status === currentStatusFilter);
  }
  
  return result;
}

function getSelectedParticipant() {
  if (!selectedParticipantId) return null;
  return participants.find(p => p.id === selectedParticipantId) || null;
}
function renderApp() {
  const filtered = getFilteredParticipants();
  const selected = getSelectedParticipant();
  const teams = getUniqueTeams();
  
  let statusOptions = ['all', 'On Track', 'Needs Follow-Up', 'At Risk'];
  let statusHtml = statusOptions.map(status => 
    `<option value="${status}" ${currentStatusFilter === status ? 'selected' : ''}>${status === 'all' ? 'All Statuses' : status}</option>`
  ).join('');
  
  let teamHtml = `<option value="all">All Teams</option>` +
    teams.map(team => 
      `<option value="${team}">${team}</option>`
    ).join('');
  
  const appHtml = `
    <div class="app">
      <header class="app-header">
        <h1>Participant Dashboard</h1>
        <div class="stats">
          <span>Total: ${participants.length}</span>
          <span>Showing: ${filtered.length}</span>
        </div>
      </header>
      
      <div class="filter-controls">
        <input 
          type="text" 
          id="searchInput" 
          placeholder="Search by name..." 
          value="${currentSearch}"
          oninput="handleSearch(this.value)"
        />
        <select id="statusFilter" onchange="handleStatusFilter(this.value)">
          ${statusHtml}
        </select>
        <select id="teamFilter">
          ${teamHtml}
        </select>
      </div>
      
      <div class="main-content">
        <div class="participant-list">
          ${renderParticipants(filtered)}
        </div>
        ${renderDetails(selected)}
      </div>
    </div>
  `;
  
  document.getElementById('root').innerHTML = appHtml;
  
  document.querySelectorAll('.participant-item').forEach(el => {
    el.addEventListener('click', function() {
      const id = parseInt(this.dataset.id);
      selectedParticipantId = id;
      renderApp();
    });
  });
}

window.handleSearch = function(value) {
  currentSearch = value;
  renderApp();
};

window.handleStatusFilter = function(value) {
  currentStatusFilter = value;
  renderApp();
};

window.closeDetails = function() {
  selectedParticipantId = null;
  renderApp();
};

renderApp();

const root = document.getElementById('root');

root.innerHTML = '<div class="page">' +
  '<header><h1>Participant Operations Dashboard</h1><p>Starter scaffold for week 1.</p></header>' +
  '<section class="controls">' +
  '<input id="search" placeholder="Search goes here" />' +
  '<select id="filter"><option>Filter goes here</option></select>' +
  '</section>' +
  '<section class="layout">' +
  '<div class="list">' + participants.map(function (participant) {
    return '<div class="card"><div class="card-top"><strong>' + participant.name + '</strong><span class="badge">Badge</span></div><div>' + participant.role + ' • ' + participant.team + '</div></div>';
  }).join('') + '</div>' +
  '<aside class="details"><h2>Participant details</h2><p>Add details here.</p></aside>' +
  '</section>' +
  '</div>';
