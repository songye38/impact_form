import ReactGA from "react-ga4";

export const initGA = () => {
    ReactGA.initialize("G-WPY69KZLCY");
};

export const trackPageView = (path: string) => {
    ReactGA.send({
        hitType: "pageview",
        page: path,
    });
};

export const trackEvent = (
    eventName: string,
    params?: object
) => {
    ReactGA.event(
        eventName,
        params
    );
};