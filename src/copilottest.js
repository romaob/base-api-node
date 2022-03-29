function calculateDaysBetween(startDate, endDate) {
    var millisecondsPerDay = 86400 * 1000;
    return (endDate - startDate) / millisecondsPerDay;
}