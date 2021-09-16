const apiReq = async (url = "", options = null, errMsg = "") => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw Error("Fetching Data failed || Retry");
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
};

export default apiReq;
