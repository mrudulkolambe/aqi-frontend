import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import axios from 'axios';
import moment from 'moment';

const NDVI = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  useEffect(() => {
    axios(`https://home.agromonitoring.com/api/proxy/history/ndvi?polyid=662de9cd1a451ad923bed17a&start=1708972200&end=${moment().format("X")}`, {
      headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxNDMzMTMxNiwianRpIjoiYmNmYjM5ZjUtYmE3My00MGNkLWFhODYtODkzY2I4MTFkNmQ1IiwidHlwZSI6ImFjY2VzcyIsInBhc3Nwb3J0Ijp7ImRhdGEiOnsiZW1haWwiOiJtcnVkdWxrb2xhbWJlMDJAZ21haWwuY29tIiwiYXBwaWQiOiJmNzQyZmE5MjNhMTkyZjUxNzlhNmYwNGVkNjIwOTJjZCIsInRhcmlmZiI6ImZyZWUiLCJjb25maXJtZWRfZW1haWwiOnRydWV9LCJsaW1pdHMiOnsiY2FsbHMiOnsib25lX2NhbGwiOjUwMCwibmR2aV9oaXN0b3J5Ijo1MDAsInNvaWxfaGlzdG9yeSI6MCwid2VhdGhlcl9oaXN0b3J5X2FjY3VtdWxhdGVkX3RlbXBlcmF0dXJlIjowLCJ3ZWF0aGVyX2hpc3RvcnlfYWNjdW11bGF0ZWRfcHJlY2lwaXRhdGlvbiI6MCwid2VhdGhlcl9oaXN0b3J5IjowfSwiaGlzdG9yeSI6eyJuZHZpX2hpc3RvcnkiOnsic3RhcnQiOjEzNTY5OTg0MDAsImRlcHRoIjotMX0sInNvaWxfaGlzdG9yeSI6eyJzdGFydCI6MTU0NjMwMDgwMCwiZGVwdGgiOjB9LCJ3ZWF0aGVyX2hpc3RvcnlfYWNjdW11bGF0ZWRfdGVtcGVyYXR1cmUiOnsic3RhcnQiOjE1NDYzMDA4MDAsImRlcHRoIjowfSwid2VhdGhlcl9oaXN0b3J5X2FjY3VtdWxhdGVkX3ByZWNpcGl0YXRpb24iOnsic3RhcnQiOjE1NDYzMDA4MDAsImRlcHRoIjowfSwid2VhdGhlcl9oaXN0b3J5Ijp7InN0YXJ0IjoxMzI1Mzc2MDAwLCJkZXB0aCI6MH19LCJwb2x5Z29uX2FyZWEiOnsibWluX3BvbHlnb25fYXJlYSI6MSwibWF4X3BvbHlnb25fYXJlYSI6MTAwMCwibWF4X3RvdGFsX3BvbHlnb25zX2FyZWEiOjEwMDB9LCJtYXBzIjp7ImNyb3AiOlt7InllYXIiOjIwMjEsInN0YXR1cyI6Mn0seyJ5ZWFyIjoyMDIwLCJzdGF0dXMiOjJ9LHsieWVhciI6MjAxOSwic3RhdHVzIjoxfSx7InllYXIiOjIwMTgsInN0YXR1cyI6M30seyJ5ZWFyIjoyMDE3LCJzdGF0dXMiOjN9XX19fSwibmJmIjoxNzE0MzMxMzE2LCJleHAiOjE3MTQzMzQ5MTZ9.0pKlkSi999c2dIYRu33NPziv6AAwYO6CafbBGtDCZao"
      }
    })
      .then((res) => {
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