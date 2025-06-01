// Calendar state
let currentDate = new Date();
let appointments = {};

// DOM Elements
const calendarDays = document.getElementById('calendarDays');
const currentMonthYear = document.getElementById('currentMonthYear');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const appointmentModal = document.getElementById('appointmentModal');
const viewAppointmentsModal = document.getElementById('viewAppointmentsModal');
const appointmentForm = document.getElementById('appointmentForm');
const addAppointmentBtn = document.getElementById('addAppointmentBtn');
const cancelAppointmentBtn = document.getElementById('cancelAppointment');
const closeAppointmentsBtn = document.getElementById('closeAppointments');
const selectedDateSpan = document.getElementById('selectedDate');
const appointmentsList = document.getElementById('appointmentsList');

// Event Listeners
prevMonthBtn.addEventListener('click', () => navigateMonth(-1));
nextMonthBtn.addEventListener('click', () => navigateMonth(1));
addAppointmentBtn.addEventListener('click', () => showAppointmentModal());
cancelAppointmentBtn.addEventListener('click', () => hideAppointmentModal());
closeAppointmentsBtn.addEventListener('click', () => hideViewAppointmentsModal());
appointmentForm.addEventListener('submit', handleAppointmentSubmit);

// Initialize calendar
function initCalendar() {
    renderCalendar();
}

// Navigate months
function navigateMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

// Render calendar
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update header
    const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                       'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    currentMonthYear.textContent = `${monthNames[month]} ${year}`;
    
    // Clear calendar
    calendarDays.innerHTML = '';
    
    // Get first day of month and total days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    
    // Get starting day (0 = Sunday, 1 = Monday, etc.)
    let startingDay = firstDay.getDay();
    startingDay = startingDay === 0 ? 6 : startingDay - 1; // Convert to Monday-based
    
    // Add previous month's days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'day other-month';
        day.textContent = prevMonthLastDay - i;
        calendarDays.appendChild(day);
    }
    
    // Add current month's days
    const today = new Date();
    for (let i = 1; i <= totalDays; i++) {
        const day = document.createElement('div');
        day.className = 'day';
        day.textContent = i;
        
        // Check if it's today
        if (i === today.getDate() && 
            month === today.getMonth() && 
            year === today.getFullYear()) {
            day.classList.add('today');
        }
        
        // Check if day has appointments
        const dateKey = `${year}-${month + 1}-${i}`;
        if (appointments[dateKey] && appointments[dateKey].length > 0) {
            day.classList.add('has-appointments');
        }
        
        // Add click event
        day.addEventListener('click', () => handleDayClick(i));
        
        calendarDays.appendChild(day);
    }
    
    // Add next month's days
    const totalCells = 42; // 6 rows * 7 days
    const remainingCells = totalCells - (startingDay + totalDays);
    for (let i = 1; i <= remainingCells; i++) {
        const day = document.createElement('div');
        day.className = 'day other-month';
        day.textContent = i;
        calendarDays.appendChild(day);
    }
}

// Handle day click
function handleDayClick(day) {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        .toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    
    selectedDateSpan.textContent = dateStr;
    displayAppointments(dateKey);
    showViewAppointmentsModal();
}

// Show appointment modal
function showAppointmentModal() {
    appointmentModal.classList.add('active');
}

// Hide appointment modal
function hideAppointmentModal() {
    appointmentModal.classList.remove('active');
    appointmentForm.reset();
}

// Show view appointments modal
function showViewAppointmentsModal() {
    viewAppointmentsModal.classList.add('active');
}

// Hide view appointments modal
function hideViewAppointmentsModal() {
    viewAppointmentsModal.classList.remove('active');
}

// Handle appointment form submission
function handleAppointmentSubmit(e) {
    e.preventDefault();
    
    const time = document.getElementById('appointmentTime').value;
    const patient = document.getElementById('patientName').value;
    const reason = document.getElementById('appointmentReason').value;
    
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    
    if (!appointments[dateKey]) {
        appointments[dateKey] = [];
    }
    
    appointments[dateKey].push({
        time,
        patient,
        reason
    });
    
    hideAppointmentModal();
    renderCalendar();
}

// Display appointments for a specific date
function displayAppointments(dateKey) {
    appointmentsList.innerHTML = '';
    
    if (!appointments[dateKey] || appointments[dateKey].length === 0) {
        appointmentsList.innerHTML = '<p>Keine Termine an diesem Tag.</p>';
        return;
    }
    
    appointments[dateKey].forEach(appointment => {
        const appointmentElement = document.createElement('div');
        appointmentElement.className = 'appointment-item';
        appointmentElement.innerHTML = `
            <div class="time">${appointment.time}</div>
            <div class="patient">${appointment.patient}</div>
            <div class="reason">${appointment.reason}</div>
        `;
        appointmentsList.appendChild(appointmentElement);
    });
}

// Initialize the calendar when the page loads
document.addEventListener('DOMContentLoaded', initCalendar); 