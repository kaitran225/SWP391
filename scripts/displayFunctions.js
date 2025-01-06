// Common display functions used across pages
const DisplayFunctions = {
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
    },

    getIndicatorClass(value) {
        if (value <= 3) return 'indicator-good';
        if (value <= 6) return 'indicator-warning';
        return 'indicator-danger';
    }
}; 