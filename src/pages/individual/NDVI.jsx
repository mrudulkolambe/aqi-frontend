import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import axios from 'axios';
import moment from 'moment';

const NDVI = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  useEffect(() => {
    console.log(`${moment().subtract(3, 'months').format("DD MM YYYY")}`);
    axios(`https://api.agromonitoring.com/agro/1.0/ndvi/history?polyid=662de9cd1a451ad923bed17a&start=${moment().subtract(3, 'months').format("X")}&end=${moment().format("X")}&appid=f742fa923a192f5179a6f04ed62092cd`, {})
      .then((res) => {
        console.log(JSON.stringify(res.data))
        let data1 = res.data.map((items) => Number(items.data.max))
        let data2 = res.data.map((items) => items.dt * 1000)
        setData1(data1)
        setData2(data2)
      })
  }, []);
  function getAverage(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum / array.length;
  }
  return (
    <section className='text-white min-h-screen w-screen bg-main flex flex-col py-6'>
      <h3 className='text-white font-semibold text-2xl text-center mb-4'>NDVI Index</h3>
      <div className='grid grid-cols-2 gap-3 px-3r'>
        <div className=' h-20 flex flex-col items-center'>
          <h2 className='font-semibold text-lg'>Max</h2>
          <h1 className='text-4xl font-bold'>{Math.max(...data1).toPrecision(2) || 0}</h1>
        </div>
        <div className=' h-20 flex flex-col items-center'>
          <h2 className='font-semibold text-lg'>Min</h2>
          <h1 className='text-4xl font-bold'>{Math.min(...data1).toPrecision(2) || 0}</h1>
        </div>
        <div className='col-span-2  h-20 flex flex-col items-center'>
          <h2 className='font-semibold text-lg'>Avg</h2>
          <h1 className='text-4xl font-bold'>{getAverage(data1).toPrecision(2) || 0}</h1>
        </div>
      </div>
      <Chart options={{
        theme: {
          mode: "dark",
        },
        chart: {
          background: "rgb(8, 8, 7)",
          height: 350,
          type: 'area',
          toolbar: {
            show: false,
          },
          selection: {
            enabled: false
          }
        },
        grid: {
          show: false
        },
        fill: {
          colors: undefined,
          opacity: 0.9,
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: "vertical",
            shadeIntensity: 0.5,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0,
            stops: [0, 100],
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          lineCap: "round"
        },
        yaxis: {
          show: false
        },
        xaxis: {
          show: false,
          tickAmount: 3,
          type: 'datetime',
          categories: data2,
          labels: {
            formatter: (value) => moment(value).format("DD-MM"),
            style: {
              fontFamily: "Nunito"
            }
          },
        },
        tooltip: {
          x: {
            format: 'DD-M'
          }
        },
      }} series={[
        {
          name: "series",
          data: data1
        }
      ]} type="area" height={500} width={"100%"} />
    </section>
  )
}

export default NDVI