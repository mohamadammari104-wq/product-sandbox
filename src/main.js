import './styles.css';
import { participants } from './participants.js';

const root = document.getElementById('app');

let search = '';
let filter = 'All';
let selectedId = null;

function getVisibleParticipants() {
  return participants.filter((participant) => {
    const matchesSearch = participant.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' ? true : participant.role === filter;
    return matchesSearch && matchesFilter;
  });
}

function render() {
  const visibleParticipants = getVisibleParticipants();
  const selectedParticipant = participants.find((participant) => participant.id === selectedId);

  root.innerHTML = `
    <div class="page">
      <header>
        <h1>Participant Operations Dashboard</h1>
        <p>Week 1 starter app for product sandbox.</p>
      </header>

      <section class="controls">
        <input id="search" placeholder="Search by name" value="${search}" />
        <select id="filter">
          ${['All', 'Resident', 'Commuter', 'Intern']
            .map((option) => `<option value="${option}" ${filter === option ? 'selected' : ''}>${option}</option>`)
            .join('')}
        </select>
      </section>

      <section class="layout">
        <div class="list">
          ${visibleParticipants.length === 0
            ? '<div class="empty">No participants matched your current filters.</div>'
            : visibleParticipants
                .map(
                  (participant) => `
                    <button class="card" data-id="${participant.id}">
                      <div class="card-top">
                        <strong>${participant.name}</strong>
                        <span class="badge badge-${participant.status.toLowerCase().replace(/\s+/g, '-')}">${participant.status}</span>
                      </div>
                      <div>${participant.role} • ${participant.team}</div>
                      <div>Weekly report: ${participant.weeklyReport}</div>
                    </button>
                  `
                )
                .join('')}
        </div>

        <aside class="details">
          ${selectedParticipant
            ? `
                <h2>${selectedParticipant.name}</h2>
                <p><strong>Role:</strong> ${selectedParticipant.role}</p>
                <p><strong>Team:</strong> ${selectedParticipant.team}</p>
                <p><strong>Status:</strong> ${selectedParticipant.status}</p>
                <p><strong>Weekly report:</strong> ${selectedParticipant.weeklyReport}</p>
                <p><strong>Deliverable:</strong> ${selectedParticipant.deliverable}</p>
                <p><strong>Housing:</strong> ${selectedParticipant.housing}</p>
              `
            : '<p>Select a participant to view details.</p>'}
        </aside>
      </section>
    </div>
  `;

  document.getElementById('search').addEventListener('input', (event) => {
    search = event.target.value;
    render();
  });

  document.getElementById('filter').addEventListener('change', (event) => {
    filter = event.target.value;
    render();
  });

  document.querySelectorAll('[data-id]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedId = Number(button.dataset.id);
      render();
    });
  });
}

render();
