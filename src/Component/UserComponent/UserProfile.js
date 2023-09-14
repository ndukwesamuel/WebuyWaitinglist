import profile from "../../assets/profile.png";
import myImage from "../../assets/DP.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
const UserProfile = () => {
  const [editForm, setEditForm] = useState(false);
  const showEditform = () => {
    setEditForm(!editForm);
  };
  const cancelEditForm = () => {
    setEditForm(false);
  };
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const { name, email, address, phone } = formdata;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="px-[2rem] md:px-[20%] pt-[25px] pb-[40px] font-['Raleway']">
      <div className="font-bold text-xl pb-[10px] text-md tracking-wide">
        Profile
      </div>
      <div className="flex flex-col items-center justify-center gap-10 md:px-[50px] pt-[30px] pb-[60px] md:flex-row  bg-[#D9D9D9] bg-opacity-50 h-auto w-full rounded-[15px] border-[#565454] ">
        <div className="pix-container w-[300px] h-auto px-auto py-auto">
          <div className="flex items-center justify-center rounded-[15px] w-[250px] h-[250px] bg-[#FFFFFF] ">
            <img
              src={myImage}
              alt=""
              className=" object-fit w-[240px] h-[240px] rounded-[15px] "
            />
          </div>
          <div className="flex justify-start mt-[10px] gap-[10px] ">
            <Link
              to=""
              className="border-[#009B4D] border-2 p-2 w-[150px] rounded-[10px] bg-[#FFFFFF] text[#565454] tracking-wide"
            >
              Become a Group Leader
            </Link>
            <Link
              to=""
              className="border-[#009B4D] border-2 p-2 w-[100px]  rounded-[10px] bg-[#FFFFFF] text[#565454] tracking-wide"
            >
              Join a Group
            </Link>
          </div>
        </div>
        <div className="userDetails  w-full px-[20px]">
          {!editForm && (
            <>
              <form className="flex flex-col gap-[5px] ">
                <label className="font-semibold">Name:</label>
                <p className="text-[#565454] tracking-wide font-semibold">
                  Adetayo{" "}
                </p>
                <label className="font-semibold">Email:</label>
                <p className="text-[#565454] tracking-wide font-semibold">
                  Adetayo@mail.com
                </p>
                <label className="font-semibold">Phone Number:</label>
                <p className="text-[#565454] tracking-wide font-semibold">
                  1234567
                </p>
                <label className="font-semibold">Address:</label>
                <p className=" text-[#565454] tracking-wide font-semibold">
                  Aquinas, Akure
                </p>
              </form>

              <div className="flex mt-[3.5rem]">
                <Link
                  to={""}
                  className="border-[#009B4D] border-2 font p-2 rounded-[10px] bg-[#FFFFFF] text[#565454]"
                  onClick={showEditform}
                >
                  <i className="fa-solid fa-pen text-[#009B4D] text-[20px] mr-3"></i>
                  Edit Profile
                </Link>
              </div>
            </>
          )}

          {editForm && (
            <form className="flex flex-col gap-[2px]" onSubmit={onSubmit}>
              <label className="font-semibold">Name:</label>
              <input
                type="text"
                onChange={onChange}
                name="name"
                value={name}
                className="text-[#565454] p-1 rounded-md bg-[#D9D9D9] focus:outline-none"
                placeholder="Your full name

"
              />
              <label className="font-semibold">Email:</label>
              <input
                type="email"
                onChange={onChange}
                value={email}
                name="email"
                className="text-[#565454] p-1 rounded-md bg-[#D9D9D9] focus:outline-none"
                placeholder="example@gmail.com"
              />
              <label className="font-semibold">Phone Number:</label>
              <input
                type="text"
                onChange={onChange}
                value={phone}
                name="phone"
                className="text-[#565454] bg-[#D9D9D9] p-1 rounded-md focus:outline-none"
                placeholder="+2348012345
"
              />
              <label className="font-semibold">Address:</label>
              <input
                type="text"
                onChange={onChange}
                value={address}
                name="address"
                className="text-[#565454] bg-[#D9D9D9] p-1 rounded-md focus:outline-none"
                placeholder="your address"
              />
              <div className="flex gap-10 mt-8">
                <button className="bg-[#009B4D] border-2 text-sm p-1 font-semibold text-[#FFFF] border-[#009B4D] w-[120px] rounded-md">
                  Save
                </button>
                <button
                  onClick={cancelEditForm}
                  className="bg-[#FFFF] text-[#009B4D] text-sm p-1 font-semibold w-[120px] border-[#009B4D] border-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
