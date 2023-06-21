import { Card, Layout, Menu, Radio, DatePicker, Image, Progress } from 'antd';
import React, { useState, useEffect } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { UserIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import dayjs from 'dayjs';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    BarElement,
    Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../redux/actions/master/dashboard/DashboardAction';

const { RangePicker } = DatePicker;

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const dispatch = useDispatch()

    const [statistik, setStatistik] = useState(0);
    const [date, setDate] = useState([dayjs().startOf('month'), dayjs().endOf('month')])

    const dashboard = useSelector((state) => state.DashboardReducer)

    const dataCard = [
        { name: 'Total Order Amount', value: dashboard.order_amount ? dashboard.order_amount : 0, color: 'text-[#475569]', uang: true },
        { name: 'Total Order Number', value: dashboard.total_order ? dashboard.total_order : 0, color: 'text-[#6D9886]', uang: false },
        { name: 'Total Product', value: dashboard.total_product ? dashboard.total_product : 0, color: 'text-[#409EFF]', uang: false },
        { name: 'Stock', value: dashboard.stock ? dashboard.stock : 0, color: 'text-[#E6A23C]', uang: false }
    ]

    const colour = [
        'bg-[#F56C6C]',
        'bg-[#E6A23C]',
        'bg-[#409EFF]',
        'bg-[#6D9886]',
        'bg-[#475569]'
    ]

    const rangePresets = [
        {
            label: 'Last 7 Days',
            value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
            label: 'Last 14 Days',
            value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
            label: 'Last 1 Month',
            value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
            label: 'Last 3 Month',
            value: [dayjs().add(-90, 'd'), dayjs()],
        },
    ];

    const topCard = dashboard.top5 ? dashboard.top5 : []

    function add5card() {
        topCard.map((e, i) => {
            e.color = colour[i]
        })
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },

        },
    };

    const labels = [];
    const dataset = [];

    if (dashboard.graph1 != undefined) {
        dashboard.graph1.map((e) => {
            labels.push(e.label)
            dataset.push(e.data)
        })
    }


    const data = {
        labels,
        datasets: [
            {
                label: 'Total Order',
                data: dataset,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            // {
            //     label: 'Dataset 2',
            //     data: labels.map(() => 10000),
            //     borderColor: 'rgb(53, 162, 235)',
            //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // },
        ],
    };

    function getData() {
        dispatch(getDashboard('dashboard/order', 'total_order', date))
        dispatch(getDashboard('dashboard/order-amount', 'order_amount', date))
        dispatch(getDashboard('dashboard/count-product', 'total_product', date))
        dispatch(getDashboard('dashboard/stock', 'stock', date))
        dispatch(getDashboard('dashboard/graf', 'graph1', date))
        dispatch(getDashboard('dashboard/top-prod', 'top5', date))
    }

    useEffect(() => {
        getData()
    }, [dispatch])

    useEffect(() => {
        add5card()
    }, [topCard])


    return (
        <div className='flex flex-col gap-3 w-full h-full'>
            <div className='justify-between flex'>
                <Radio.Group
                    optionType="button"
                    buttonStyle="solid"
                    defaultValue={statistik}
                    className="flex w-[450px]"
                    onChange={(e) => { setStatistik(e.target.value) }}
                >
                    <Radio.Button className="w-full text-center" value={0}>Dashboard Chart</Radio.Button>
                    <Radio.Button className="w-full text-center" value={1}>Warehouse Statistic</Radio.Button>
                </Radio.Group>
                <div className='flex gap-2'>
                    <RangePicker presets={rangePresets} format={'DD/MM/YYYY'} value={date} onChange={(e) => {
                        setDate(e)
                    }} />
                    <button className='btn btn-sm btn-primary' onClick={() => {
                        getData()
                    }}>Set Filter</button>
                </div>

            </div>

            {
                statistik == 0 ?
                    <>
                        <Card className='w-full'>
                            <div className='flex overflow-x-auto gap-5 flex-row  '>
                                {dataCard.map((e, i) =>
                                    <Card key={i} className='h-[100px] w-[1000px]'>
                                        <h6 className={'flex flex-row gap-1 ' + e.color}>
                                            {e.name} <ExclamationCircleIcon className='w-[18px] text-gray-400' />
                                        </h6>
                                        {e.uang ? 'Rp. ' + parseInt(e.value).toLocaleString("id-ID", {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }) : parseInt(e.value).toLocaleString("id-ID", {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })}
                                    </Card>
                                )}
                            </div>
                        </Card>
                        <Card className='h-full w-full'>
                            <Line options={options} data={data} />
                        </Card>
                    </>
                    :
                    <>
                        <Card className='w-full '>
                            <div className='flex gap-5 flex-row  h-full '>
                                <Card className='bg-[#475569] basis-1/6 min-h-full flex'>
                                    <h2 className='text-white'>Top 5 Selling Stuff </h2>

                                </Card>
                                <div className='grid grid-cols-5 gap-3 basis-5/6'>
                                    {topCard.length > 0 ? topCard.map((e, i) =>
                                        <div className='rounded relative border border-gray-200' key={i}>
                                            <div className={'absolute rounded text-white top-0 left-0 ' + e.color}>
                                                <p className="my-2 mx-3">#{i + 1}</p>
                                            </div>
                                            <div className='grid grid-cols-2 w-full'>
                                                <div></div>
                                                <div className='p-2 lg:aspect-auto w-full'>
                                                    <Image
                                                        src="error"
                                                        fallback="data:image/png;base64,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"
                                                    />
                                                </div>
                                            </div>
                                            <div className='mx-2'>
                                                <h3 className='truncate ext-clip'>{e.item_name != '' ? e.item_name : 'Not Found'}</h3>
                                            </div>
                                            <div className='mx-2 py-3 flex justify-between'>
                                                <h6>{e.category_name != '' ? e.category_name : 'Not Found'}</h6>
                                                <span className='text-[#6D9886]'>{e.qty}</span>

                                            </div>
                                        </div>
                                    ) : 'Null Data'}
                                </div>
                            </div>
                        </Card>

                        {/* <div className='grid grid-cols-2 gap-4 h-full'>
                            <Card className='min-h-full'>
                                <h2>Customer Statistic</h2>
                                <div className='my-3'>
                                    <div className='grid grid-cols-2 gap-3'>
                                        <Card className='bg-[#99C5B2] rounded w-full'>
                                            <div className='flex flex-row text-white'>
                                                <UserIcon className='text-white w-[45px] basis-1/3 h-[45px]' />
                                                <div className='basis-2/3 flex flex-col'><h3>421</h3><span className='truncate'>Total Customer</span></div>
                                            </div>
                                        </Card>
                                        <Card className='bg-[#99C5B2] rounded w-full'>
                                            <div className='flex flex-row text-white'>
                                                <ArrowDownTrayIcon className='text-white w-[45px] basis-1/3 h-[45px]' />
                                                <div className='basis-2/3 flex flex-col'><h3>72</h3><span className='truncate'>Today Customer</span></div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>

                                <Bar options={options} data={data} />
                            </Card>
                            <div>
                                <Card className=''>
                                    <h2>Promotion Info</h2>
                                    <div className='my-3'>
                                        <div className='grid grid-cols-3 gap-3'>
                                            <Card className='rounded w-full'>
                                                <div className='flex flex-row '>
                                                    <div className='flex flex-col'><h3>421</h3><span className='truncate'>Total Promotion</span></div>
                                                </div>
                                            </Card>
                                            <Card className='rounded w-full'>
                                                <div className='flex flex-row '>

                                                    <div className='flex flex-col'><h3 className='text-[#409EFF]'>72</h3><span className='truncate'>Processing</span></div>
                                                </div>
                                            </Card>
                                            <Card className='rounded w-full'>
                                                <div className='flex flex-row '>

                                                    <div className='flex flex-col'><h3>0</h3><span className='truncate'>Processing</span></div>
                                                </div>
                                            </Card>
                                        </div>

                                        <div className='mt-5'>
                                            <span>RVTA Official</span>
                                            <Progress percent={30} />
                                        </div>
                                    </div>
                                </Card>

                            </div>

                        </div> */}
                    </>
            }


        </div>


    )
};
export default Dashboard;