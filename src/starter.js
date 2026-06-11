import './styles.css';
import { participants } from './participants.js';

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
