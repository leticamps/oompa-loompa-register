export const getFutureDate = () => {
    return new Date(new Date().getTime() + (24 * 60*60*1000)).getTime();
}