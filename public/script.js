document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const brandLink = document.querySelector('.brand-link');
    const profileBtn = document.querySelector('.profile-btn');

    // Content templates for each section
    const contentTemplates = {
        kalender: {
            title: 'Kalender',
            content: `
                <header class="content-header">
                    <h1>Kalender</h1>
                    <div class="header-actions">
                        <button id="addAppointmentBtn" class="btn-primary">+ Neuer Termin</button>
                    </div>
                </header>

                <section class="calendar-section">
                    <div class="calendar-header">
                        <button id="prevMonth" class="btn-icon">←</button>
                        <h2 id="currentMonthYear">Juni 2025</h2>
                        <button id="nextMonth" class="btn-icon">→</button>
                    </div>

                    <div class="calendar-grid">
                        <div class="weekdays">
                            <div>Mo</div>
                            <div>Di</div>
                            <div>Mi</div>
                            <div>Do</div>
                            <div>Fr</div>
                            <div>Sa</div>
                            <div>So</div>
                        </div>
                        <div id="calendarDays" class="days"></div>
                    </div>
                </section>

                <div id="appointmentModal" class="modal">
                    <div class="modal-content">
                        <h3>Neuer Termin</h3>
                        <form id="appointmentForm">
                            <div class="form-group">
                                <label for="appointmentTime">Uhrzeit</label>
                                <input type="time" id="appointmentTime" required>
                            </div>
                            <div class="form-group">
                                <label for="patientName">Patient</label>
                                <input type="text" id="patientName" required>
                            </div>
                            <div class="form-group">
                                <label for="appointmentReason">Grund</label>
                                <textarea id="appointmentReason" required></textarea>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn-secondary" id="cancelAppointment">Abbrechen</button>
                                <button type="submit" class="btn-primary">Speichern</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div id="viewAppointmentsModal" class="modal">
                    <div class="modal-content">
                        <h3>Termine am <span id="selectedDate"></span></h3>
                        <div id="appointmentsList"></div>
                        <div class="modal-actions">
                            <button class="btn-secondary" id="closeAppointments">Schließen</button>
                        </div>
                    </div>
                </div>
            `
        },
        wartezimmer: {
            title: 'Wartezimmer',
            content: 'Aktuelle Warteliste und Patientenstatus.'
        },
        tagesprotokoll: {
            title: 'Tagesprotokoll',
            content: 'Tägliche Aktivitäten und Behandlungen.'
        },
        stammdaten: {
            title: 'Stammdaten',
            content: 'Verwaltung der Grunddaten.'
        },
        bestandsverwaltung: {
            title: 'Bestandsverwaltung',
            content: 'Übersicht über Medikamente und Materialien.'
        },
        laborbuch: {
            title: 'Laborbuch',
            content: 'Laboruntersuchungen und Ergebnisse.'
        },
        nachrichten: {
            title: 'Nachrichten',
            content: 'Kommunikation und Mitteilungen.'
        },
        finanzen: {
            title: 'Finanzen',
            content: 'Finanzverwaltung und Abrechnungen.'
        },
        settings: {
            title: 'Einstellungen',
            content: 'Hier können Sie die Anwendungseinstellungen anpassen.'
        },
        profile: {
            title: 'Profil',
            content: `
                <div class="profile-form">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" placeholder="Ihr Name">
                    </div>
                    <div class="form-group">
                        <label for="email">E-Mail</label>
                        <input type="email" id="email" placeholder="Ihre E-Mail">
                    </div>
                    <div class="form-group">
                        <label for="role">Position</label>
                        <input type="text" id="role" placeholder="Ihre Position">
                    </div>
                    <button class="save-btn">Speichern</button>
                </div>
            `
        }
    };

    // Function to update content
    function updateContent(section) {
        const template = contentTemplates[section];
        if (template) {
            const contentArea = document.querySelector('.content');
            if (contentArea) {
                contentArea.innerHTML = `
                    <div class="profile-button">
                        <button class="profile-btn" data-section="profile">
                            <span class="profile-icon">👤</span>
                            <span class="profile-text">Profil</span>
                        </button>
                    </div>
                    <h1>${template.title}</h1>
                    ${template.content}
                `;
            }
            
            // Update URL without page reload
            history.pushState({ section }, '', `#${section}`);
            
            // Update active state of nav items
            navItems.forEach(item => {
                item.classList.toggle('active', item.dataset.section === section);
            });
        }
    }

    // Add click event listeners to nav items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            if (section === 'karteikarte') {
                window.location.href = 'karteikarte.html';
            } else if (section === 'kalender') {
                window.location.href = 'kalender.html';
            } else {
                updateContent(section);
            }
        });
    });

    // Add click event listener to brand link
    brandLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });

    // Add click event listener to profile button
    profileBtn.addEventListener('click', () => {
        updateContent('profile');
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.section) {
            updateContent(event.state.section);
        }
    });

    // Handle initial page load with hash
    const initialSection = window.location.hash.slice(1);
    if (initialSection && contentTemplates[initialSection]) {
        updateContent(initialSection);
    }
}); 