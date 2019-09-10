const YEARS: number[] = [
    2015,
    2016,
    2017,
    2018,
    2019
]

const LABEL_TEXT: string = 'Flights'

const COLOR_TEXT: string = '#42b883'

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
