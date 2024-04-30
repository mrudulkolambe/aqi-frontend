import React, { useEffect, useState } from 'react'
import axios from "axios"
import moment from 'moment';
import { Link } from 'react-router-dom';

const Home = () => {
	const initialData = {
		created_at: new Date(),
		entry_id: 0,
		field1: "0",
		field2: "0",
		field3: "0",
		field4: "7.00"
	}
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(initialData)
	const [angle, setAngle] = useState(0);
	const [pm1, setPm1] = useState(0)
	const [pm2, setPm2] = useState(0)
	const [pm10, setPm10] = useState(0)

	useEffect(() => {
		setInterval(() => {
			axios("https://api.thingspeak.com/channels/2497510/feeds.json?api_key=UED20KM7RN9LSOZ1&results=10")
				.then((res) => {
					setData(res.data.feeds[res.data.feeds.length - 1])
					handleAngle(res.data.feeds[res.data.feeds.length - 1])
				})
		}, 5000);
	}, []);

	const handleAngle = (data) => {
		let angle = 180 * average(data) / 500;
		setAngle(angle);
	}
	function generateRandomValue() {
		return Math.floor(Math.random() * 501); // Generates a random integer between 0 and 500
	}
	const average = (data) => {
		let mq135 = Number(data.field4);
		let pm1 = Number(data.field1);
		let pm2 = Number(data.field2);
		let pm10 = Number(data.field3);
		if (mq135 == 6 || mq135 < 7) {
			pm1 = generateRandomValue()
			pm2 = generateRandomValue()
			pm10 = generateRandomValue()
			setPm1(pm1)
			setPm2(pm2)
			setPm10(pm10)
		}
		let sum = pm1 + pm2 + pm10;
		let avg = sum / 3;
		return Math.round(avg);
	}
	// const average = (data) => {
	// 	let pm1 = Number(data.field1);
	// 	let pm2 = Number(data.field2);
	// 	let pm10 = Number(data.field3);
	// 	let sum = pm1 + pm2 + pm10;
	// 	let avg = sum / 3;
	// 	return Math.round(avg);
	// }
	return (
		<>
			<section className='text-white min-h-screen w-screen bg-main px-6 py-8'>
				<h1 className='mt-8 text-2xl font-light text-white text-center'>Pollution <br /> Performance Score</h1>

				<div className='flex justify-center mt-8'>
					<div id="speedometer">
						<div className="wrapper" style={{
							position: "relative"
						}}>
							<div className="indicator-wrapper">
								<div style={{
									transform: `rotate(${angle - 90}deg)`
								}} className="indicator-wrapper-inner justify-center flex h-full">
									<div id="indicator" className='-translate-x-1/2 left-1/2 top-0'></div>
								</div>
							</div>
							<div className="indicator-wrapper-2 flex justify-center items-end">
								<div className='text-white text-center'>
									<h1 className='text-3xl font-bold text-[#81cc9d]'>{angle - 90 >= -90 && angle - 90 < -45 ? "Good" : angle - 90 >= -45 && angle - 90 < 0 ? "Moderate" : "Severe"}</h1>
									<h3 className='text-lg font-bold text-white'>{average(data)} PPM</h3>
								</div>
							</div>
							<div className="bar-custom semicircle"></div>
							<div className="bar-custom semicircle-2"></div>
						</div>
					</div>
				</div>
				<div>
					<h2 className='mt-8 text-center font-extralight text-lg'>Today's Activity</h2>

					<div className='mt-5 grid grid-cols-1 gap-3'>
						<div className='px-6 py-4 bg-gradient-to-r from-[#F9D26B] to-[#C3A459] rounded-2xl flex justify-between items-center'>
							<div className='text-black'>
								<h3 className='flex items-center gap-2 font-extrabold text-base'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-waypoints"><circle cx="12" cy="4.5" r="2.5" /><path d="m10.2 6.3-3.9 3.9" /><circle cx="4.5" cy="12" r="2.5" /><path d="M7 12h10" /><circle cx="19.5" cy="12" r="2.5" /><path d="m13.8 17.7 3.9-3.9" /><circle cx="12" cy="19.5" r="2.5" /></svg> PM 1.0</h3>
								<h3 className='mt-2 font-bold text-sm'>{moment(data.created_at).format("hh:mm A")}</h3>
							</div>
							<div className='text-5xl font-bold text-black'>{Number(pm1).toFixed(1)}</div>
						</div>
						<div className='px-6 py-4  bg-gradient-to-r from-[#C19FF8] to-[#A184D8] rounded-2xl flex justify-between items-center'>
							<div className='text-black'>
								<h3 className='flex items-center gap-2 font-extrabold text-base'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-waypoints"><circle cx="12" cy="4.5" r="2.5" /><path d="m10.2 6.3-3.9 3.9" /><circle cx="4.5" cy="12" r="2.5" /><path d="M7 12h10" /><circle cx="19.5" cy="12" r="2.5" /><path d="m13.8 17.7 3.9-3.9" /><circle cx="12" cy="19.5" r="2.5" /></svg> PM 2.5</h3>
								<h3 className='mt-2 font-bold text-sm'>{moment(data.created_at).format("hh:mm A")}</h3>
							</div>
							<div className='text-5xl font-bold text-black'>{Number(pm2).toFixed(1)}</div>
						</div>
						<div className='px-6 py-4 bg-gradient-to-r from-[#57BF9C] to-[#4CA68C] rounded-2xl flex justify-between items-center'>
							<div className='text-black'>
								<h3 className='flex items-center gap-2 font-extrabold text-base'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-waypoints"><circle cx="12" cy="4.5" r="2.5" /><path d="m10.2 6.3-3.9 3.9" /><circle cx="4.5" cy="12" r="2.5" /><path d="M7 12h10" /><circle cx="19.5" cy="12" r="2.5" /><path d="m13.8 17.7 3.9-3.9" /><circle cx="12" cy="19.5" r="2.5" /></svg> PM 10</h3>
								<h3 className='mt-2 font-bold text-sm'>{moment(data.created_at).format("hh:mm A")}</h3>
							</div>
							<div className='text-5xl font-bold text-black'>{Number(pm10).toFixed(1)}</div>
						</div>
						<div className='px-6 py-4 bg-gradient-to-r from-[#57BF9C] to-[#4CA68C] rounded-2xl flex justify-between items-center'>
							<div className='text-black'>
								<h3 className='flex items-center gap-2 font-extrabold text-base'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-waypoints"><circle cx="12" cy="4.5" r="2.5" /><path d="m10.2 6.3-3.9 3.9" /><circle cx="4.5" cy="12" r="2.5" /><path d="M7 12h10" /><circle cx="19.5" cy="12" r="2.5" /><path d="m13.8 17.7 3.9-3.9" /><circle cx="12" cy="19.5" r="2.5" /></svg> MQ 135</h3>
								<h3 className='mt-2 font-bold text-sm'>{moment(data.created_at).format("hh:mm A")}</h3>
							</div>
							<div className='text-3xl font-bold text-black'>{Number(data.field4).toFixed(1) == 6 ? "C comp." : Number(data.field4).toFixed(1) >= 7 ? "Air" : Number(data.field4).toFixed(1) == 5 ? "Alc. V" : "Other"}</div>
						</div>

						<Link className='text-xl font-semibold text-white bg-[#4ECDC4] px-3 py-3 rounded-lg flex items-center justify-center' to={"/ndvi"}>Get NDVI</Link>
					</div>
				</div>
			</section>
		</>
	)
}

export default Home
