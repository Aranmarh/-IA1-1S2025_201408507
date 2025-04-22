async function fit_predict_draw() {
    const { LinearRegression, joinArrays } = await import('https://luisespino.github.io/mlearnjs/mlearn.mjs');

    const myLinearRegression = await LinearRegression(); 
    const model = new myLinearRegression();

    const X = [1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012];

    const y = [12022015, 49316993, 73619515, 81966077, 112982018, 101817121, 94468675, 83354931, 88860478, 124609003, 116675976, 85155759, 64220789, 34289267, 20117950]


    model.fit(X, y);

    yPredict = model.predict(X)

    const myjoinArrays = await joinArrays();
    const arr = myjoinArrays('x', X, 'incentivos', y, 'incentivosPredict', yPredict);

    const log = document.getElementById('log');
    const yPred = yPredict.map(num => parseFloat(num.toFixed(2)));
    const mse = model.mse(y, yPredict);
    const r2 = model.r2(y, yPredict);
    log.innerHTML = 'Años: '+X+'<br>Nacional: '+y+'<br>yPredict: '+yPred;
    log.innerHTML += '<br>MSE: '+mse+'<br>R2: '+r2;

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);    
    function drawChart() {
        var data = google.visualization.arrayToDataTable(arr);

        var options = {
            title: ' Cantidad monetaria pagada a los propietarios de las plantaciones establecidas vs Año',
            hAxis: {title: 'Año'},
            vAxis: {title: 'Pago incentivos de reforestacion (Q.)'},
            legend: { position: 'bottom' },

            seriesType: 'scatter', // Default type
            series: {
                0: { type: 'scatter', pointSize: 5, color: '#4285F4' }, // Tasa Real
                1: { type: 'line', lineWidth: 2, color: '#DB4437', pointSize: 0 }  // Tasa Predicha (Regresión)
            },
            tooltip: { isHtml: true } // Optional: Allows HTML in tooltips if needed
        };
      
        var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
        chart.draw(data, options);         
    }
}

fit_predict_draw();

