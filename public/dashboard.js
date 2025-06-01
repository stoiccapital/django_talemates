document.addEventListener('DOMContentLoaded', () => {
    // Update current date
    updateCurrentDate();

    // Sample data
    const sampleData = {
        appointments: [
            {
                time: '09:00',
                patient: 'Max',
                species: 'Hund',
                owner: 'Herr Müller',
                reason: 'Impfung'
            },
            {
                time: '10:30',
                patient: 'Bella',
                species: 'Katze',
                owner: 'Frau Schmidt',
                reason: 'Kontrolle'
            },
            {
                time: '14:00',
                patient: 'Luna',
                species: 'Hund',
                owner: 'Familie Weber',
                reason: 'Zahnreinigung'
            }
        ],
        waitingRoom: [
            {
                name: 'Rocky',
                species: 'Hund',
                arrivalTime: '08:45',
                status: 'Wartend'
            },
            {
                name: 'Milo',
                species: 'Katze',
                arrivalTime: '09:15',
                status: 'In Behandlung'
            }
        ],
        notifications: [
            {
                type: 'vaccination',
                message: 'Impferinnerung: Max (Hund), morgen fällig'
            },
            {
                type: 'lab',
                message: 'Laborergebnis: Bella (Katze) ist verfügbar'
            },
            {
                type: 'call',
                message: 'Anruf bei Frau Müller erforderlich'
            }
        ],
        stats: {
            appointmentsCount: 3,
            waitingCount: 2,
            labResultsCount: 1,
            dailyRevenue: '450 €'
        }
    };

    // Initialize dashboard
    updateAppointments();
    updateWaitingRoom();
    updateNotifications();
    updateStats();

    // Add event listeners for quick action buttons
    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', handleQuickAction);
    });
});

// Update current date display
function updateCurrentDate() {
    const dateDisplay = document.getElementById('currentDate');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = new Date().toLocaleDateString('de-DE', options);
}

// Update appointments list
function updateAppointments() {
    const appointmentsList = document.getElementById('appointmentsList');
    appointmentsList.innerHTML = sampleData.appointments.map(appointment => `
        <div class="appointment-item">
            <div class="appointment-time">${appointment.time}</div>
            <div class="appointment-details">
                <strong>${appointment.patient}</strong> (${appointment.species})
                <div>Besitzer: ${appointment.owner}</div>
                <div>Grund: ${appointment.reason}</div>
            </div>
        </div>
    `).join('');
}

// Update waiting room list
function updateWaitingRoom() {
    const waitingList = document.getElementById('waitingList');
    waitingList.innerHTML = sampleData.waitingRoom.map(patient => `
        <div class="waiting-item">
            <div>
                <strong>${patient.name}</strong> (${patient.species})
                <div>Ankunft: ${patient.arrivalTime}</div>
            </div>
            <span class="waiting-status status-${patient.status.toLowerCase().replace(' ', '-')}">
                ${patient.status}
            </span>
        </div>
    `).join('');
}

// Update notifications list
function updateNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    notificationsList.innerHTML = sampleData.notifications.map(notification => `
        <div class="notification-item">
            ${notification.message}
        </div>
    `).join('');
}

// Update stats
function updateStats() {
    document.getElementById('appointmentsCount').textContent = sampleData.stats.appointmentsCount;
    document.getElementById('waitingCount').textContent = sampleData.stats.waitingCount;
    document.getElementById('labResultsCount').textContent = sampleData.stats.labResultsCount;
    document.getElementById('dailyRevenue').textContent = sampleData.stats.dailyRevenue;
}

// Handle quick action button clicks
function handleQuickAction(event) {
    const action = event.currentTarget.dataset.action;
    switch (action) {
        case 'new-card':
            window.location.href = 'karteikarte.html';
            break;
        case 'new-appointment':
            window.location.href = 'kalender.html';
            break;
        case 'new-note':
            // TODO: Implement new note functionality
            console.log('New note clicked');
            break;
        case 'new-protocol':
            // TODO: Implement new protocol functionality
            console.log('New protocol clicked');
            break;
    }
} 