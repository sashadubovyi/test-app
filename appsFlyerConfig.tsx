import AppsFlyer from "react-native-appsflyer";

const appsFlyerDevKey = "fZ2QRpntvRn99CFbA54GZZ";

export const initializeAppsFlyer = async () => {
  AppsFlyer.initSdk({
    devKey: appsFlyerDevKey,
    isDebug: true,
  });
};
