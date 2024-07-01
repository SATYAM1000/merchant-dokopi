"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentUser } from "@/hooks/use-current-user";
import { API_DOMAIN } from "@/lib/constants";
import axios from "axios";
import { fetchAccessToken } from "@/actions/access-token";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import LocationPicker from "./LocationPicker";
import { FaMapMarkerAlt } from "react-icons/fa";


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, MapPinned } from "lucide-react";

const StoreDetailsForm = ({ googleMapApiKey }) => {
  const currentUser = useCurrentUser();
  if (!currentUser) {
    return null;
  }
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [initialFormData, setInitialFormData] = useState(null);

  const [formData, setFormData] = useState({
    storeRefrenceId: "",
    storeName: "",
    storeEmail: "",
    storePhoneNumber: "",
    storeLocation: {
      storeLandmark: "",
      storeZipCode: "",
      storeCity: "",
      storeState: "",
      storeLatitude: "",
      storeLongitude: "",
    },
  });

  const [formErrors, setFormErrors] = useState({
    storeRefrenceId: "",
    storeName: "",
    storeEmail: "",
    storePhoneNumber: "",
    storeLandmark: "",
    storeZipCode: "",
    storeCity: "",
    storeState: "",
    storeLatitude: "",
    storeLongitude: "",
  });

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const token = await fetchAccessToken();

        const res = await axios.get(
          `${API_DOMAIN}/api/v1/merchant/store/basic-details/${currentUser.storeId}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const store = res.data.data;
        const storeData = {
          storeRefrenceId: store.storeRefrenceId,
          storeName: store.storeName,
          storeEmail: store.storeEmail,
          storePhoneNumber: store.storePhoneNumber,
          storeLocation: {
            storeLandmark: store.storeLandmark,
            storeZipCode: store.storeZipCode,
            storeCity: store.storeCity,
            storeState: store.storeState,
            storeLatitude: store.storeLatitude,
            storeLongitude: store.storeLongitude,
          },
        };
        setFormData(storeData);
        setInitialFormData(storeData);
      } catch (error) {
        console.error("Error fetching store details", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchStoreDetails();
  }, [currentUser.storeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "storeLatitude" || name === "storeLongitude") {
      setFormData({
        ...formData,
        storeLocation: {
          ...formData.storeLocation,
          [name]: value,
        },
      });
    } else if (name.startsWith("storeLocation")) {
      setFormData({
        ...formData,
        storeLocation: {
          ...formData.storeLocation,
          [name.slice(14)]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleSelectChange = (value) => {
    if (!availableStates.includes(value)) {
      availableStates.push(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      storeLocation: {
        ...prevData.storeLocation,
        storeState: value,
      },
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      storeState: "",
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.storeRefrenceId)
      errors.storeRefrenceId = "Store reference ID is required";
    if (!formData.storeName) errors.storeName = "Store name is required";
    if (!formData.storeEmail) errors.storeEmail = "Store email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.storeEmail))
      errors.storeEmail = "Email address is invalid";
    if (!formData.storePhoneNumber)
      errors.storePhoneNumber = "Store phone number is required";
    else if (!/^\d{10}$/.test(formData.storePhoneNumber))
      errors.storePhoneNumber = "Phone number is invalid";
    if (!formData.storeLocation.storeLandmark)
      errors.storeLandmark = "Store landmark is required";
    if (!formData.storeLocation.storeZipCode)
      errors.storeZipCode = "Store zip code is required";
    else if (!/^\d{6}$/.test(formData.storeLocation.storeZipCode))
      errors.storeZipCode = "Zip code is invalid";
    if (!formData.storeLocation.storeCity)
      errors.storeCity = "Store city is required";
    if (!formData.storeLocation.storeState)
      errors.storeState = "Store state is required";
    if (!formData.storeLocation.storeLatitude)
      errors.storeLatitude = "Store latitude is required";
    else if (isNaN(formData.storeLocation.storeLatitude))
      errors.storeLatitude = "Latitude must be a number";
    if (!formData.storeLocation.storeLongitude)
      errors.storeLongitude = "Store longitude is required";
    else if (isNaN(formData.storeLocation.storeLongitude))
      errors.storeLongitude = "Longitude must be a number";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
    } else {
      console.log("Form validation failed");
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            storeLocation: {
              ...formData.storeLocation,
              storeLatitude: position.coords.latitude.toString(),
              storeLongitude: position.coords.longitude.toString(),
            },
          });
        },
        (error) => {
          console.error("Error detecting location", error);
          toast.error("Error detecting location");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      toast.error("Geolocation is not supported");
    }
  };

  const handleUpdateDetails = async () => {
    try {
      if (validateForm()) {
        setLoading(true);
        const token = await fetchAccessToken();
        const res = await axios.put(
          `${API_DOMAIN}/api/v1/merchant/store/basic-details/${currentUser.storeId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(res.data.msg);
      } else {
        toast.error("Form validation failed");
      }
    } catch (error) {
      console.error("Error updating store details", error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleZipCodeChange = async (e) => {
    try {
      const zipCode = e.target.value;
      setFormData({
        ...formData,
        storeLocation: {
          ...formData.storeLocation,
          storeZipCode: zipCode,
        },
      });

      if (zipCode.length === 6) {
        const res = await axios.get(
          `https://api.postalpincode.in/pincode/${zipCode}`
        );
        if (res.data[0].Status === "Success") {
          const { District, State } = res.data[0].PostOffice[0];
          setFormData((prevData) => ({
            ...prevData,
            storeLocation: {
              ...prevData.storeLocation,
              storeCity: District,
              storeState: State,
            },
          }));

          if (!availableStates.includes(State)) {
            availableStates.push(State);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching location", error);
    }
  };

  const availableStates = [formData.storeLocation.storeState];

  useEffect(() => {
    if (formData.storeLocation.storeState) {
      handleSelectChange(formData.storeLocation.storeState);
    }
  }, [formData.storeLocation.storeState]);

  const hasChanges =
    JSON.stringify(formData) !== JSON.stringify(initialFormData);

  return (
    <>
      {initialLoading ? (
        <>
          <section className="relative w-full h-[calc(100vh-64px)] flex items-center justify-center">
            <ClipLoader color="blue" size={60} />
          </section>
        </>
      ) : (
        <form
          className="w-full mt-6"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full grid grid-cols-2">
              <div className="w-full  px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="storeRefrenceId"
                >
                  Store Id
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
                  id="storeRefrenceId"
                  name="storeRefrenceId"
                  type="text"
                  autoComplete="off"
                  value={formData.storeRefrenceId}
                  onChange={handleChange}
                />

                {formErrors.storeRefrenceId && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.storeRefrenceId}
                  </p>
                )}
              </div>
              <div className="w-full px-3">
                <label
                  className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="storeName"
                >
                  Store Name
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
                  id="storeName"
                  name="storeName"
                  type="text"
                  value={formData.storeName}
                  autoComplete="off"
                  onChange={handleChange}
                  placeholder=""
                />
                {formErrors.storeName && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.storeName}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full grid grid-cols-2">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="storePhoneNumber"
                >
                  Mobile Number
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="storePhoneNumber"
                  name="storePhoneNumber"
                  type="text"
                  value={formData.storePhoneNumber}
                  onChange={handleChange}
                  placeholder=""
                  autoComplete="off"
                />
                {formErrors.storePhoneNumber && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.storePhoneNumber}
                  </p>
                )}
              </div>

              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="storeEmail"
                >
                  Email Address
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="storeEmail"
                  name="storeEmail"
                  type="email"
                  value={formData.storeEmail}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder=""
                />
                {formErrors.storeEmail && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.storeEmail}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full grid grid-cols-3">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="storeLatitude"
                >
                  Latitude
                </label>
                <div className="appearance-none flex items-center justify-between w-full  text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
                  <input
                    className="border-none outline-none bg-transparent w-full"
                    id="storeLatitude"
                    name="storeLatitude"
                    type="text"
                    value={formData.storeLocation.storeLatitude}
                    onChange={handleChange}
                    placeholder=""
                    autoComplete="off"
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <FaMapMarkerAlt className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Select latitude and longitude</DialogTitle>
                        <DialogDescription>
                          Select the latitude and longitude of your store.
                        </DialogDescription>
                      </DialogHeader>
                      <LocationPicker
                        googleMapApiKey={googleMapApiKey}
                        initialLatLng={{
                          lat: formData.storeLocation.storeLatitude,
                          lng: formData.storeLocation.storeLongitude,
                        }}
                        onLocationChange={(location) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            storeLocation: {
                              ...prevData.storeLocation,
                              storeLatitude: location.lat,
                              storeLongitude: location.lng,
                            },
                          }))
                        }
                      />
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Save
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {formErrors.storeLatitude && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.storeLatitude}
                  </p>
                )}
              </div>

              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="storeLongitude"
                >
                  Longitude
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="storeLongitude"
                  name="storeLongitude"
                  type="text"
                  value={formData.storeLocation.storeLongitude}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder=""
                />
                {formErrors.storeLongitude && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.storeLongitude}
                  </p>
                )}
              </div>

              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="storeZip"
                >
                  Zip
                </label>
                <input
                  className="appearance-none block w-full mb-3 text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="storeZip"
                  name="storeLocation.storeZipCode"
                  type="text"
                  value={formData.storeLocation.storeZipCode}
                  onChange={handleZipCodeChange}
                  placeholder=""
                  autoComplete="off"
                />
                {formErrors.storeZipCode && (
                  <p className="text-red-500 text-xs italic">
                    {formErrors.storeZipCode}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className=" w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="storeLandmark"
              >
                Landmark
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="storeLandmark"
                name="storeLocation.storeLandmark"
                type="text"
                value={formData.storeLocation.storeLandmark}
                onChange={handleChange}
                placeholder=""
              />
              {formErrors.storeLandmark && (
                <p className="text-red-500 text-xs italic">
                  {formErrors.storeLandmark}
                </p>
              )}
            </div>
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="storeCity"
              >
                City
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
                id="storeCity"
                name="storeLocation.storeCity"
                type="text"
                value={formData.storeLocation.storeCity}
                onChange={handleChange}
                autoComplete="off"
                placeholder=""
              />
              {formErrors.storeCity && (
                <p className="text-red-500 text-xs italic">
                  {formErrors.storeCity}
                </p>
              )}
            </div>
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="storeState"
              >
                State
              </label>

              <Select
                name="storeLocation.storeState"
                onValueChange={handleSelectChange}
                value={formData.storeLocation.storeState}
              >
                <SelectTrigger className="w-full font-medium text-[14px] appearance-none text-gray-700 border border-[#D9D9D9] rounded py-5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent className="capitalize">
                  <SelectGroup>
                    {availableStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}

                    <SelectItem disabled value="Andhra Pradesh">
                      Andhra Pradesh
                    </SelectItem>
                    <SelectItem disabled value="Bihar">
                      Bihar
                    </SelectItem>
                    <SelectItem disabled value="Chandigarh">
                      Chandigarh
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {formErrors.storeState && (
                <p className="text-red-500 text-xs italic mt-3">
                  {formErrors.storeState}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex items-center justify-end gap-6 mt-6">
            <Button size="sm" variant="destructive">
              Delete my store
            </Button>
            <Button
              variant="default"
              size="sm"
              type="button"
              disabled={!hasChanges}
              onClick={handleUpdateDetails}
            >
              {loading ? <ClipLoader color="white" size={20} /> : "Save"}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default StoreDetailsForm;
