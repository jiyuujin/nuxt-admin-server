import { ItemDataList } from '@/types/database.types';
import { connectCollection } from './collectionService';
import { PAGE_SIZE } from './paginationService';
import { isValidText } from '~/store/utils';

const collection = connectCollection('flights')

export const fetchFlights = async () => {
    let result: ItemDataList = {
        item: []
    }

    await collection.orderBy('time', 'desc').get()
        .then(snapshot => {
            let i = 1
            snapshot.forEach(doc => {
                // console.log(doc.id + ' ' + doc.data())
                result.item.push({
                    id: doc.id,
                    data: doc.data(),
                    page: Math.ceil(i / PAGE_SIZE)
                })
                i++
            })
        })

    return result
}

export const addFlight = async ({ time, departure, arrival, airline, boardingType, registration }: Flight) => {
    if (isValidText(time)) {
        return
    }

    await collection.add({
        'time': time,
        'departure': departure,
        'arrival': arrival,
        'airline': airline,
        'boardingType': boardingType,
        'registration': registration
    })
}

interface Flight {
    time: string
    departure: number
    arrival: number
    airline: number
    boardingType: number
    registration: string
}
