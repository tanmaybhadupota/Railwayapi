import axios from "axios";
import { startTransition, useState } from "react";

export default function PNRStatus(){

    const [pnr, setPnr] = useState('');
    const [pnrApiData, setPnrApiData] = useState(null);
    const [trainName, setTrainName] = useState('');
    const [trainNum, setTrainNum] = useState();
    const [depStation, setDepStation] = useState('');
    const [arrStation, setArrStation] = useState('');
    const [depTime, setDepTime] = useState('');
    const [arrTime, setArrTime] = useState('');
    const [date, setDate] = useState('');
    const [passengerInfo, setPassengerInfo] = useState('');
    const [distance, setDistance] = useState('');


    const getPNRValue = (e)=>{
        setPnr(e.target.value);
        // console.log(pnr);
    }

    const loadPNRData = async () =>{
        const response = await axios.get(
            `https://pnr-status-indian-railway.p.rapidapi.com/pnr-check/${pnr}`,
            {
            headers: {
                'X-RapidAPI-Key': 'ab47d69698mshf4b7ec672ad8d79p1b56cbjsnd6c4d96fbe2a',
                'X-RapidAPI-Host': 'pnr-status-indian-railway.p.rapidapi.com',
              }
            }
        );
        
        const responseData = response.data.data;

        setPnrApiData(responseData);

        setTrainName(responseData.trainInfo.name);
        setTrainNum(responseData.trainInfo.trainNo);
        setDepStation(responseData.boardingInfo.stationName);
        
        console.log(trainName, trainNum, depStation);
        
        
        
        // console.log(pnrApiData);
    }


    return(
        <div>
            <input type="text" value={pnr} onChange={getPNRValue} />
            <button onClick={loadPNRData}>Load Data...</button>

            <p>Train No: {trainNum}</p>
        </div>
    );
}