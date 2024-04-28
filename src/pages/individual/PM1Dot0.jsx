import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import axios from 'axios';

const PM1Dot0 = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  useEffect(() => {

    axios("https://api.thingspeak.com/channels/2497510/feeds.json?api_key=UED20KM7RN9LSOZ1&results=200")
      .then((res) => {
        let data1 = res.data.feeds.map((items) => Number(items.field4))
        let data2 = res.data.feeds.map((items) => items.created_at)
        setData1(data1)
        setData2(data2)
      })
  }, []);
  return (
    <section className='text-white min-h-screen w-screen bg-main'>
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
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          lineCap: "round"
        },
        xaxis: {
          type: 'datetime',
          categories: data2
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      }} series={[
        {
          name: "series",
          data: data1
        }
      ]} type="area" height={350} />
    </section>
  )
}

export default PM1Dot0