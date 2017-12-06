$(document).ready(function(){
    var context         = document.getElementById('bydate').getContext('2d');
    var contextBy15Days = document.getElementById('by15days').getContext('2d');

    $.get('http://localhost:5000/dash/by-days')
    .done(function(result){
        var chart = new Chart(context,{
            type:'line',
            data: {
                labels: result.labels
                datasets: result.datasets,
            },
            options: {}
        });
    });

    $.get('http://localhost:5000/dash/by-15-days')
    .done(function(result) {
        var chart = new Chart(contextBy15Days, {
            type: 'pie',
            data: {
                labels: result.labels ,
                datasets: result.datasets
            },
            options: {}
        })
    })
});
