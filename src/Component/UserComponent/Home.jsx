import { useEffect } from "react";
import myImage from "../../assets/DP.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Profile_fun } from "../../Redux/ProfileSlice";
import { useGetTransactionHistoryQuery } from "../../Redux/WalletApi";
const Home = () => {
  const dispatch = useDispatch();
  const { data: transaction, isError, error } = useGetTransactionHistoryQuery();
  const { data: profile } = useSelector((state) => state.reducer?.ProfileSlice);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(Profile_fun());
    };
    fetchData();
  }, [dispatch]);

  const User = profile?.data?.message || {};
  return <div className="text-center font-bold">Home</div>;
};

export default Home;

// <section className="px-[2rem] md:px-[10rem] lg:px-[15rem] pt-[25px] pb-[40px] font-['Raleway'] ">
//   <div className="font-bold text-xl pb-[10px] text-md tracking-wide">
//     Home
//   </div>
//   <div className="flex flex-col gap-8 md:flex-row">
//     <div className="flex flex-col items-center border-[1px] justify-center gap-6 md:px-[20px] pt-[30px] pb-[60px] bg-[#D9D9D9] bg-opacity-50  md:w-[50%] rounded-[15px] border-[#565454] ">
//       <div className="flex items-center justify-center rounded-[15px] w-[220px] h-[220px] bg-[#FFFFFF] border-2">
//         <img
//           src={User.profileImage}
//           alt=""
//           className=" object-fit w-[210px] h-[210px] rounded-[15px] "
//         />
//       </div>

//       <div className="userDetails w-[90%]">
//         <h4 className="font-extrabold mb-[.5rem]">My Profile</h4>
//         <div className="flex flex-col gap-3 ">
//           <p className="text-[#565454] tracking-wide font-semibold border-b-[1px] border-[#565454]">
//             {User.name}
//           </p>
//           {User.phone ? (
//             <p className="text-[#565454] tracking-wide font-semibold border-b-[1px] border-[#565454]">
//               {User.phone}
//             </p>
//           ) : (
//             <p className="text-[#565454] tracking-wide font-semibold border-b-[1px] border-[#565454]">
//               Phone no is empty
//             </p>
//           )}

//           <p className="text-[#565454] tracking-wide font-semibold border-b-[1px] border-[#565454]">
//             {User.email}
//           </p>
//           {User && User.user && User.user.isUserAdmin ? (
//             <p className=" text-[#000000] tracking-wide font-extrabold">
//               Status: Group Leader
//             </p>
//           ) : (
//             <p className=" text-[#000000] tracking-wide font-extrabold">
//               Status: Member
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//     <div className="flex flex-col gap-4 md:w-[50%]">
//       <div className="wallet bg-[#D9D9D9] bg-opacity-50 rounded-[15px] border-[1px] border-[#565454] px-4 py-4 ">
//         <h4 className="font-semibold mb-2">Wallet</h4>
//         <div className="bg-[#FFFF] p-[1rem] rounded-[15px] border-[1px] border-[#009B4D]">
//           {User && User.user ? (
//             <div className="text-center font-semibold text-2xl text-[#009B4D]  mb-4">
//               # {User.user.wallet}
//             </div>
//           ) : (
//             <div className="text-center font-semibold text-2xl text-[#009B4D]  mb-4">
//               # 2
//             </div>
//           )}

//           <div className="flex justify-between mb-4">
//             <button className="uppercase bg-[#009B4D] text-[#FFFF] font-semibold p-2 ">
//               add funds
//             </button>
//             <button className="uppercase bg-[#009B4D] text-[#FFFF] font-semibold p-2 ">
//               withdraw
//             </button>
//           </div>
//           <p className=" text-[#009B4D] text-center">
//             see more analytics in the dashboard
//           </p>
//         </div>
//         <div className="bg-[#FFFF] p-2 text-sm rounded-[15px] border-[1px] border-[#009B4D] mt-4 font-semibold">
//           <>
//             <div className="text-[#009B4D] ">Totals</div>
//             <div className="flex justify-between text-[#565454]">
//               <div>Spent</div>
//               <div>NGN 0</div>
//             </div>
//             <div className="flex justify-between text-[#565454]">
//               <div>Received</div>
//               <div>NGN 0</div>
//             </div>
//           </>
//         </div>
//       </div>
//       <div className="transaction bg-[#D9D9D9] bg-opacity-50 px-6 pb-4 w-full rounded-[15px] border-[1px] border-[#565454]">
//         <h4 className="font-semibold mb-2">Transactions</h4>
//         {transaction?.transactionHistory.map((data) => (
//           <div
//             className="bg-[#FFFF] p-2 text-sm text-[#565454] rounded-[15px] border-[1px] border-[#009B4D] mt-2 font-semibold mb-2"
//             key={data._id}
//           >
//             <div className="flex justify-between">
//               <div className="flex gap-4 items-center">
//                 <img
//                   className="rounded-full w-[40px]"
//                   src={User.profileImage}
//                   alt=""
//                 />
//                 <p>{data.description}</p>
//               </div>
//               <div className="mt-4"># {data.amount}</div>
//             </div>
//           </div>
//         ))}
//         {!transaction && <div>No transaction yet</div>}
//       </div>
//     </div>
//   </div>
// </section>
