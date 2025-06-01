document.addEventListener('DOMContentLoaded', () => {
    // Sample data structure for patient records
    let patientData = {
        visits: [],
        vaccinations: [],
        notes: ''
    };

    // Load saved data from localStorage
    const savedData = localStorage.getItem('patientData');
    if (savedData) {
        patientData = JSON.parse(savedData);
        updateVisitHistory();
        updateVaccinationList();
        updateNotes();
    }

    // Handle visit form submission
    const visitForm = document.getElementById('visitForm');
    if (visitForm) {
        visitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const visit = {
                date: document.getElementById('visitDate').value,
                reason: document.getElementById('visitReason').value,
                diagnosis: document.getElementById('diagnosis').value,
                treatment: document.getElementById('treatment').value,
                notes: document.getElementById('visitNotes').value
            };
            patientData.visits.unshift(visit);
            saveData();
            updateVisitHistory();
            visitForm.reset();
        });
    }

    // Handle vaccination form submission
    const vaccinationForm = document.getElementById('vaccinationForm');
    if (vaccinationForm) {
        vaccinationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const vaccination = {
                name: document.getElementById('vaccineName').value,
                date: document.getElementById('vaccineDate').value,
                nextDue: document.getElementById('nextDueDate').value,
                batch: document.getElementById('batchNumber').value
            };
            patientData.vaccinations.unshift(vaccination);
            saveData();
            updateVaccinationList();
            vaccinationForm.reset();
        });
    }

    // Handle notes form submission
    const notesForm = document.getElementById('notesForm');
    if (notesForm) {
        notesForm.addEventListener('submit', (e) => {
            e.preventDefault();
            patientData.notes = document.getElementById('internalNotes').value;
            saveData();
        });
    }

    // Handle animal profile form submission
    const animalProfileForm = document.getElementById('animalProfileForm');
    if (animalProfileForm) {
        animalProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Save profile data
            saveData();
        });
    }

    // Function to update visit history display
    function updateVisitHistory() {
        const visitList = document.querySelector('.visit-list');
        if (!visitList) return;

        visitList.innerHTML = patientData.visits.map(visit => `
            <div class="visit-item">
                <div class="visit-header">
                    <strong>${new Date(visit.date).toLocaleDateString()}</strong>
                    <span>${visit.reason}</span>
                </div>
                <div class="visit-details">
                    <p><strong>Diagnose:</strong> ${visit.diagnosis}</p>
                    <p><strong>Behandlung:</strong> ${visit.treatment}</p>
                    ${visit.notes ? `<p><strong>Notizen:</strong> ${visit.notes}</p>` : ''}
                </div>
            </div>
        `).join('');
    }

    // Function to update vaccination list
    function updateVaccinationList() {
        const vaccinationList = document.getElementById('vaccinationList');
        if (!vaccinationList) return;

        vaccinationList.innerHTML = patientData.vaccinations.map(vaccination => `
            <tr>
                <td>${vaccination.name}</td>
                <td>${new Date(vaccination.date).toLocaleDateString()}</td>
                <td>${new Date(vaccination.nextDue).toLocaleDateString()}</td>
                <td>${vaccination.batch}</td>
            </tr>
        `).join('');
    }

    // Function to update notes
    function updateNotes() {
        const notesTextarea = document.getElementById('internalNotes');
        if (notesTextarea) {
            notesTextarea.value = patientData.notes;
        }
    }

    // Function to save data to localStorage
    function saveData() {
        localStorage.setItem('patientData', JSON.stringify(patientData));
    }
}); 