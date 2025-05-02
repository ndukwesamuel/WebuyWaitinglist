import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { searchAreas } from "@/utilities/deliveryFeeSelector";
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{11}$/, "Enter a valid 11-digit phone number")
    .required("Phone number is required"),
  street: Yup.string().required("Street address is required"),
  area: Yup.string().required("Area is required"),
});

const ShippingAddressForm = ({
  onAddressSubmit,
  onCancel,
  deliveryFeeCallback,
}) => {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [useNewAddress, setUseNewAddress] = useState(true);
  const [selectedSavedAddress, setSelectedSavedAddress] = useState(null);
  const [areaSearchResults, setAreaSearchResults] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(2000);
  const [selectedZone, setSelectedZone] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("savedAddresses");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSavedAddresses(parsed);
      if (parsed.length > 0) {
        setUseNewAddress(false);
        setSelectedSavedAddress(parsed[0]);
      }
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      street: "",
      area: "",
      additionalInfo: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const finalAddress = values;

      if (document.getElementById("saveAddress").checked) {
        const updated = [...savedAddresses, values];
        localStorage.setItem("savedAddresses", JSON.stringify(updated));
        setSavedAddresses(updated);
      }

      onAddressSubmit({
        ...finalAddress,
        deliveryFee,
        zoneName: selectedZone?.zoneName || "Unknown Zone",
      });
    },
  });

  const handleAreaChange = (e) => {
    formik.handleChange(e);
    const val = e.target.value;
    if (val.length > 1) {
      const results = searchAreas(val).slice(0, 5);
      setAreaSearchResults(results);
    } else {
      setAreaSearchResults([]);
    }
  };

  const selectArea = (areaInfo) => {
    formik.setFieldValue("area", areaInfo.area);
    setAreaSearchResults([]);
    setDeliveryFee(areaInfo.deliveryFee);
    setSelectedZone(areaInfo);
    deliveryFeeCallback(areaInfo.deliveryFee);
  };

  const handleSelectSavedAddress = (addr) => {
    setSelectedSavedAddress(addr);
    onAddressSubmit(addr); // to show paymentModal
    const match = searchAreas(addr.area)[0];
    if (match) {
      setDeliveryFee(match.deliveryFee);
      setSelectedZone(match);
      deliveryFeeCallback(match.deliveryFee);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

      {savedAddresses.length > 0 && (
        <div className="mb-4 flex gap-4">
          <Button onClick={() => setUseNewAddress(false)}>
            Use Saved Address
          </Button>
          <Button onClick={() => setUseNewAddress(true)}>
            Add New Address
          </Button>
        </div>
      )}

      {!useNewAddress ? (
        <div className="space-y-4">
          {savedAddresses.map((addr, i) => (
            <div
              key={i}
              className={`border p-4 rounded-md cursor-pointer ${
                selectedSavedAddress === addr
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleSelectSavedAddress(addr)}
            >
              <input
                type="radio"
                name="savedAddress"
                className="mr-2"
                checked={selectedSavedAddress === addr}
                onChange={() => handleSelectSavedAddress(addr)}
              />
              <span>
                {addr.fullName}, {addr.phoneNumber}, {addr.street}, {addr.area}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Input
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
          {formik.errors.fullName && (
            <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
          )}

          <Input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
          {formik.errors.phoneNumber && (
            <p className="text-red-500 text-sm">{formik.errors.phoneNumber}</p>
          )}

          <Input
            id="street"
            name="street"
            placeholder="Street"
            onChange={formik.handleChange}
            value={formik.values.street}
          />
          {formik.errors.street && (
            <p className="text-red-500 text-sm">{formik.errors.street}</p>
          )}

          <div className="relative">
            <Input
              id="area"
              name="area"
              placeholder="Area"
              onChange={handleAreaChange}
              value={formik.values.area}
              autoComplete="off"
            />
            {formik.errors.area && (
              <p className="text-red-500 text-sm">{formik.errors.area}</p>
            )}
            {areaSearchResults.length > 0 && (
              <div className="absolute w-full bg-white border rounded-md mt-1 z-10">
                {areaSearchResults.map((a, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => selectArea(a)}
                  >
                    {a.area} ({a.zoneName}) ₦{a.deliveryFee}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Textarea
            id="additionalInfo"
            name="additionalInfo"
            placeholder="Additional Info"
            onChange={formik.handleChange}
            value={formik.values.additionalInfo}
          />

          {selectedZone && (
            <div className="bg-green-50 p-3 rounded-md border border-green-300">
              Delivery to {formik.values.area} in {selectedZone.zoneName}, Fee:
              ₦{selectedZone.deliveryFee}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="saveAddress" defaultChecked />
            <label htmlFor="saveAddress" className="text-sm">
              Save this address for future orders
            </label>
          </div>

          <div className="flex justify-between mt-6">
            <Button type="button" variant="outline" onClick={onCancel}>
              Back to Cart
            </Button>
            <Button type="submit">Continue to Payment</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ShippingAddressForm;
