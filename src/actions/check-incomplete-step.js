"use server";

import { connectToDB } from "@/lib/db.connect";
import { XeroxStore } from "@/lib/store.model";

export const checkStoreCompletionStatus = async (id) => {
  try {
    await connectToDB();
    const storeInfo = await XeroxStore.findById(id);
    if (!storeInfo) {
      return null;
    }

    if (storeInfo?.isStoreSetupComplete) {
      return {
        success: true,
        step: null,
      };
    }

    let step = 0;
    if (!storeInfo?.storeSetUpProgress?.step1) step = 1;
    else if (!storeInfo?.storeSetUpProgress?.step2) step = 2;
    else if (!storeInfo?.storeSetUpProgress?.step3) step = 3;
    else if (!storeInfo?.storeSetUpProgress?.step4) step = 4;

    return {
      success: false,
      step,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
