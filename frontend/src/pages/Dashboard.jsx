import { message, Select, DatePicker } from "antd";
import {   useEffect, useState } from "react"
import { useSelector } from "react-redux";
import {Chart as ChartJS, Tooltip, ArcElement,Legend , CategoryScale,LinearScale,registerables} from "chart.js"
import { Doughnut,Bar } from "react-chartjs-2";
import { axiosUrl } from "../main";

ChartJS.register(ArcElement,Tooltip,Legend,CategoryScale,LinearScale, ...registerables)



const {RangePicker} = DatePicker


export const Dashboard = () => {

  const [frequency , setFrequency] = useState('7')
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType]  = useState("all")
  const [allTransaction, setAlllTransaction] = useState([{
    _id: '660e32dbce75009612d9deed',
    userid: '660da2767c0b38a6d338c2c2',
    amount: 500,
    type: 'income',
    category: 'stock',
    details: 'hello',
    date: '2024-04-01T00:00:00.000Z',
    createdAt: '2024-04-04T04:55:55.015Z',
    updatedAt: '2024-04-04T04:55:55.015Z',
    __v: 0
  },
  {
    _id: '660e33a2ce75009612d9def7',
    userid: '660da2767c0b38a6d338c2c2',
    amount: 1000,
    type: 'expense',
    category: 'medical',
    details: 'Hospital',
    date: '2024-04-01T00:00:00.000Z',
    createdAt: '2024-04-04T04:59:14.781Z',
    updatedAt: '2024-04-04T04:59:14.781Z',
    __v: 0
  }])

  const categegories = [
    "salary",
    "stock",
    "freelance",
    "food",
    "bills",
    "medical",
    "fees",
    "tax",
  ];
  const {currentUser} = useSelector((state)=>state.auth)

  const [barChartData, serBarChartData] = useState({
    labels : ["Infected", "Recovered", "Deaths"],
    datasets: [
      {
        label: "People",
        backgroundColor: [
          "rgba(0, 0, 255, 0.5)",
          "rgba(0, 255, 0, 0.5)",
          "rgba(255, 0, 0, 0.5)"
        ],
        data: [234234, 23423, 23423]
      }
    ]
  })

  // const BarChartOptions = {
  //   responsive : true,  
  //   plugins: {
  //     legend: {
  //       position: "bottom",
  //       display: false,
  //     },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       grid: {
  //         display: false,
  //       },
  //     },
  //     x: {
  //       grid: {
  //         display: false,
  //       },
  //     },
  //   },
  // }

  const [donutData,setDonutData] = useState({
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  })


  const getAllTransaction = async () =>{
    try {
      const user = currentUser.rest
      const response = await axiosUrl.post("/api/transactions/gettransaction",{userid: user._id,frequency,selectedDate,type})
      
      
      const val = await response.data
      setAlllTransaction(val)
      console.log(val);
      
      
      // {
      //   labels: [
      //     'Red',
      //     'Blue',
      //     'Yellow'
      //   ],
      //   datasets: [{
      //     label: 'My First Dataset',
      //     data: [300, 50, 100],
      //     backgroundColor: [
      //       'rgb(255, 99, 132)',
      //       'rgb(54, 162, 235)',
      //       'rgb(255, 205, 86)'
      //     ],
      //     hoverOffset: 4
      //   }]
      // }

      
    } catch (error) {
      console.log(error);
      message.error("Something is Wrong")
    }
  }

  
  // donut chart

    const setBarChartValueFun = () =>{
      const barAmount = []
      const labels = []

      

      categegories.map((category) =>{
        const amount = allTransaction
        .filter((transaction) => transaction.type === "expense")
        .filter((transaction)=> transaction.category === category)
        .reduce((acc, transaction) => acc + transaction.amount, 0)
          barAmount.push(amount);
          labels.push(category)
      });
      console.log(labels[0]);



      serBarChartData({
        labels : labels,
        datasets: [
          {
            label: "Expense",
            data : barAmount,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      });


    };

    
    
    // PIE Chart
    const setDonutChartValueFun = () => {
      const dataAmount = [];
      const labels = [];
      

      categegories.map((category) => {
        const amount = allTransaction
          .filter((transaction) => transaction.category === category)
          .filter((transaction) => transaction.type === "income")
          .reduce((acc, transaction) => acc + transaction.amount, 0);

        dataAmount.push(amount);
        labels.push(category);

      });
      console.log(labels);

      setDonutData({
        labels: labels,
        datasets: [
          {
            // label: "My First Dataset",
            data: dataAmount,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      });
    };


 
  



  // const totalTrinsaction = allTransaction.length
  // const totalIncomeTrinsaction = allTransaction.filter(transaction => transaction.type === "income")
  // const totalExpenseTrinsaction = allTransaction.filter(transaction => transaction.type === "expense")

  // const totalIncomePersentage = ((totalIncomeTrinsaction.length / totalTrinsaction) * 100);
  // const totalExpensePersentage = (totalExpenseTrinsaction.length/totalTrinsaction) * 100;




  // turn over
  const totalTurnOver = allTransaction.reduce((acc,transaction)=> acc + transaction.amount, 0)

  // total Income

  const totalIncomeTurnover = allTransaction.filter(transaction => transaction.type === "income")
  .reduce((acc,transaction)=> acc + transaction.amount,0)

  // console.log(totalIncomeTurnover);


  // total Expense
  const totalExpenseTurnover = allTransaction.filter(transaction => transaction.type === "expense")
  .reduce((acc,transaction)=> acc + transaction.amount,0)


  const totalIncomeTurnoverPercent = Math.round((totalIncomeTurnover/totalTurnOver) * 100)
  
  const totalExpenseTurnoverPercent = Math.round((totalExpenseTurnover/totalTurnOver) * 100)
  console.log(totalExpenseTurnoverPercent);


  const totalSaving = totalIncomeTurnover - totalExpenseTurnover





  useEffect(()=>{
    getAllTransaction()
  },[type,selectedDate,frequency])

  useEffect(()=>{
    setBarChartValueFun()
    setDonutChartValueFun()
  },[allTransaction])

  // 

  // console.log(allTransaction);

  return (

    <div className="flex flex-col h-screen justify-between p-4 gap-4 font-poppins">
        {/* Filter Mode */}
        <div className="flex justify-evenly items-center flex-wrap w-full ">
          {/* Date Filter */}
          <div className="w-full sm:w-auto">
            <h3>Select Date</h3>
            <Select className="z-0 md:z-0 w-full"
              value={frequency}
              onChange={(values) => setFrequency(values)}
            >
              <Select.Option value="7">Last 7 Days</Select.Option>
              <Select.Option value="30">Last 30 Days</Select.Option>
              <Select.Option value="365">Last 365 Days</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>

            {
            frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedDate(values)}
              />
            )}
          </div>

          {/* Type Filter */}
          <div className="w-full sm:w-auto">
            <h3>Select Type</h3>

            <Select className="w-full" value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
              <Select.Option value="income">Income</Select.Option>
            </Select>
          </div>
        </div>

      <div className="flex flex-col w-full justify-evenly gap-5 h-screen">

        {/* Display Money Data*/}
        <div className="flex flex-col md:flex md:flex-row justify-between items-center  font-medium gap-2">
            
            {/* Section : 1 */}
            <div className="flex gap-1 flex-col p-7 bg-[#208b3a] text-white rounded-md w-full">
              <div>
                <h3>Total Income</h3>
                <h3 className="font-bold text-2xl">{totalIncomeTurnover}</h3>
              </div>

              <div>
                <h3>{totalIncomeTurnoverPercent} %</h3>
              </div>
            </div>


            {/* Section : 2 */}
            <div className="flex flex-col gap-1 p-7 bg-[#d00000] text-white rounded-md w-full">
              <div>
                <h3>Total Expense</h3>
                <h3 className="font-bold text-2xl">{totalExpenseTurnover} </h3>
              </div>

              <div>
                <h3>{  totalExpenseTurnoverPercent } %</h3>
              </div>
            </div>


            {/* Section : 3 */}
            <div className="flex flex-col gap-1 p-7 bg-blue-900 text-white rounded-md w-full">
              <div>
                <h3>Total Saving</h3>
                <h3 className="font-bold text-2xl">{totalSaving}</h3>
              </div>
              <div>
                <h3 className="">Total Amount {totalTurnOver}</h3>
              </div>
            </div>
        </div>

        {/* Display Charts */}
        <div className="flex flex-col md:flex-row gap-2">

            {/* Expense Chart */}
            <div className="flex flex-col justify-between md:w-1/2 border-4 p-4 rounded-md">
              <div className="text-center">
                <h1>Expense Bar Chart</h1>
              </div>

              <div className="h-64">
                <Bar className="" data={barChartData} options={{maintainAspectRatio : false, responsive : true}}  />
              </div>
            </div>


            {/* Income Chart */}
            <div className="flex flex-col justify-between md:w-1/2 border-4 p-4 rounded-md">
              <div className="text-center">
                <h1>Income Pie Chart</h1>
              </div>
              <div className="h-64">
                <Doughnut data={donutData} options={{ maintainAspectRatio : false, responsive : true}} />
              </div>
            </div>
        </div>
      </div>
    </div>

    
  );
}









// AcccureteOutput : 1
// {categegories.map((category) => {
//   const amount = allTransaction
//     .filter(
//       (transaction) =>
//         transaction.type === "income" &&
//         transaction.category === category
//     )
//     .reduce((acc, transaction) => acc + transaction.amount, 0);
//   // console.log(amount);
//   // console.log(categegories);

//   const lebel = [];
//   const data = [];
//   return (
//     <div>
//       <h5>{category}</h5>
//       <h3>{amount}</h3>
//     </div>
//   );
// })}







// categegories.map((category)=>{
//   const amount = allTransaction.filter((transaction)=>transaction.type === "income" && transaction.category === category)
//   .reduce((acc, transaction)=> acc + transaction.amount, 0)
//   return(
//     <div>
//       <h5>{category}</h5>
//       <h3>{amount}</h3>
//     </div>
//   )
// setDonutData({
//     labels: category,
//     datasets: [{
//       label: 'My First Dataset',
//       data: amount,
//       backgroundColor: [
//         'rgb(255, 99, 132)',
//         'rgb(54, 162, 235)',
//         'rgb(255, 205, 86)'
//       ],
//       hoverOffset: 4
//     }]
//   }
// )
// })












// function calculateSumByType(transactions, type) {
//   return transactions
//       .filter(transaction => transaction.type === type)
//       .reduce((sum, transaction) => sum + transaction.amount, 0);
// }

//   function sumExpensesByCategory(transactions) {
//     const expensesByCategory = {};
//     transactions.forEach(allTransaction => {
//         if (allTransaction.type === 'expense') {
//             const { category, amount } = allTransaction;
//             expensesByCategory[category] = (expensesByCategory[category] || 0) + amount;
//         }
//     });
//     return expensesByCategory;
// }

// const expensesByCategory = sumExpensesByCategory(allTransaction);
// console.log(expensesByCategory);

// setDonutData({
//   labels : expensesByCategory,

// })



// const incomeSum = calculateSumByType(allTransaction, "income")
// console.log(incomeSum);

// categegories.map((category)=>{
//   const amount = allTransaction.filter(transaction => transaction.type === "income" && transaction.category === category).reduce((acc,transaction) => acc + transaction.amount , 0);
//   setDonutData({
//       labels: category,
//       datasets: [{ data: amount, backgroundColor: ['rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(255, 205, 86)'],hoverOffset: 4}]
//   }
// )
// })

// categegories.map((category)=>{
//   const amount = allTransaction.filter(transaction=>transaction.type === "income" && transaction.category === category)
//   .reduce((acc, transaction)=> acc + transaction.amount, 0)
//   setDonutData({
//       labels: category,
//       datasets: [{
//         label: 'My First Dataset',
//         data: amount,
//         backgroundColor: [
//           'rgb(255, 99, 132)',
//           'rgb(54, 162, 235)',
//           'rgb(255, 205, 86)'
//         ],
//         hoverOffset: 4
//       }]
//     }
//   )
// })

// console.log(donutData);















{/* <div className="flex flex-col justify-center items-center gap-2">
                <h3>Income</h3>
                <Progress
                  type="circle"
                  strokeColor="green"
                  percent={totalIncomePersentage.toFixed(0)}
                />
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <h3>Expense</h3>
                <Progress
                  type="circle"
                  strokeColor="red"
                  percent={totalExpensePersentage.toFixed(0)}
                />
              </div> */}










  