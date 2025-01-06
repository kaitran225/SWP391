const StudentDashboard = {
    async getStudentData() {
        try {
            const response = await fetch('../data/student-data.json');
            const data = await response.json();
            // Ensure we return the students array
            return data.students || [];
        } catch (error) {
            console.error('Error loading student data:', error);
            return [];
        }
    },

    getAverageMetrics(students) {
        if (!students.length) return null;

        const totals = students.reduce((acc, student) => {
            const health = student.mental_health_data;
            return {
                anxiety: acc.anxiety + Number(health.anxiety_level),
                stress: acc.stress + Number(health.stress_level),
                depression: acc.depression + Number(health.depression_score),
                sleep: acc.sleep + Number(health.sleep_quality || 0),
                attendance: acc.attendance + Number(health.attendance_rate || 0)
            };
        }, { anxiety: 0, stress: 0, depression: 0, sleep: 0, attendance: 0 });

        const count = students.length;
        return {
            averageAnxiety: Number((totals.anxiety / count).toFixed(1)),
            averageStress: Number((totals.stress / count).toFixed(1)),
            averageDepression: Number((totals.depression / count).toFixed(1)),
            averageSleep: Number((totals.sleep / count).toFixed(1)),
            averageAttendance: Number((totals.attendance / count).toFixed(1))
        };
    },

    async searchStudents(query) {
        const students = await this.getStudentData();
        if (!query) return students;
        
        const searchTerm = query.toLowerCase();
        return students.filter(student => 
            student.name.toLowerCase().includes(searchTerm) ||
            student.id.toString().includes(searchTerm) ||
            student.grade.toLowerCase().includes(searchTerm)
        );
    },

    async filterByGrade(grade) {
        const students = await this.getStudentData();
        if (grade === 'all') return students;
        return students.filter(student => student.grade === grade);
    }
}; 