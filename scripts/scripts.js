// Data management functions
const MentalHealthDB = {
    async getData() {
        try {
            const response = await fetch('../data/data.json');
            return await response.json();
        } catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    },

    async getResources() {
        const data = await this.getData();
        return data?.mental_health_resources || [];
    },

    async getCounselors() {
        const data = await this.getData();
        return data?.counselors || [];
    },

    /* Commenting out search functions
    async searchResources(query) {
        const resources = await this.getResources();
        return resources.filter(resource => 
            resource.title.toLowerCase().includes(query.toLowerCase()) ||
            resource.description.toLowerCase().includes(query.toLowerCase())
        );
    },

    async filterByCategory(category) {
        const resources = await this.getResources();
        if (category === 'all') return resources;
        return resources.filter(resource => resource.category === category);
    },
    */
}; 