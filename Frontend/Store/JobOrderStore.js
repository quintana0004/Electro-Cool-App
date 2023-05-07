import { create } from "zustand";

export const useCustomerInfoStore = create((set) => ({
  id: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  setCustomerInfo: (id, firstName, lastName, phone, email) =>
    set((state) => ({
      id: id,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
    })),
  resetClientInformation: () =>
    set((state) => ({
      id: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    })),
}));

export const useVehicleInfoStore = create((set) => ({
  id: "",
  brand: "",
  licensePlate: "",
  model: "",
  year: "",
  mileage: "",
  color: "",
  vinNumber: "",
  carHasItems: false,
  carItemsDescription: "",
  customerId: "",
  setVehicleInformation: (
    id,
    brand,
    licensePlate,
    model,
    year,
    mileage,
    color,
    vinNumber,
    carHasItems,
    carItemsDescription,
    customerId
  ) =>
    set((state) => ({
      id: id,
      brand: brand,
      licensePlate: licensePlate,
      model: model,
      year: year,
      mileage: mileage,
      color: color,
      vinNumber: vinNumber,
      carHasItems: carHasItems,
      carItemsDescription: carItemsDescription,
      customerId: customerId,
    })),
  resetVehicleInformation: () =>
    set((state) => ({
      id: "",
      brand: "",
      licensePlate: "",
      model: "",
      color: "",
      vinNumber: "",
      carHasItems: false,
      carItemsDescription: "",
      customerId: "",
    })),
}));

export const useRequestedServiceStore = create((set) => ({
  id: "", // Only send this Id, if you are updating an existing job order
  requestedService: "", // "Oil Change;Tune Up;Motor"
  serviceDetails: "", // String
  status: "", // String
  jobLoadType: "", // String
  policySignature: false, // Boolean
  carId: "", // String o Number
  customerId: "", // String o Number,
  setRequestedService: (
    id,
    requestedService,
    serviceDetails,
    status,
    jobLoadType,
    policySignature,
    cardId,
    customerId
  ) =>
    set((state) => ({
      id: id,
      requestedService: requestedService,
      serviceDetails: serviceDetails,
      status: status,
      jobLoadType: jobLoadType,
      policySignature: policySignature,
      cardId: cardId,
      customerId: customerId,
    })),
  resetRequestedService: () =>
    set((state) => ({
      id: "",
      requestedService: "",
      serviceDetails: "",
      status: "",
      jobLoadType: "",
      policySignature: false,
      cardId: "",
      customerId: "",
    })),
}));

export const useJobOrderStore = create((set) => ({
  pageSelection: "",
  editClientInformation: false,
  editVehicleInformation: false,
  editRequestedService: false,
  reloadJobOrderList: false,
  setJobOrder: (
    pageSelection,
    editClientInformation,
    editRequestedService,
    editVehicleInformation
  ) =>
    set((state) => ({
      pageSelection: pageSelection,
      editClientInformation: editClientInformation,
      editRequestedService: editRequestedService,
      editVehicleInformation: editVehicleInformation,
    })),
  resetJobOrder: () =>
    set((state) => ({
      pageSelection: "",
      editClientInformation: false,
      editRequestedService: false,
      editVehicleInformation: false,
    })),
  setReloadJobOrderList: () =>
    set((state) => ({
      reloadJobOrderList: !state.reloadJobOrderList,
    })),
}));

// ClietBook Store
export const CBCustomerInfoStore = create((set) => ({
  id: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  date: "",
  setCBCustomerInfo: (id, firstName, lastName, phone, email, date) =>
    set((state) => ({
      id: id,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      date: date,
    })),
  resetClientInformation: () =>
    set((state) => ({
      id: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      date: "",
    })),
  setReloadClientBookList: () =>
    set((state) => ({
      reloadClientBookList: !state.reloadClientBookList,
    })),
  setReloadClientBookCarList: () =>
    set((state) => ({
      reloadClientBookCarList: !state.reloadClientBookCarList,
    })),
  setReloadClientBookCarInfo: () =>
    set((state) => ({
      reloadClientBookCarInfo: !state.reloadClientBookCarInfo,
    })),
}));
