const StudentDashboard = {
    async getStudentData() {
        try {
            const response = await fetch('../data/student-data.json');
            const data = await response.json();
            return data.students || [];
        } catch (error) {
            console.error('Error loading student data:', error);
            return [];
        }
    },

    async searchStudents(query) {
        const students = await this.getStudentData();
        return students.filter(student => 
            student.name.toLowerCase().includes(query.toLowerCase()) ||
            student.id.toLowerCase().includes(query.toLowerCase())
        );
    },

    async filterByGrade(grade) {
        const students = await this.getStudentData();
        return grade === 'all' 
            ? students 
            : students.filter(student => student.grade === grade);
    },

    getAverageMetrics(students) {
        if (!students.length) return null;
        
        const totals = students.reduce((acc, student) => {
            const mh = student.mental_health_data;
            return {
                anxiety: acc.anxiety + mh.anxiety_level,
                stress: acc.stress + mh.stress_level,
                depression: acc.depression + mh.depression_score,
                sleep: acc.sleep + mh.sleep_quality,
                attendance: acc.attendance + mh.attendance_rate
            };
        }, { anxiety: 0, stress: 0, depression: 0, sleep: 0, attendance: 0 });

        const count = students.length;
        return {
            averageAnxiety: (totals.anxiety / count).toFixed(1),
            averageStress: (totals.stress / count).toFixed(1),
            averageDepression: (totals.depression / count).toFixed(1),
            averageSleep: (totals.sleep / count).toFixed(1),
            averageAttendance: (totals.attendance / count).toFixed(1)
        };
    }
}; 