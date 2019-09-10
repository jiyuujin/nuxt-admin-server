const YEARS: number[] = [
    2015,
    2016,
    2017,
    2018,
    2019
]

const LABEL_TEXT: string = 'Flights'

const COLOR_TEXT: string = '#42b883'

export const CHART_OPTIONS = {
    title: {
    //
    },
    legend: {
        display: true
    },
    layout: {
        padding: {
            top: 20,
            left: 20,
            bottom: 20,
            right: 20
        }
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    display: true,
                    drawOnChartArea: false,
                    color: '#ccc',
                    zeroLineColor: '#fff'
                },
                scaleLabel: {
                    display: true,
                    fontColor: '#000',
                    labelString: '年',
                },
                ticks: {
                    beginAtZero: true,
                    autoSkip: true,
                    fontColor: '#000',
                    fontSize: 12
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: true,
                    drawOnChartArea: false,
                    color: '#ccc',
                    zeroLineColor: '#fff'
                },
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 40,
                    autoSkip: true,
                    fontColor: '#000',
                    fontSize: 12,
                    stepSize: 5,
                    callback: function(value, index, values) {
                        return value + 'レグ'
                    }
                }
            }
        ]
    },
    responsive: true,
    maintainAspectRatio: false
}

/**
 * グラフを描画する
 * @param allData データセット
 */
export const filledChartData = (allData: any) => {
    let dataset: number[] = []
    for (let yearIndex = 0; yearIndex < YEARS.length; yearIndex++) {
        const size = allData.filter(item => {
            return item.data.time.includes(String(YEARS[yearIndex]))
        }) || 0

        // console.log(YEARS[yearIndex] + ' : ' + size.length)
        dataset.push(size.length)
    }

    return {
        labels: YEARS,
        datasets: [
            {
                label: LABEL_TEXT,
                backgroundColor: COLOR_TEXT,
                data: dataset
            }
        ]
    }
}
