import myImage from "../../assets/DP.jpg";

const UserProfile = () => {
  return (
    <section className="px-[2rem] md:px-[10rem] lg:px-[15rem] pt-[25px] pb-[40px] font-['Raleway'] ">
      <div className="font-bold text-xl pb-[10px] text-md tracking-wide">
        Wallet
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col border-[1px] justify-center gap-6 md:px-[20px] pt-[30px] pb-[60px] bg-[#D9D9D9] bg-opacity-50  md:w-full rounded-[15px] border-[#565454] ">
          <div className="flex flex-col md:justify-between md:flex-row p-2">
            <div className="font-extrabold mb-4 md:mb-0 md:text-xl">
              Hello Adetayo
            </div>
            <div className="flex gap-4">
              <button className="border-2  rounded-md border-[#009B4D] p-1 font-semibold text-[#565454]">
                <i className="fa-solid fa-plus"></i> &nbsp; Add new card
              </button>
              <button className="border-2 rounded-md bg-[#009B4D] border-[#009B4D] p-2 text-[#FFFF] font-semibold">
                <i className="fa-solid fa-plus"></i> &nbsp; Add money
              </button>
            </div>
          </div>
          <div className="card flex gap-4 p-2">
            <div className="border-2 w-[330px] p-2 h-[200px] rounded-md">
              <i className="fa-solid fa-plus text-[#565454] text-3xl"></i>
            </div>
            <button className="border-2 rounded-md  border-[#565454] p-2 text-[#565454] font-semibold">
              <i className="fa-solid fa-plus"></i> &nbsp; Add Card
            </button>
          </div>
          <div className="activity p-2">
            <h2 className="font-extrabold md:text-xl">All Activity</h2>
            Shows all card activities
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
