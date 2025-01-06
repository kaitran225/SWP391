const BookingSystem = {
    async loadCounselors() {
        const counselors = await MentalHealthDB.getCounselors();
        const select = document.getElementById('counselorSelect');
        
        counselors.forEach(counselor => {
            const option = document.createElement('option');
            option.value = counselor.id;
            option.textContent = `${counselor.name} - ${counselor.specialization}`;
            select.appendChild(option);
        });
    },

    generateTimeSlots(availability) {
        const timeSlots = [];
        const [startDay, endDay] = availability.split('-');
        const hours = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
        
        return hours.map(time => ({
            time,
            available: true
        }));
    },

    async handleCounselorChange() {
        const counselorId = document.getElementById('counselorSelect').value;
        const counselors = await MentalHealthDB.getCounselors();
        const counselor = counselors.find(c => c.id === parseInt(counselorId));
        
        if (counselor) {
            const timeSlots = this.generateTimeSlots(counselor.availability);
            this.populateTimeSlots(timeSlots);
        }
    },

    populateTimeSlots(slots) {
        const select = document.getElementById('timeSlot');
        select.innerHTML = '';
        
        slots.forEach(slot => {
            if (slot.available) {
                const option = document.createElement('option');
                option.value = slot.time;
                option.textContent = slot.time;
                select.appendChild(option);
            }
        });
    },

    async handleSubmit(event) {
        event.preventDefault();
        
        const appointment = {
            counselorId: document.getElementById('counselorSelect').value,
            date: document.getElementById('appointmentDate').value,
            time: document.getElementById('timeSlot').value,
            sessionType: document.getElementById('sessionType').value,
            notes: document.getElementById('notes').value,
            studentId: await this.getCurrentStudentId()
        };

        try {
            await this.saveAppointment(appointment);
            alert('Appointment booked successfully!');
            window.location.href = 'student-dashboard.html';
        } catch (error) {
            alert('Error booking appointment. Please try again.');
            console.error('Booking error:', error);
        }
    },

    async getCurrentStudentId() {
        // This should be implemented based on your authentication system
        return 'STU001'; // Placeholder
    },

    async saveAppointment(appointment) {
        // This should be implemented to save to your backend
        console.log('Saving appointment:', appointment);
        // Placeholder for API call
        return Promise.resolve(true);
    },

    initialize() {
        this.loadCounselors();
        
        document.getElementById('counselorSelect')
            .addEventListener('change', () => this.handleCounselorChange());
        
        document.getElementById('appointmentForm')
            .addEventListener('submit', (e) => this.handleSubmit(e));
    }
};

window.addEventListener('load', () => BookingSystem.initialize()); 