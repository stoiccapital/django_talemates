document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('content-area');
    const navItems = document.querySelectorAll('.nav-item');
    const brandLink = document.querySelector('.brand-link');
    const profileBtn = document.querySelector('.profile-btn');

    // Sample data structure for patient records
    let patientData = {
        visits: [],
        vaccinations: [],
        notes: ''
    };

    // Content templates for each section
    const contentTemplates = {
        karteikarte: {
            title: 'Karteikarte',
            content: `
                <div class="karteikarte-container">
                    <!-- Animal Profile Section -->
                    <section class="profile-section">
                        <h2>Tierprofil</h2>
                        <form id="animalProfileForm" class="profile-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" id="name" placeholder="Tiername">
                                </div>
                                <div class="form-group">
                                    <label for="species">Spezies</label>
                                    <input type="text" id="species" placeholder="z.B. Hund, Katze">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="breed">Rasse</label>
                                    <input type="text" id="breed" placeholder="Rasse">
                                </div>
                                <div class="form-group">
                                    <label for="birthdate">Geburtsdatum</label>
                                    <input type="date" id="birthdate">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="sex">Geschlecht</label>
                                    <select id="sex">
                                        <option value="">Bitte wählen</option>
                                        <option value="male">Männlich</option>
                                        <option value="female">Weiblich</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="color">Farbe</label>
                                    <input type="text" id="color" placeholder="Fellfarbe">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="chipNumber">Chip-Nummer</label>
                                    <input type="text" id="chipNumber" placeholder="Chip-Nummer">
                                </div>
                                <div class="form-group">
                                    <label for="ownerName">Besitzer</label>
                                    <input type="text" id="ownerName" placeholder="Name des Besitzers">
                                </div>
                            </div>
                            <button type="submit" class="save-btn">Profil speichern</button>
                        </form>
                    </section>

                    <!-- Visit History Section -->
                    <section class="visit-section">
                        <h2>Besuchsverlauf</h2>
                        <form id="visitForm" class="visit-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="visitDate">Datum</label>
                                    <input type="date" id="visitDate" required>
                                </div>
                                <div class="form-group">
                                    <label for="visitReason">Grund</label>
                                    <input type="text" id="visitReason" placeholder="Besuchsgrund" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="diagnosis">Diagnose</label>
                                <textarea id="diagnosis" rows="2" required></textarea>
                            </div>
                            <div class="form-group">
                                <label for="treatment">Behandlung</label>
                                <textarea id="treatment" rows="2" required></textarea>
                            </div>
                            <div class="form-group">
                                <label for="visitNotes">Notizen</label>
                                <textarea id="visitNotes" rows="2"></textarea>
                            </div>
                            <button type="submit" class="save-btn">Besuch hinzufügen</button>
                        </form>
                        <div id="visitHistory" class="visit-history">
                            <h3>Letzte Besuche</h3>
                            <div class="visit-list"></div>
                        </div>
                    </section>

                    <!-- Vaccination Records Section -->
                    <section class="vaccination-section">
                        <h2>Impfungen</h2>
                        <form id="vaccinationForm" class="vaccination-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="vaccineName">Impfstoff</label>
                                    <input type="text" id="vaccineName" required>
                                </div>
                                <div class="form-group">
                                    <label for="vaccineDate">Datum</label>
                                    <input type="date" id="vaccineDate" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="nextDueDate">Nächste Impfung fällig</label>
                                    <input type="date" id="nextDueDate" required>
                                </div>
                                <div class="form-group">
                                    <label for="batchNumber">Chargennummer</label>
                                    <input type="text" id="batchNumber" required>
                                </div>
                            </div>
                            <button type="submit" class="save-btn">Impfung hinzufügen</button>
                        </form>
                        <div class="vaccination-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Impfstoff</th>
                                        <th>Datum</th>
                                        <th>Nächste Impfung</th>
                                        <th>Chargennummer</th>
                                    </tr>
                                </thead>
                                <tbody id="vaccinationList"></tbody>
                            </table>
                        </div>
                    </section>

                    <!-- Internal Notes Section -->
                    <section class="notes-section">
                        <h2>Interne Notizen</h2>
                        <form id="notesForm" class="notes-form">
                            <div class="form-group">
                                <textarea id="internalNotes" rows="4" placeholder="Interne Notizen..."></textarea>
                            </div>
                            <button type="submit" class="save-btn">Notizen speichern</button>
                        </form>
                    </section>
                </div>
            `
        },
        kalender: {
            title: 'Kalender',
            content: 'Terminplanung und Übersicht.'
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
            contentArea.innerHTML = `
                <h1>${template.title}</h1>
                ${template.content}
            `;
            
            // Initialize event listeners for the Karteikarte section
            if (section === 'karteikarte') {
                initializeKarteikarte();
            }
            
            // Update URL without page reload
            history.pushState({ section }, '', `#${section}`);
            
            // Update active state of nav items
            navItems.forEach(item => {
                item.classList.toggle('active', item.dataset.section === section);
            });
        }
    }

    // Function to initialize Karteikarte functionality
    function initializeKarteikarte() {
        const visitForm = document.getElementById('visitForm');
        const vaccinationForm = document.getElementById('vaccinationForm');
        const notesForm = document.getElementById('notesForm');
        const animalProfileForm = document.getElementById('animalProfileForm');

        // Load saved data from localStorage
        const savedData = localStorage.getItem('patientData');
        if (savedData) {
            patientData = JSON.parse(savedData);
            updateVisitHistory();
            updateVaccinationList();
            updateNotes();
        }

        // Handle visit form submission
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

        // Handle vaccination form submission
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

        // Handle notes form submission
        notesForm.addEventListener('submit', (e) => {
            e.preventDefault();
            patientData.notes = document.getElementById('internalNotes').value;
            saveData();
        });

        // Handle animal profile form submission
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

    // Function to show home page
    function showHome() {
        contentArea.innerHTML = `
            <h1>Willkommen bei der Veterinärpraxis</h1>
            <p>Bitte wählen Sie einen Bereich aus dem Menü aus.</p>
        `;
        history.pushState({ section: 'home' }, '', '/');
        
        // Remove active state from all nav items
        navItems.forEach(item => {
            item.classList.remove('active');
        });
    }

    // Add click event listeners to nav items
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            updateContent(section);
        });
    });

    // Add click event listener to brand link
    brandLink.addEventListener('click', (e) => {
        e.preventDefault();
        showHome();
    });

    // Add click event listener to profile button
    profileBtn.addEventListener('click', () => {
        updateContent('profile');
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.section) {
            if (event.state.section === 'home') {
                showHome();
            } else {
                updateContent(event.state.section);
            }
        }
    });

    // Handle initial page load with hash
    const initialSection = window.location.hash.slice(1);
    if (initialSection && contentTemplates[initialSection]) {
        updateContent(initialSection);
    }
}); 